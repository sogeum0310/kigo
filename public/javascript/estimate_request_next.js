



$(document).ready(function(){
  $('.estimate_request_next_btn1').click(function() {
    if (!$("input[name='platform']:checked").val()) {
       alert('선택사항을 체크해주세요.');
        return false;
    }
    else {
      $(".estimate_request_box1").addClass("off");
      $(".estimate_request_box2").addClass("on");
      $(".estimate_request_percent_bar1").addClass("off");
      $(".estimate_request_percent_bar2").addClass("on");
      $(this).addClass("off");
      $(".estimate_request_next_btn2").addClass("on"); 
    }
  });
});

$(document).ready(function(){
  $('.estimate_request_next_btn2').click(function() {
    if (!$("input[name='how_many']:checked").val()) {
       alert('선택사항을 체크해주세요.');
        return false;
    }
    else {
      $(".estimate_request_box2").addClass("off");
      $(".estimate_request_box3").addClass("on");
      $(".estimate_request_percent_bar2").addClass("off");
      $(".estimate_request_percent_bar3").addClass("on");
      $(this).addClass("off");
      $(".estimate_request_next_btn3").addClass("on");
    }
  });
});

$(document).ready(function(){
  $('.estimate_request_next_btn3').click(function() {
    if (!$("input[name='business']:checked").val()) {
       alert('선택사항을 체크해주세요.');
        return false;
    }
    else {
      $(".estimate_request_box3").addClass("off");
      $(".estimate_request_box4").addClass("on");
      $(".estimate_request_percent_bar3").addClass("off");
      $(".estimate_request_percent_bar4").addClass("on");
      $(this).addClass("off");
      $(".estimate_request_next_btn4").addClass("on");
    }
  });
});

$(document).ready(function(){
  $('.estimate_request_next_btn4').click(function() {
    if (!$("input[name='goal']:checked").val()) {
       alert('선택사항을 체크해주세요.');
        return false;
    }
    else {
      $(".estimate_request_box4").addClass("off");
      $(".estimate_request_box5").addClass("on");
      $(".estimate_request_percent_bar4").addClass("off");
      $(".estimate_request_percent_bar5").addClass("on");
      $(this).addClass("off");
      $(".estimate_request_next_btn5").addClass("on");
    }
  });
});

$(document).ready(function(){
  $('.estimate_request_next_btn5').click(function() {
    if (!$("input[name='start_day']:checked").val()) {
       alert('선택사항을 체크해주세요.');
        return false;
    }
    else {
      $(".estimate_request_box5").addClass("off");
      $(".estimate_request_box6").addClass("on");
      $(".estimate_request_percent_bar5").addClass("off");
      $(".estimate_request_percent_bar6").addClass("on");
      $(this).addClass("off");
      $(".estimate_request_next_btn6").addClass("on");
    }
  });
});

$(document).ready(function(){
  $('.estimate_request_next_btn6').click(function() {
    if (!$("input[name='how_long']:checked").val()) {
       alert('선택사항을 체크해주세요.');
        return false;
    }
    else {
      $(".estimate_request_box6").addClass("off");
      $(".estimate_request_box7").addClass("on");
      $(".estimate_request_percent_bar6").addClass("off");
      $(".estimate_request_percent_bar7").addClass("on");
      $(this).addClass("off");
      $(".estimate_request_next_btn7").addClass("on");
    }
  });
});

$(document).ready(function(){
  $('.estimate_request_next_btn7').click(function() {
    if (!$("input[name='cost']:checked").val()) {
       alert('선택사항을 체크해주세요.');
        return false;
    }
    else {
      $(".estimate_request_box7").addClass("off");
      $(".estimate_request_box8").addClass("on");
      $(".estimate_request_percent_bar7").addClass("off");
      $(".estimate_request_percent_bar8").addClass("on");
      $(this).addClass("off");
      $(".estimate_request_next_btn8").addClass("on");
    }
  });
});

$(document).ready(function(){
  $('.estimate_request_next_btn8').click(function() {
    if (!$("input[name='city']:checked").val()) {
       alert('선택사항을 체크해주세요.');
        return false;
    }
    else {
      $(".estimate_request_box8").addClass("off");
      $(".estimate_request_box9").addClass("on");
      $(".estimate_request_percent_bar8").addClass("off");
      $(".estimate_request_percent_bar9").addClass("on");
      $(this).addClass("off");
      $(".estimate_request_next_btn9").addClass("on");
    }
  });
});

$(document).ready(function(){
  $('.estimate_request_next_btn9').click(function() {
    if (!$("input[name='feedback']:checked").val()) {
       alert('선택사항을 체크해주세요.');
        return false;
    }
    else {
      $(".estimate_request_box9").addClass("off");
      $(".estimate_request_percent_bar9").addClass("off");
      $(".estimate_request_percent_bar10").addClass("on");
      $(this).addClass("off");
      $(".estimate_request_submit").addClass("on");
    }
  });
});

// $(".estimate_request_next_btn1").click(function(){
//   $(".estimate_request_box1").addClass("off");
//   $(".estimate_request_box2").addClass("on");
//   $(".estimate_request_percent_bar1").addClass("off");
//   $(".estimate_request_percent_bar2").addClass("on");
//   $(this).addClass("off");
//   $(".estimate_request_next_btn2").addClass("on");
// });

// $(".estimate_request_next_btn2").click(function(){
//   $(".estimate_request_box2").addClass("off");
//   $(".estimate_request_box3").addClass("on");
//   $(".estimate_request_percent_bar2").addClass("off");
//   $(".estimate_request_percent_bar3").addClass("on");
//   $(this).addClass("off");
//   $(".estimate_request_next_btn3").addClass("on");
// });

// $(".estimate_request_next_btn3").click(function(){
//   $(".estimate_request_box3").addClass("off");
//   $(".estimate_request_box4").addClass("on");
//   $(".estimate_request_percent_bar3").addClass("off");
//   $(".estimate_request_percent_bar4").addClass("on");
//   $(this).addClass("off");
//   $(".estimate_request_next_btn4").addClass("on");
// });

// $(".estimate_request_next_btn4").click(function(){
//   $(".estimate_request_box4").addClass("off");
//   $(".estimate_request_box5").addClass("on");
//   $(".estimate_request_percent_bar4").addClass("off");
//   $(".estimate_request_percent_bar5").addClass("on");
//   $(this).addClass("off");
//   $(".estimate_request_next_btn5").addClass("on");
// });

// $(".estimate_request_next_btn5").click(function(){
//   $(".estimate_request_box5").addClass("off");
//   $(".estimate_request_box6").addClass("on");
//   $(".estimate_request_percent_bar5").addClass("off");
//   $(".estimate_request_percent_bar6").addClass("on");
//   $(this).addClass("off");
//   $(".estimate_request_next_btn6").addClass("on");
// });

// $(".estimate_request_next_btn6").click(function(){
//   $(".estimate_request_box6").addClass("off");
//   $(".estimate_request_box7").addClass("on");
//   $(".estimate_request_percent_bar6").addClass("off");
//   $(".estimate_request_percent_bar7").addClass("on");
//   $(this).addClass("off");
//   $(".estimate_request_next_btn7").addClass("on");
// });

// $(".estimate_request_next_btn7").click(function(){
//   $(".estimate_request_box7").addClass("off");
//   $(".estimate_request_box8").addClass("on");
//   $(".estimate_request_percent_bar7").addClass("off");
//   $(".estimate_request_percent_bar8").addClass("on");
//   $(this).addClass("off");
//   $(".estimate_request_next_btn8").addClass("on");
// });

// $(".estimate_request_next_btn8").click(function(){
//   $(".estimate_request_box8").addClass("off");
//   $(".estimate_request_box9").addClass("on");
//   $(".estimate_request_percent_bar8").addClass("off");
//   $(".estimate_request_percent_bar9").addClass("on");
//   $(this).addClass("off");
//   $(".estimate_request_next_btn9").addClass("on");
//   $(".estimate_request_submit").addClass("on");
// });



// $("input:radio[value=615e20ccb40ebf228c022fe9]").prop("checked",true);

// $("input:radio[value=615e20ccb40ebf228c022ff2]").prop("checked",true);

// $("input:checkbox[value=615e20ccb40ebf228c022ff6]").prop("checked",true);

// $("input:checkbox[value=615e20ccb40ebf228c02300c]").prop("checked",true);

// $("input:radio[value=615e20ccb40ebf228c023013]").prop("checked",true);

// $("input:radio[value=615e20ccb40ebf228c023015]").prop("checked",true);

// $("input:radio[value=615e20ccb40ebf228c02301c]").prop("checked",true);

// $("input:checkbox[value=615e20ccb40ebf228c023021]").prop("checked",true);

// $("input:checkbox[value=615e20ccb40ebf228c023031]").prop("checked",true);
