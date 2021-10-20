$(document).ready(function(){
  $('.submit_btn').click(function() {
    if (!$("input[name='rating']:checked").val()) {
       alert('선택사항을 체크해주세요.');
        return false;
    }
    else {
    }
  });
});



$(document).ready(function(){
  $('.submit_btn').click(function() {
    var cont = document.getElementById("estimate_response_text");
    if(cont.value.length < 3) {
      cont.value =  cont.value.substr(0, 3);
      alert('내용을 최소 3글자 이상 입력해주세요.');
      return false;
  }
  });
});

// textarea 3글자 이하 입력시 전송 x

