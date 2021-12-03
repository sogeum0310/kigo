var objDiv = document.getElementById("chat_detail_wrap"); 
objDiv.scrollTop = objDiv.scrollHeight;

var chat_btn = $(".send_chat_input");
var file_btn = $(".chat_file_form button");
chat_btn.focus(function(){
  $("html, body").animate({ scrollTop: $(document).height() }, 0);
  objDiv.scrollTop = objDiv.scrollHeight;
});
chat_btn.click(function(){
  $("html, body").animate({ scrollTop: $(document).height() }, 0);
  objDiv.scrollTop = objDiv.scrollHeight;
});
file_btn.click(function(){
  $("html, body").animate({ scrollTop: $(document).height() }, 0);
  objDiv.scrollTop = objDiv.scrollHeight;
});

$(".file_plus_btn").click(function(){
  $(".chat_file_form").slideToggle("on");
})
$(".file_minus_btn").click(function(){
  $(".chat_file_form").slideToggle("on");
})

