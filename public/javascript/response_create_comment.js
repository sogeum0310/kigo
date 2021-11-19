// $(".create_comment_btn").click(function(){
//   $(".response_comment_form_group").focus();
// });
// $(".commnet_fetch").click(function(){
//   $(".response_comment_form_group").focus();
// });



// $(".response_detail_commnet_form").on('focus',function(){ 

//   $(".response_detail_commnet_form").show();
//   $(".page_wrap").addClass("community_on");
  
//   }).on('focusout',function(){
//     setTimeout (function(){
//       $(".response_detail_commnet_form").hide();
//       $(".page_wrap").removeClass("community_on");
//     },100)
  
//   })
//   ; 


$(".create_comment_btn").click(function(){
  $(".response_detail_commnet_form").show();
  $(".page_bg").show();
  $(".response_comment_form_group textarea").focus();
});

$(".commnet_fetch").click(function(){
  $(".response_detail_commnet_form").show();
  $(".page_bg").show();
  $(".response_comment_form_group textarea").focus();
});

$(".page_bg").click(function(){
  $(".response_detail_commnet_form").hide();
  $(".page_bg").hide();
})