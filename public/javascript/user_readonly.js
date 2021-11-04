$(document).ready(function () {
  if(window.location.href.indexOf("/mypage/business/account") > -1)
  {
    document.getElementById('user_id').readOnly = true;
  }
});

$(document).ready(function () {
  if(window.location.href.indexOf("/mypage/personal/account") > -1)
  {
    document.getElementById('user_id').readOnly = true;
  }
});