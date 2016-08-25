
$('clicky').click(function(){
	$.ajax("infoo.txt").done(function(data){
		alert(data);
	})
})