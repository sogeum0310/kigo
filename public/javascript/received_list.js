if ($(".received_list_message").length){
  $(".estimate_received_list_con_box").addClass("on");
  $(".estimate_received_left a").on("click", function(event){
    event.preventDefault();
  })
}

if ($(".received_finished").length){
  $(".estimate_received_list_con_box").addClass("on");
  $(".estimate_received_left a").on("click", function(event){
    event.preventDefault();
  })
}