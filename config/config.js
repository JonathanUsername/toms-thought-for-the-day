var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

console.log(rootPath)

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'toms-thought-for-the-day'
    },
    port: 3333,
    db: 'mongodb://localhost/toms-thought-for-the-day-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'toms-thought-for-the-day'
    },
    port: 3333,
    db: 'mongodb://localhost/toms-thought-for-the-day-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'toms-thought-for-the-day'
    },
    port: 3333,
    db: 'mongodb://localhost/toms-thought-for-the-day-production'
  }
};

module.exports = config[env];
