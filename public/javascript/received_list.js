if ($(".received_list_message").length){
  $(".estimate_received_list_con_box").addClass("on");
  $(".estimate_received_list_con_box").on("click", function(event){
    event.preventDefault();
  })
}

if ($(".received_finished").length){
  $(".estimate_received_list_con_box").addClass("on");
  $(".estimate_received_list_con_box").on("click", function(event){
    event.preventDefault();
    alert("견적요청완료 되었으므로 견적서를 보낼 수 없습니다.");
  })
}
