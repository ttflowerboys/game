 var clickObj = {}
 $(function() {
     clickObj.eventAll()
 });
 clickObj.eventAll = function() {
     $(".addQ").on("click", function() {
         layer.open({
             type: 1,
             title:["我要提问",'font-size:18px;text-align:center;'],
             area: ['600px', '632px'], //宽高
             content: $(".ask_wrap").html()
         });
     })
     $(".top_nav").find("a").on("click",function(){
        $(this).addClass("active").siblings('a').removeClass("active")
     })

 }