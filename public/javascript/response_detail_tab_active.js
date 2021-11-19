$(document).ready(function () {
 
  var url = window.location.href;
  $('.response_detail_tab li > a').each(function () {
    if (url.indexOf($(this).attr('href')) > -1) {
      $(this).parent("li").addClass('active');
    }
  });
});