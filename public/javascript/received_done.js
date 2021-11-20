$(".estimate_received_list_con_box").addClass("on");
$(".estimate_received_list_con_box").on("click", function(event){
  event.preventDefault();
  alert("이미 견적서를 보냈습니다.");
})