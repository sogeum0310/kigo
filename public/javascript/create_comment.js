$(".create_comment_form").hide();

$(".create_comment_btn").click(function(){
  $(".comment_form_group textarea").focus();
});
$(".commnet_fetch").click(function(){
  $(".comment_form_group textarea").focus();
});
// function commnetFocus(){
//   $(".comment_form_group").focus();
// }


$(".comment_form_group textarea").on('focus',function(){ 

  $(".create_comment_form").show();
  $(".page_wrap").addClass("community_on");
  
  }).on('focusout',function(){
    setTimeout (function(){
      $(".create_comment_form").hide();
      $(".page_wrap").removeClass("community_on");
    },100)
  
  })
  ; 


