  $(document).ready(function () {
    if(window.location.href.indexOf("/company/contact/qna/create") > -1)
    {
         $(".com_contact_top_txt1").addClass("on");
    }
  });

  $(document).ready(function () {
    if(window.location.href.indexOf("/company/contact/message/create") > -1)
    {
         $(".com_contact_top_txt2").addClass("on");
    }
  });

  $(document).ready(function(){
    $('.submit_btn').click(function() {
      var cont = document.getElementById("company_contact_text");
      if(cont.value.length < 3) {
        cont.value =  cont.value.substr(0, 3);
        alert('내용을 최소 3글자 이상 입력해주세요.');
        return false;
    }
    });
  });