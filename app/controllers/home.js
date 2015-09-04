var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Thought = mongoose.model('Thought'),
  basicAuth = require('basic-auth-connect'),
  secrets = require('./../../secrets.private.json');

var THOUGHTS_PER_PAGE = 20;

module.exports = function (app) {
  app.use('/', router);
};

function authenticate(user, pass){
    var authorised = false;
    if (secrets.users[user] === pass)
        authorised = true;
    return authorised
}

router.get('/', function (req, res, next) {
  var page = Math.max(req.query.page, 1) || 1,
      skip = THOUGHTS_PER_PAGE * (page - 1),
      limit = THOUGHTS_PER_PAGE,
      warning;
  Thought.find().sort('-_id').skip(skip).limit(limit).find(function (err, thoughts) {
    if (err) return next(err);
    if (thoughts.length == 0)
      warning = "Hmm... no posts here. Did you go through too many pages? Or have they been stolen by my enemies?!"
    res.render('index', {
      title: 'Tom\'s Thought for the Day',
      thoughts: thoughts,
      page: page,
      warning: warning
    });
  });
});

router.get('/admin', basicAuth(authenticate), function (req, res, next) {
  Thought.find().sort('-_id').find(function (err, thoughts) {
    res.render('generator', {
      title: 'Tom\'s Thought for the Day - Generator',
      thoughts: thoughts
    });
  })
});

router.get('/delete', basicAuth(authenticate), function (req, res, next) {
  if (!req.query.id){
    res.send('No query id.')
  } else {
    Thought.remove({ _id:req.query.id }, function (err) {
      if (err) return handleError(err);
      res.send('Deleted.');
    })
  }
});

router.get('/make', basicAuth(authenticate), function (req, res, next) {
  var valid_params = validate(req.query)
  if (!valid_params)
    res.send('Parameters no good: ' + JSON.stringify(req.query))
  Thought.create(valid_params, function (err) {
    if (err) return handleError(err);
    res.send('Created.');
  })
});

function validate(params) {
  try {
    if (params.img && params.toptext.length < 100 && params.bottomtext.length < 100)
      return {
        toptext : params.toptext,
        bottomtext : params.bottomtext,
        img : params.img,
      }
  } catch(e) {
    console.log("ERROR INVALID REQUEST: " + e)
  }
  return false
}