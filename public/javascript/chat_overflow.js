var objDiv = document.getElementById("chat_detail_wrap"); 
objDiv.scrollTop = objDiv.scrollHeight;

var chat_btn = $(".send_chat_input");
chat_btn.focus(function(){
  $("html, body").animate({ scrollTop: $(document).height() }, 0);
  objDiv.scrollTop = objDiv.scrollHeight;
});
chat_btn.click(function(){
  $("html, body").animate({ scrollTop: $(document).height() }, 0);
  objDiv.scrollTop = objDiv.scrollHeight;
});