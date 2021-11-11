

$(document).ready(function(){
  $('.signup_btn').click(function() {
    if (!$("input[name='gender']:checked").val()) {
       alert('성별을 선택하세요.');
        return false;
    }
    else {
    }
  });
});