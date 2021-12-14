function request_confirm(){
  if (!confirm("견적요청서를 보내겠습니까?")) {
    return false;
} else {
    alert("견적요청서를 보냈습니다.");
}
}



$("#619886a13d51db1799238adb").click(function(){
  if($("#txt-619886a13d51db1799238adb").hasClass("on")){
    $("#txt-619886a13d51db1799238adb").removeClass("on");
    $("#txt-619886a13d51db1799238adb").val("");
  } else{
    $("#txt-619886a13d51db1799238adb").addClass("on");
  }
})




$("#619886a13d51db1799238afb").click(function(){
  $("#txt-619886a13d51db1799238afb").css("display","inline-block");
  $("#txt-619886a13d51db1799238afd").css("display", "none");
  $("#txt-619886a13d51db1799238afd").val("");
});
$("#619886a13d51db1799238afd").click(function(){
  $("#txt-619886a13d51db1799238afb").css("display", "none");
  $("#txt-619886a13d51db1799238afb").val("");
  $("#txt-619886a13d51db1799238afd").css("display", "inline-block");
})


$("#619886a13d51db1799238aff").click(function(){
  $("#txt-619886a13d51db1799238afb").css("display", "none");
  $("#txt-619886a13d51db1799238afb").val("");
  $("#txt-619886a13d51db1799238afd").css("display", "none");
  $("#txt-619886a13d51db1799238afd").val("");
})


$("#619886a13d51db1799238b23").click(function(){
  if($("#txt-619886a13d51db1799238b23").hasClass("on")){
    $("#txt-619886a13d51db1799238b23").removeClass("on");
    $("#txt-619886a13d51db1799238b23").val("");
  } else{
    $("#txt-619886a13d51db1799238b23").addClass("on");
  }
})



// 체크시 직접입력


// function getRadioText(event)  {
//   const radioId = event.target.id;
//   const query = 'label[for="'+ radioId + '"]'
//   const text = 
//         document.querySelector(query).innerText;
  
//   document.getElementById('result').innerText = text;
// }


// =체크시 미리보기=


$(".field2 #619886a13d51db1799238a9b").click(function(){
  if ($("#619886a13d51db1799238a9b:checkbox" ).is( ":checked")){
    $(".channel_txt").append("<span class='f2_1'>네이버블로그</span>");
  } else {
    $(".f2_1").remove();
  }
})

$(".field2 #619886a13d51db1799238a9d").click(function(){
  if ($("#619886a13d51db1799238a9d:checkbox" ).is( ":checked")){
    $(".channel_txt").append("<span class='f2_2'>유튜브</span>");
  } else {
    $(".f2_2").remove();
  }
})

$(".field2 #619886a13d51db1799238a9f").click(function(){
  if ($("#619886a13d51db1799238a9f:checkbox" ).is( ":checked")){
    $(".channel_txt").append("<span class='f2_3'>인스타그램</span>");
  } else {
    $(".f2_3").remove();
  }
})

$("#619886a13d51db1799238aa1").click(function(){
  if ($("#619886a13d51db1799238aa1:checkbox" ).is( ":checked")){
    $(".channel_txt").append("<span class='f2_4'>페이스북</span>");
  } else {
    $(".f2_4").remove();
  }
})

$("#619886a13d51db1799238a8b").click(function(){
  if ($("#619886a13d51db1799238a8b:checkbox" ).is( ":checked")){
    $(".channel_txt").append("<span class='f1_1'>네이버 블로그 체험단/기자단</span>");
  } else {
    $(".f1_1").remove();
  }
})

$("#619886a13d51db1799238a8d").click(function(){
  if ($("#619886a13d51db1799238a8d:checkbox" ).is( ":checked")){
    $(".channel_txt").append("<span class='f1_2'>유튜브 체험단/기자단</span>");
  } else {
    $(".f1_2").remove();
  }
})

$("#619886a13d51db1799238a8f").click(function(){
  if ($("#619886a13d51db1799238a8f:checkbox" ).is( ":checked")){
    $(".channel_txt").append("<span class='f1_3'>인스타그램 체험단/기자단</span>");
  } else {
    $(".f1_3").remove();
  }
})

$("#619886a13d51db1799238a91").click(function(){
  if ($("#619886a13d51db1799238a91:checkbox" ).is( ":checked")){
    $(".channel_txt").append("<span class='f1_4'>페이스북 체험단/기자단</span>");
  } else {
    $(".f1_4").remove();
  }
})

$("#619886a13d51db1799238a93").click(function(){
  if ($("#619886a13d51db1799238a93:checkbox" ).is( ":checked")){
    $(".channel_txt").append("<span class='f1_5'>네이버 카페 침투 마케팅</span>");
  } else {
    $(".f1_5").remove();
  }
})

$("#619886a13d51db1799238a95").click(function(){
  if ($("#619886a13d51db1799238a95:checkbox" ).is( ":checked")){
    $(".channel_txt").append("<span class='f1_6'>커뮤니티 침투 마케팅</span>");
  } else {
    $(".f1_6").remove();
  }
})

$("#619886a13d51db1799238a97").click(function(){
  if ($("#619886a13d51db1799238a97:checkbox" ).is( ":checked")){
    $(".channel_txt").append("<span class='f1_7'>네이버 지식인 마케팅</span>");
  } else {
    $(".f1_7").remove();
  }
})

$("#619886a13d51db1799238a99").click(function(){
  if ($("#619886a13d51db1799238a99:checkbox" ).is( ":checked")){
    $(".channel_txt").append("<span class='f1_8'>네이버 리뷰 마케팅</span>");
  } else {
    $(".f1_8").remove();
  }
})


$("#619886a13d51db1799238aa3").click(function(){
  $(".posting_txt span").text("5회 미만");
})

$("#619886a13d51db1799238aa5").click(function(){
  $(".posting_txt span").text("5~10회");
})

$("#619886a13d51db1799238aa7").click(function(){
  $(".posting_txt span").text("10~15회");
})

$("#619886a13d51db1799238aa9").click(function(){
  $(".posting_txt span").text("15~20회");
})

$("#619886a13d51db1799238aab").click(function(){
  $(".posting_txt span").text("20회 이상");
})

$("#619886a13d51db1799238aad").click(function(){
  if ($("#619886a13d51db1799238aad:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_1'>소비재</span>");
  } else {
    $(".f4_1").remove();
  }
})

$("#619886a13d51db1799238aaf").click(function(){
  if ($("#619886a13d51db1799238aaf:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_2'>교육</span>");
  } else {
    $(".f4_2").remove();
  }
})

$("#619886a13d51db1799238ab1").click(function(){
  if ($("#619886a13d51db1799238ab1:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_3'>식/음료</span>");
  } else {
    $(".f4_3").remove();
  }
})

$("#619886a13d51db1799238ab3").click(function(){
  if ($("#619886a13d51db1799238ab3:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_4'>부동산</span>");
  } else {
    $(".f4_4").remove();
  }
})

$("#619886a13d51db1799238ab5").click(function(){
  if ($("#619886a13d51db1799238ab5:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_5'>병원</span>");
  } else {
    $(".f4_5").remove();
  }
})

$("#619886a13d51db1799238ab7").click(function(){
  if ($("#619886a13d51db1799238ab7:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_6'>쇼핑</span>");
  } else {
    $(".f4_6").remove();
  }
})

$("#619886a13d51db1799238ab9").click(function(){
  if ($("#619886a13d51db1799238ab9:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_7'>패션</span>");
  } else {
    $(".f4_7").remove();
  }
})

$("#619886a13d51db1799238abc").click(function(){
  if ($("#619886a13d51db1799238abc:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_8'>인터넷 서비스</span>");
  } else {
    $(".f4_8").remove();
  }
})

// $("#619886a13d51db1799238abc").click(function(){
//   if ($("#619886a13d51db1799238abc:checkbox" ).is( ":checked")){
//     $(".sectors").append("<span class='f4_9'>엔터테인먼트</span>");
//   } else {
//     $(".f4_9").remove();
//   }
// })

$("#619886a13d51db1799238abf").click(function(){
  if ($("#619886a13d51db1799238abf:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_10'>엔터테인먼트</span>");
  } else {
    $(".f4_10").remove();
  }
})

$("#619886a13d51db1799238ac1").click(function(){
  if ($("#619886a13d51db1799238ac1:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_11'>IT 솔루션</span>");
  } else {
    $(".f4_11").remove();
  }
})

$("#619886a13d51db1799238ac3").click(function(){
  if ($("#619886a13d51db1799238ac3:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_12'>여행/숙박</span>");
  } else {
    $(".f4_12").remove();
  }
})

$("#619886a13d51db1799238ac5").click(function(){
  if ($("#619886a13d51db1799238ac5:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_13'>게임</span>");
  } else {
    $(".f4_13").remove();
  }
})

$("#619886a13d51db1799238ac7").click(function(){
  if ($("#619886a13d51db1799238ac7:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_14'>공공기관</span>");
  } else {
    $(".f4_14").remove();
  }
})

$("#619886a13d51db1799238aca").click(function(){
  if ($("#619886a13d51db1799238aca:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_15'>웨딩</span>");
  } else {
    $(".f4_15").remove();
  }
})

$("#619886a13d51db1799238acd").click(function(){
  if ($("#619886a13d51db1799238acd:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_16'>세무</span>");
  } else {
    $(".f4_16").remove();
  }
})

$("#619886a13d51db1799238acf").click(function(){
  if ($("#619886a13d51db1799238acf:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_17'>법률</span>");
  } else {
    $(".f4_17").remove();
  }
})

$("#619886a13d51db1799238ad1").click(function(){
  if ($("#619886a13d51db1799238ad1:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_18'>전문서비스</span>");
  } else {
    $(".f4_18").remove();
  }
})

$("#619886a13d51db1799238ad3").click(function(){
  if ($("#619886a13d51db1799238ad3:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_19'>금융</span>");
  } else {
    $(".f4_19").remove();
  }
})

$("#619886a13d51db1799238ad5").click(function(){
  if ($("#619886a13d51db1799238ad5:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_20'>뷰티</span>");
  } else {
    $(".f4_20").remove();
  }
})

$("#619886a13d51db1799238ad7").click(function(){
  if ($("#619886a13d51db1799238ad7:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_21'>렌탈</span>");
  } else {
    $(".f4_21").remove();
  }
})

$("#619886a13d51db1799238ad9").click(function(){
  if ($("#619886a13d51db1799238ad9:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_22'>제조</span>");
  } else {
    $(".f4_22").remove();
  }
})

$("#619886a13d51db1799238adb").click(function(){
  if ($("#619886a13d51db1799238adb:checkbox" ).is( ":checked")){
    $(".sectors").append("<span class='f4_23'>기타</span>");
    $(".sectors").append("<span class='f4_24'></span>");
  } else {
    $(".f4_23").remove();
    $(".f4_24").remove();
  }
})




$(document).ready(function(){

	// 입력란에 입력을 하면 입력내용에 내용이 출력

	// 1. #data 공간에서 keyup이라는 이벤트가 발생했을 때

	$("#txt-619886a13d51db1799238adb").keyup(function(){

		// 2. #out 공간에 #data의 내용이 출력된다.

		$(".f4_24").text($("#txt-619886a13d51db1799238adb").val());

		// #out의 위치에 text로 데이터를 받는다.(setter)

		// 들어가는 데이터는 #data의 값(.val())이다. (getter)

		// 메서드 괄호 안에 아무것도 없으면 getter, 파라미터가 있으면 setter이다.

	});

});


$("#619886a13d51db1799238add").click(function(){
  if ($("#619886a13d51db1799238add:checkbox" ).is( ":checked")){
    $(".purpose").append("<span class='f5_1'>매출향상</span>");
  } else {
    $(".f5_1").remove();
  }
})

$("#619886a13d51db1799238adf").click(function(){
  if ($("#619886a13d51db1799238adf:checkbox" ).is( ":checked")){
    $(".purpose").append("<span class='f5_2'>브랜드 인지도</span>");
  } else {
    $(".f5_2").remove();
  }
})

$("#619886a13d51db1799238ae1").click(function(){
  if ($("#619886a13d51db1799238ae1:checkbox" ).is( ":checked")){
    $(".purpose").append("<span class='f5_3'>회원가입</span>");
  } else {
    $(".f5_3").remove();
  }
})

$("#619886a13d51db1799238ae3").click(function(){
  if ($("#619886a13d51db1799238ae3:checkbox" ).is( ":checked")){
    $(".purpose").append("<span class='f5_4'>제품홍보</span>");
  } else {
    $(".f5_4").remove();
  }
})

$("#619886a13d51db1799238ae5").click(function(){
  if ($("#619886a13d51db1799238ae5:checkbox" ).is( ":checked")){
    $(".purpose").append("<span class='f5_5'>기업홍보</span>");
  } else {
    $(".f5_5").remove();
  }
})

$("#619886a13d51db1799238ae7").click(function(){
  if ($("#619886a13d51db1799238ae7:checkbox" ).is( ":checked")){
    $(".purpose").append("<span class='f5_6'>이벤트 참여</span>");
  } else {
    $(".f5_6").remove();
  }
})

$("#619886a13d51db1799238ae9").click(function(){
  $(".start_date").text("협의 가능");
})

$("#619886a13d51db1799238aeb").click(function(){
  $(".start_date").text("1주일 이내");
})

$("#619886a13d51db1799238aed").click(function(){
  $(".ing_date").text("1회성");
})

$("#619886a13d51db1799238aef").click(function(){
  $(".ing_date").text("1개월");
})

$("#619886a13d51db1799238af1").click(function(){
  $(".ing_date").text("3개월");
})

$("#619886a13d51db1799238af3").click(function(){
  $(".ing_date").text("6개월");
})

$("#619886a13d51db1799238af5").click(function(){
  $(".ing_date").text("1년");
})

$("#619886a13d51db1799238af7").click(function(){
  $(".ing_date").text("1년 이상");
})

$("#619886a13d51db1799238af9").click(function(){
  $(".ing_date").text("상담 후 결정");
})

$("#619886a13d51db1799238afb").click(function(){
  $(".money_span").text("일시불");
  $(".f8_1").css("display","inline-block");
  $(".f8_2").css("display","none");
  $(".f8_2").text("");
  $(".money_span").css("display","inline-block");
})
$("#619886a13d51db1799238afd").click(function(){
  $(".money_span").text("월");
  $(".f8_2").css("display","inline-block");
  $(".f8_1").css("display","none");
  $(".f8_1").text("");
  $(".money_span").css("display","inline-block");
})
$("#619886a13d51db1799238aff").click(function(){
  $(".money span").text("상담 후 결정");
  $(".f8_1").css("display","none");
  $(".f8_2").css("display","none");
  $(".f8_1").text("");
  $(".f8_2").text("");
  $(".money_span").css("display","inline-block");
})

$(document).ready(function(){
	$("#txt-619886a13d51db1799238afb").keyup(function(){
		$(".f8_1").text($("#txt-619886a13d51db1799238afb").val());
	});
});
$(document).ready(function(){
	$("#txt-619886a13d51db1799238afd").keyup(function(){
		$(".f8_2").text($("#txt-619886a13d51db1799238afd").val());
	});
});

$("#619886a13d51db1799238b01").click(function(){
  if ($("#619886a13d51db1799238b01:checkbox" ).is( ":checked")){
    $(".place").append("<span class='f9_1'>서울</span>");
  } else {
    $(".f9_1").remove();
  }
})

$("#619886a13d51db1799238b03").click(function(){
  if ($("#619886a13d51db1799238b03:checkbox" ).is( ":checked")){
    $(".place").append("<span class='f9_2'>경기</span>");
  } else {
    $(".f9_2").remove();
  }
})

$("#619886a13d51db1799238b05").click(function(){
  if ($("#619886a13d51db1799238b05:checkbox" ).is( ":checked")){
    $(".place").append("<span class='f9_3'>인천</span>");
  } else {
    $(".f9_3").remove();
  }
})

$("#619886a13d51db1799238b07").click(function(){
  if ($("#619886a13d51db1799238b07:checkbox" ).is( ":checked")){
    $(".place").append("<span class='f9_4'>충북</span>");
  } else {
    $(".f9_4").remove();
  }
})
$("#619886a13d51db1799238b09").click(function(){
  if ($("#619886a13d51db1799238b09:checkbox" ).is( ":checked")){
    $(".place").append("<span class='f9_5'>충남</span>");
  } else {
    $(".f9_5").remove();
  }
})
$("#619886a13d51db1799238b0b").click(function(){
  if ($("#619886a13d51db1799238b0b:checkbox" ).is( ":checked")){
    $(".place").append("<span class='f9_6'>대전</span>");
  } else {
    $(".f9_6").remove();
  }
})
$("#619886a13d51db1799238b0d").click(function(){
  if ($("#619886a13d51db1799238b0d:checkbox" ).is( ":checked")){
    $(".place").append("<span class='f9_7'>세종</span>");
  } else {
    $(".f9_7").remove();
  }
})
$("#619886a13d51db1799238b0f").click(function(){
  if ($("#619886a13d51db1799238b0f:checkbox" ).is( ":checked")){
    $(".place").append("<span class='f9_8'>강원</span>");
  } else {
    $(".f9_8").remove();
  }
})
$("#619886a13d51db1799238b11").click(function(){
  if ($("#619886a13d51db1799238b11:checkbox" ).is( ":checked")){
    $(".place").append("<span class='f9_9'>울산</span>");
  } else {
    $(".f9_9").remove();
  }
})
$("#619886a13d51db1799238b13").click(function(){
  if ($("#619886a13d51db1799238b13:checkbox" ).is( ":checked")){
    $(".place").append("<span class='f9_10'>대구</span>");
  } else {
    $(".f9_10").remove();
  }
})
$("#619886a13d51db1799238b15").click(function(){
  if ($("#619886a13d51db1799238b15:checkbox" ).is( ":checked")){
    $(".place").append("<span class='f9_11'>경남</span>");
  } else {
    $(".f9_11").remove();
  }
})
$("#619886a13d51db1799238b17").click(function(){
  if ($("#619886a13d51db1799238b17:checkbox" ).is( ":checked")){
    $(".place").append("<span class='f9_12'>경북</span>");
  } else {
    $(".f9_12").remove();
  }
})
$("#619886a13d51db1799238b19").click(function(){
  if ($("#619886a13d51db1799238b19:checkbox" ).is( ":checked")){
    $(".place").append("<span class='f9_12'>부산</span>");
  } else {
    $(".f9_12").remove();
  }
})
$("#619886a13d51db1799238b1b").click(function(){
  if ($("#619886a13d51db1799238b1b:checkbox" ).is( ":checked")){
    $(".place").append("<span class='f9_13'>광주</span>");
  } else {
    $(".f9_13").remove();
  }
})
$("#619886a13d51db1799238b1d").click(function(){
  if ($("#619886a13d51db1799238b1d:checkbox" ).is( ":checked")){
    $(".place").append("<span class='f9_14'>전북</span>");
  } else {
    $(".f9_14").remove();
  }
})
$("#619886a13d51db1799238b1f").click(function(){
  if ($("#619886a13d51db1799238b1f:checkbox" ).is( ":checked")){
    $(".place").append("<span class='f9_15'>전남</span>");
  } else {
    $(".f9_15").remove();
  }
})
$("#619886a13d51db1799238b21").click(function(){
  if ($("#619886a13d51db1799238b21:checkbox" ).is( ":checked")){
    $(".place").append("<span class='f9_16'>제주</span>");
  } else {
    $(".f9_16").remove();
  }
})
$("#619886a13d51db1799238b23").click(function(){
  if ($("#619886a13d51db1799238b23:checkbox" ).is( ":checked")){
    $(".place").append("<span class='f9_17'>기타</span>");
    $(".place").append("<span class='f9_18'></span>");
  } else {
    $(".f9_17").remove();
    $(".f9_18").remove();
  }
})

$(document).ready(function(){
	$("#txt-619886a13d51db1799238b23").keyup(function(){
		$(".f9_18").text($("#txt-619886a13d51db1799238b23").val());
	});
});



$("#619886a13d51db1799238b25").click(function(){
  if ($("#619886a13d51db1799238b25:checkbox" ).is( ":checked")){
    $(".feedback").append("<span class='f10_1'>전화상담</span>");
  } else {
    $(".f10_1").remove();
  }
})

$("#619886a13d51db1799238b27").click(function(){
  if ($("#619886a13d51db1799238b27:checkbox" ).is( ":checked")){
    $(".feedback").append("<span class='f10_2'>채팅상담</span>");
  } else {
    $(".f10_2").remove();
  }
})

$("#619886a13d51db1799238b29").click(function(){
  if ($("#619886a13d51db1799238b29:checkbox" ).is( ":checked")){
    $(".feedback").append("<span class='f10_3'>방문상담</span>");
  } else {
    $(".f10_3").remove();
  }
})

// =체크시 미리보기=




  

// $('.hello').each(function () {
//   if ( $(this).length > 0 ) {
//     $(this).parent("li").addClass("on");
//   } else {
//     $(this).parent("li").removeClass("on");
//   }
// });





$(".next").click(function(){
  if($(".channel_txt span").length>0){
    $(".channel_txt").parent("li").css("display","block");
  } else {
    $(".channel_txt").parent("li").css("display","none");
  }
})



$(".next").click(function(){
  if ($(".posting_txt span").text() == "") {
    $(".posting_txt").parent("li").css("display","none");
  } else {
    $(".posting_txt").parent("li").css("display","block");
  }
})

$(".next").click(function(){
  if($(".sectors span").length>0){
    $(".sectors").parent("li").css("display","block");
  } else {
    $(".sectors").parent("li").css("display","none");
  }
})

$(".next").click(function(){
  if($(".purpose span").length>0){
    $(".purpose").parent("li").css("display","block");
  } else {
    $(".purpose").parent("li").css("display","none");
  }
})


$(".next").click(function(){
  if ($(".start_date").text() == "") {
    $(".start_date").parent("li").css("display","none");
  } else {
    $(".start_date").parent("li").css("display","block");
  }
})

$(".next").click(function(){
  if ($(".ing_date").text() == "") {
    $(".ing_date_box").parent("li").css("display","none");
  } else {
    $(".ing_date_box").parent("li").css("display","block");
  }
})

$(".next").click(function(){
  if ($(".money_span").text() == "") {
    $(".money").parent("li").css("display","none");
  } else {
    $(".money").parent("li").css("display","block");
  }
})

$(".next").click(function(){
  if($(".place span").length>0){
    $(".place").parent("li").css("display","block");
  } else {
    $(".place").parent("li").css("display","none");
  }
})

$(".next").click(function(){
  if($(".feedback span").length>0){
    $(".feedback").parent("li").css("display","block");
  } else {
    $(".feedback").parent("li").css("display","none");
  }
})



$(document).ready(function() {
  if (window.location.href.indexOf("/form?topic=619886a03d51db1799238a63") > -1) {
    $(".request_m_title").text("검색엔진최적화");
  }
});

$(document).ready(function() {
  if (window.location.href.indexOf("/form?topic=619886a13d51db1799238a67") > -1) {
    $(".request_m_title").text("바이럴 마케팅");
  }
});

$(document).ready(function() {
  if (window.location.href.indexOf("/form?topic=619886a13d51db1799238a69") > -1) {
    $(".request_m_title").text("SNS 계정관리");
  }
});

$(document).ready(function() {
  if (window.location.href.indexOf("/form?topic=619886a13d51db1799238a6b") > -1) {
    $(".request_m_title").text("인플루언서");
  }
});

$(document).ready(function() {
  if (window.location.href.indexOf("/form?topic=619886a13d51db1799238a6d") > -1) {
    $(".request_m_title").text("언론 홍보(보도자료 송출)");
  }
});

$(document).ready(function() {
  if (window.location.href.indexOf("/form?topic=619886a13d51db1799238a6f") > -1) {
    $(".request_m_title").text("배너 광고");
  }
});

$(document).ready(function() {
  if (window.location.href.indexOf("/form?topic=619886a13d51db1799238a71") > -1) {
    $(".request_m_title").text("해외/글로벌 마케팅");
  }
});

$(document).ready(function() {
  if (window.location.href.indexOf("/form?topic=619886a13d51db1799238a73") > -1) {
    $(".request_m_title").text("오프라인 광고 (옥외광고, 버스광고, 지하철광고, 라디오광고, 잡지 광고 등)");
  }
});

$(document).ready(function() {
  if (window.location.href.indexOf("/form?topic=619886a13d51db1799238a75") > -1) {
    $(".request_m_title").text("판촉물 제작/배포");
  }
});


var today = new Date();

var year = today.getFullYear();
var month = ('0' + (today.getMonth() + 1)).slice(-2);
var day = ('0' + today.getDate()).slice(-2);

var hours = today.getHours();
var minutes = today.getMinutes();

var dateString = year + '.' + month  + '.' + day + '. ' + hours + ':' + minutes;

$(".request_m_date").text(dateString);


