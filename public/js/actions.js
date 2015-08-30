$(function(){
	$("a.del").click(function(){
		if (confirm('Are you sure?')){
			var info = $(this).parents(".info"),
				id = info.attr("id").split(":")[1];
			$.get('/delete?id' + id, function(data){
				if (!data.err){
					info.css("display", "none")
				} else {
					console.log(err);
					alert(err);
				}
			})
		}
	})
	$("a.preview").click(function(){
		var html = '<div class="thought"><div class="meme"><div class="text top"><span>' + $("#toptext").val() +
		'</span></div><div class="text bottom"><span>' + $("#bottomtext").val() +
		'</span></div><img src="' + $("#img").val() + '"></div></div>'
		$(".viewer").html(html)
	})
	$("form.generator").on("submit", function(event) {
	  event.preventDefault();
	  var qs = $(this).serialize();
	  $.get("/make?" + qs, function(data){
	  	console.log(data);
	  	location.reload();
	  })
	});
	$("a.go").click(function(){
		$("form.generator").submit()
	})
})