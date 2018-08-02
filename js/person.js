 var clickObj = {}
 $(function() {
     clickObj.eventAll()
 });
 clickObj.eventAll = function() {
     $(".edit_info").on("click", function() {
         layer.open({
             type: 1,
             title: ["我要提问", 'font-size:18px;text-align:center;'],
             area: ['820px', '607px'], //宽高
             content: $(".pop").html()
         });
     })
     // 主导航切换
     $(".top_nav").find("a").on("click", function() {
         var index = $(this).index();
         $(this).addClass("active").siblings('a').removeClass("active")
         $(".list_box").find(".item_x").hide();
         $(".list_box").find(".item_x").eq(index).show()
     })
     // 基地和展览切换
     $(".toggle_base").find("a").on("click", function() {
         $(this).addClass("active").siblings('a').removeClass("active");
     })

 }