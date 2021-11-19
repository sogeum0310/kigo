

// $(document).ready(function () {
//   if(window.location.href.indexOf("/success/?message=로그아웃되었습니다&go_to=/") > -1)
//   {
//     location.href = '/';
//   } 

// });


var success_alert = $(".success_title").text();
var goto = $(".success_back a").attr("href");

alert(success_alert);

location.replace(goto);
