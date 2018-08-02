 var map = {};
 var page = {};
 $(function() {
     page.init()
     map.drag()
     map.task();
     
 });
 // 地图拖拽
 map.drag = function() {
     var oDiv = $(".map_bg")[0]
     oDiv.onmousedown = function(ev) {
         /*获取鼠标点击元素身上的位置*/
         var ev = ev || event;
         var disX = ev.clientX - this.offsetLeft;
         var disY = ev.clientY - this.offsetTop;
         document.onmousemove = function(ev) {
             var ev = ev || event;
             oDiv.style.left = ev.clientX - disX + 'px';
             oDiv.style.top = ev.clientY - disY + 'px';
         }
         document.onmouseup = function(ev) {
             document.onmousemove = oDiv.onmouseup = null;
         }
         return false;
     }
 }
 map.task = function() {
     // 任务完成的弹窗 
     $(".venus_item").find("li").on("click", function() {
         $(".task_box").fadeIn()
     })
     // 关闭任务弹窗
     $(".task_box").find(".close").on("click", function() {
         $(".task_box").fadeOut();
     })
     // 关闭答题弹窗
     $(".close_quest").on("click", function() {
         $(".question_box").fadeOut()
     })
 }
 page.init = function() {
     $(".container").mCustomScrollbar({
         autoHideScrollbar: true,
         theme:"dark",
         axis:"yx" 
     });
     $(".main_list_wrap").mCustomScrollbar({
         autoHideScrollbar: true,
         theme:"dark",
         axis:"y" 
     });     
     
 }