
    $(".field1").parent(".estimate_form_group_s_box").addClass("filed1_ssbox");
    $(".filed1_ssbox").siblings(".request_slide_btn").children(".next").addClass("filed1_next");

    $(".field2").parent(".estimate_form_group_s_box").addClass("filed2_ssbox");
    $(".filed2_ssbox").siblings(".request_slide_btn").children(".next").addClass("filed2_next");

    $(".field3").parent(".estimate_form_group_s_box").addClass("filed3_ssbox");
    $(".filed3_ssbox").siblings(".request_slide_btn").children(".next").addClass("filed3_next");

    $(".field4").parent(".estimate_form_group_s_box").addClass("filed4_ssbox");
    $(".filed4_ssbox").siblings(".request_slide_btn").children(".next").addClass("filed4_next");

    $(".field5").parent(".estimate_form_group_s_box").addClass("filed5_ssbox");
    $(".filed5_ssbox").siblings(".request_slide_btn").children(".next").addClass("filed5_next");

    $(".field6").parent(".estimate_form_group_s_box").addClass("filed6_ssbox");
    $(".filed6_ssbox").siblings(".request_slide_btn").children(".next").addClass("filed6_next");
  
    $(".field7").parent(".estimate_form_group_s_box").addClass("filed7_ssbox");
    $(".filed7_ssbox").siblings(".request_slide_btn").children(".next").addClass("filed7_next");

    $(".field8").parent(".estimate_form_group_s_box").addClass("filed8_ssbox");
    $(".filed8_ssbox").siblings(".request_slide_btn").children(".next").addClass("filed8_next");

    $(".field9").parent(".estimate_form_group_s_box").addClass("filed9_ssbox");
    $(".filed9_ssbox").siblings(".request_slide_btn").children(".next").addClass("filed9_next");

    $(".field10").parent(".estimate_form_group_s_box").addClass("filed10_ssbox");
    $(".filed10_ssbox").siblings(".request_slide_btn").children(".next").addClass("filed10_next");
  
    $(".filed1_next").click(function(){
      if (!$("input[name='field1']:checked").val()){
        alert("선택사항을 체크해주세요.");
        num +=100;
      }
    })

    $(".filed2_next").click(function(){
      if (!$("input[name='field2']:checked").val()){
        alert("선택사항을 체크해주세요.");
        num +=100;
      }
    })

    $(".filed3_next").click(function(){
      if (!$("input[name='field3']:checked").val()){
        alert("선택사항을 체크해주세요.");
        num +=100;
      }
    })

    $(".filed4_next").click(function(){
      if (!$("input[name='field4']:checked").val()){
        alert("선택사항을 체크해주세요.");
        num +=100;
      }
    })

    $(".filed5_next").click(function(){
      if (!$("input[name='field5']:checked").val()){
        alert("선택사항을 체크해주세요.");
        num +=100;
      }
    })
  
    $(".filed6_next").click(function(){
      if (!$("input[name='field6']:checked").val()){
        alert("선택사항을 체크해주세요.");
        num +=100;
      }
    })

    $(".filed7_next").click(function(){
      if (!$("input[name='field7']:checked").val()){
        alert("선택사항을 체크해주세요.");
        num +=100;
      }
    })

    $(".filed8_next").click(function(){
      if (!$("input[name='field8']:checked").val()){
        alert("선택사항을 체크해주세요.");
        num +=100;
      }
    })

    $(".filed9_next").click(function(){
      if (!$("input[name='field9']:checked").val()){
        alert("선택사항을 체크해주세요.");
        num +=100;
      }
    })

    $(".filed10_next").click(function(){
      if (!$("input[name='field10']:checked").val()){
        alert("선택사항을 체크해주세요.");
        num +=100;
      }
    })
  
  
  var prevall = document.querySelectorAll(".prev");
        
  var prevallLength = prevall.length;
 
  for(var i=0; i < prevallLength; i++){
    prevall[i].addEventListener('click', function (e) {
      e.preventDefault()
      num += 100
      container.style.transform = `translateX(${num}%)`

    
      document.getElementById('demo').textContent = Math.floor(- num / groups.length + x) ;
    
      document.getElementById('demo_bar').style.width = Math.floor(- num / groups.length + x) + "%" ;

      window.scrollTo(0,0);
    })
    
  }

  var nextall = document.querySelectorAll(".next");

  var nextallLength = nextall.length;

  for(var i=0; i < nextallLength; i++){
    nextall[i].addEventListener('click', function (e) {
      e.preventDefault()
    
      num -= 100
      container.style.transform = `translateX(${num}%)`
    
    
      document.getElementById('demo').textContent = Math.floor(- num / groups.length + x) ;
    
      
      document.getElementById('demo_bar').style.width = Math.floor(- num / groups.length + x) + "%" ;

      window.scrollTo(0,0);
    })
  }



  // $('.estimate_form_group_s_box').each(function () {
  //   $(this).siblings(".request_slide_btn").children(".next").click(function(){
  //     var name = $(this).find(input).attr('name');
  //     alert(name);
  //     if (!$("input[name='field4']:checked").val()){
  //       alert('선택사항을 체크해주세요.');
  //       return false;
  //     }
  //   })
  // });

  

