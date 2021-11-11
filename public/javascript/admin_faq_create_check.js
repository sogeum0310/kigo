$(document).ready(function(){
  $('.faq_submit').click(function() {
    if (!$("input[name='account']:checked").val()) {
       alert('선택사항을 체크해주세요.');
        return false;
    }
    else {

    }
  });
});