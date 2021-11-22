if ($(".received_list_message").length){
  $(".estimate_received_list_con_box").addClass("on");
  $(".estimate_received_list_con_box").on("click", function(event){
    event.preventDefault();
  })
}

// if ($(".received_finished").length){
//   // $(".estimate_received_list_con_box").addClass("on");
//   $(".estimate_received_list_con_box.on3").on("click", function(event){
//     event.preventDefault();
//     alert("견적요청완료 되었으므로 견적서를 보낼 수 없습니다.");
//   })
// }



// $(".estimate_received_list_con_box.on3").on("click", function(event){
//   event.preventDefault();
//   alert("견적요청완료 되었으므로 견적서를 보낼 수 없습니다.");
// })



$('.received_finished').each(function () {
  if ($(".received_finished").length){
    $(this).parents("a").addClass("on3");
  }
});

$(".estimate_received_list_con_box .on3").on("click", function(event2){
  event2.preventDefault();
  alert("견적요청완료 되었으므로 견적서를 보낼 수 없습니다.");
})
// if($(".estimate_received_list_con_box a").hasClass("on3")){
//   $(this).parent(".li").on("click", function(event){
//     event.preventDefault();
//     alert("견적요청완료 되었으므로 견적서를 보낼 수 없습니다.")
//   }
// }

// $(".estimate_received_list_con_box a").each(function(){
//   if($(this).hasClass("on3")){
//     $(this).parent("li").on("click", function(event){
//       event.preventDefault();
//       alert("견적요청완료 되었으므로 견적서를 보낼 수 없습니다.")
//     }
//   }
// })