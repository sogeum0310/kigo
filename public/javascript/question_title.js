// $("._619886a13d51db1799238a7d").text('광고 업종(상품)');




// var question_title_id = '_' + $(".request_question_title span").text();

// alert(question_title_id);





$('.request_question_title span').each(function () {
  var question_title_id = '_' + $(this).text();
  $(this).parent('.request_question_title').addClass(question_title_id)
});



$("._619886a13d51db1799238a7d").text('광고 업종(상품)');

$("._619886a13d51db1799238a7f").text('광고 목적');

$("._619886a13d51db1799238a81").text('광고 시작 날짜');

$("._619886a13d51db1799238a83").text('광고 집행 기간');

$("._619886a13d51db1799238a87").text('고객님이 계신 지역');

$("._619886a13d51db1799238a89").text('피드백 서비스방식');

$("._619886a13d51db1799238a79").text('원하시는 채널');

$("._619886a13d51db1799238a77").text('원하시는 채널');

$("._619886a13d51db1799238a7b").text('월간 작업(포스팅) 횟수');

$("._619886a13d51db1799238a85").text('예상 금액');