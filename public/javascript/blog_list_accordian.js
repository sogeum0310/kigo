$(".blog_list_area li h2").click(function(){
    if($(this).parents(".blog_list_area li").hasClass("down")){
        $(this).parent("li").removeClass("down");
    } else {
        $(this).parent("li").addClass("down");
    }
})