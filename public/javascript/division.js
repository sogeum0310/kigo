if($(".blog_user_review").length){
  var a = $(".blog_user_score").text();
  var b = $(".blog_user_review").text();
  
  var str1 = parseInt(a);
  var str2 = parseInt(b);
  
  var division = (str1/str2);
  
  $(".blog_user_division").text(division);
}