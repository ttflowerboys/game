var leftNav={};
$(function(){
   leftNav.clickAll()
})
leftNav.clickAll=function(){
	$(".left_tips").find("li").on("click",function(){
		var index=$(this).index();
		$(this).addClass("active").siblings('li').removeClass("active")
		$(".box_inner").find(".section").hide();
		$(".box_inner").find(".section").eq(index).show();
	})
}