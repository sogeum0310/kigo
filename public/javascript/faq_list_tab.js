
  $(document).ready(function () {

    var url = window.location.href;

    $('.blog_list_tab a').filter(function () {
      if (url.includes('/company/faq/personal')) {
        $(this).parents(".blog_list_tab").addClass('active');
      } else if (url.includes('/company/faq/business')) {
        $(this).parents(".blog_list_tab").addClass('active');
      } 

    })

  });



  $(document).ready(function () {
 
    var url = window.location.href;
    $('.blog_list_tab > li > a').each(function () {
      if (url.indexOf($(this).attr('href')) > -1) {
        $(this).parent("li").addClass('active');
      }
    });
  });