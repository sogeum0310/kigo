$(document).ready(function(){
  $('.signup_btn').click(function() {
    if (!$("input[name='platform']:checked").val()) {
       alert('광고방법을 선택해주세요.');
        return false;
    }
    else {
    }
  });
});