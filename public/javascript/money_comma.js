$(document).ready(function(){
	$('.money_comma').each(function(index){
		$(this).text($(this).text().split(/(?=(?:\d{3})+(?:\.|$))/g).join(','));
	});
});