 var clickObj = {};
 $(function() {
     clickObj.eventAll();
     $("#login input[type='button']").click(function () {//登录
         var user=$.trim($("#login input[type='text']").val()),pwd=$.trim($("#login input[type='password']").val());
         if(user==""||pwd==""){
             $.layAlert("提示","用户名或密码不能为空！");
             return;
         }
         $.myAjax("/auth/token",{username:user,password:pwd},function(data){
             if(data.status=="success"){
                 var token=data.data;
                 $.setCookie("token",token);
                 $.ajaxT("/personal/details",{},function(data){
                     $.delCookie("token");//先清除，后再设置
                     if(data.status=="success"){
                         var userPhoto="img/login.png",userName=data["data"].simpleUser.name,userSchool=" ",userGrade=" ";
                         if(data["data"].simpleUser&&data["data"].simpleUser.photo!=null&&data["data"].simpleUser.photo!=""){
                             userPhoto=data["data"].simpleUser.photo;
                         }
                         if(data["data"].currentDetail&&data["data"].currentDetail.showTitle!=null&&data["data"].currentDetail.showTitle!=""){
                             userSchool=data["data"].currentDetail.showTitle;
                         }
                         if(data["data"].currentDetail&&data["data"].currentDetail.school_class!=null&&data["data"].currentDetail.school_class!=""){
                             userGrade=data["data"].currentDetail.school_class;
                         }
                         $.setCookie("token",token);
                         $.setCookie("userPhoto",userPhoto);
                         $.setCookie("userName",userName);
                         $.setCookie("userSchool",userSchool);
                         $.setCookie("userGrade",userGrade);
                         if(data["data"].hasDetail){//有报名信息

                         }
                         window.open("index.html","_self");
                     }else{
                         $.layAlert("系统错误",data.message);
                     }
                 });
             }else{
                 $.layAlert("系统错误",data.message);
             }
         });
     });
     $("#regist input[type='button']").click(function () {//注册
         var phone=$.trim($("input.phone").val()),code=$.trim($("input.valid").val()),pwd=$.trim($("#regist input[type='password']").val()),checkbox=$("#checkbox").attr("checked");
         if(checkbox!="checked"){
             $.layAlert("提示","请先勾选隐私协议！");
             return;
         }
         if(phone==""){
             $.layAlert("提示","手机号不能为空！");
             return;
         }else if(code==""){
             $.layAlert("提示","验证码不能为空！");
             return;
         }else if(pwd==""){
             $.layAlert("提示","密码不能为空！");
             return;
         }
         $.myAjax("/auth/register",{phone:phone,code:code,password:pwd},function(data){
             if(data.status=="success"){
                 $.layAlert("提示","注册成功！");
             }else{
                 $.layAlert("系统错误",data.message);
             }
         });
     });
     $("#regist .valid_btn").click(function () {//验证码发送
         var phone=$.trim($("input.phone").val());
         if(phone!=""){
             $.myAjax("/auth/regcode",{phone:phone},function(data){
                 if(data.status=="success"){
                     $.layAlert("提示","验证码发送成功，注意查收！");
                 }else{
                     $.layAlert("系统错误",data.message);
                 }
             });
         }else {
             $.layAlert("提示","请输入手机号！");
         }
     });
 });
 clickObj.eventAll = function() {
     // 登录注册切换
     $(".toggle_nav").find("a").on("click", function() {
         var index = $(this).index();
         $(this).addClass("active").siblings('a').removeClass("active");
         if (index == 0) {
             $("#login").show();
             $("#regist").hide();
         } else {
             $("#regist").show();
             $("#login").hide();
         }

     })
     // 同意协议
     $(".agree").on("click", function() {
         var status = $(".other").find("input").attr("checked");
         if (status) {
             $(this).siblings('input').removeAttr("checked")
         } else {
             $(this).siblings('input').attr("checked", "checked")
         }
     })

 }