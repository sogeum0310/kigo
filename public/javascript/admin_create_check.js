$(document).ready(function(){
  $('.submit_btn').click(function() {
    var cont = document.getElementById("admin_blog_form_text");
    if(cont.value.length < 3) {
      cont.value =  cont.value.substr(0, 3);
      alert('내용을 최소 3글자 이상 입력해주세요.');
      return false;
  }
  });
});