
$('#clicky').click(function(){
	$.ajax("infoo.txt").done(function(data){
		alert(data);
	}).fail(function(){
		alert("Could not retrieve data");
	})
})