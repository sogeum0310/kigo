
if ($('.chat_list_li').length){
} else {
  $(".no_chat_list_text").addClass("on");
};



if ($('.sent_list_li').length){
} else {
  $('.no_recevied_list_text').addClass("on");
};

// var imgtxt = $(".chat_list_last_message span").text();

// if( imgtxt.includes('<img src=') ){


//   $(".chat_list_last_message span").text("이미지를 보냈습니다");

// }



  $('.chat_list_last_message span').each(function () {
    if( $(this).text().includes('<img src=') ){
      $(this).text("이미지를 보냈습니다");
    }
  });
