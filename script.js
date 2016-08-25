
$("#clicky").click(function(){
	$.ajax("infoo.txt").done(function(data){
		$("#contents").html(data);
		// alert(data);
	}).fail(function(){
		alert("Could not retrieve data");
	})
})