<template>
    <div>
        <div id="div_window" class="lay_login">
            <a href="javascript:hidewindow()" class="lay_colse">关闭</a>
            <div v-if="showLogin">
                <div class="lay_login_l lay_login_cl">
                    <div class="lay_login_tit01">登录265G通行证</div>
                    <ul class="lay_login_m">
                        <li><input id="lusername" type="text" value="请输入您的用户名" class="lay_login_txt01"></li>
                        <li>
                            <input id="lpwd2" type="text" value="密码" class="lay_login_txt01">
                            <input id="lpwd" type="password" class="lay_login_txt02" style="display:none;">
                        </li>
                        <li><input onclick="login()" type="button" value="登录" class="lay_login_btn"></li>
                        <li>
                            <span class="lay_login_cl"><input id="lcookide" type="checkbox" value="1">自动登录</span>
                            <span class="lay_login_cr">
                                <a href="http://my.265g.com/index.php?ac=getpwd" target="_blank">忘记密码？</a>
                                <i class="lay_line">|</i>
                                <a href="javascript:show_reg()">注册账号</a>
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="lay_login_r lay_login_cr">
                    <p>合作网站登录</p>
                    <a target="_blank" href="http://user.265g.com/qqlogin/" class="lay_btn_qq">QQ账号登录</a>
                </div>
            </div>
            <div v-else-if="showJoin">
                <div class="lay_login_l lay_login_cl">
                    <div class="lay_login_tit02">注册265G通行证</div>
                    <ul class="lay_login_m">
                        <li>
                            <input id="rusername" type="text" value="请输入您的用户名" class="lay_login_txt01" onblur="rerusernameblur()" onfocus="rerusernamefocus()" />
                            <p class="lay_inptip" id="tips_rusername">由数字,字母,下划线组成，长度为4-12位。</p>
                        </li>
                        <li>
                            <input id="rpwd1_1" type="text" value="密码" class="lay_login_txt01" />
                            <input id="rpwd1" type="password" class="lay_login_txt02" onblur="rerpwd1blur()" style="display:none;" />
                            <p class="lay_inptip" id="tips_rpwd1">6-12位字符（格式为字母+数字）</p>
                        </li>
                        <li>
                            <input id="rpwd2_1" type="text" value="确认密码" class="lay_login_txt01" />
                            <input id="rpwd2" type="password" onblur="rerpwd2blur()" class="lay_login_txt02" style="display:none;" />
                            <p class="lay_inptip" id="tips_rpwd2">请再次输入密码</p>
                        </li>
                        <li><span> </span>
                        </li>
                        <li id="checkcode"></li>
                        <li style="clear:both;">
                            <p class="lay_inptip" id="code_tips">鼠标移动到滑块上开始验证，<a href="http://www.geetest.com/install/sections/idx-basic-introduction.html" target="_blank">查看帮助</a>
                            </p>
                        </li>
                        <li>
                            <input id="token" type="hidden" value="8bd6u3T2wjaWdgNw1GZ/U3Vu673ozHKdFjr3uJFWoikPLSRqj2pzhl2im1ItliCanz9sCk6eLyPt67T0byaMGYKaXXOym5ZN" />
                        </li>
                        <li>
                            <input onclick="reg()" type="button" value="注册" class="lay_login_btn" />
                        </li>
                        <li><span class="lay_login_cl"><input type="checkbox" class="checK" checked="checked"><a href="http://user.265g.com/index.php?tp=mark" target="_blank"> 已经阅读并同意注册协议</a></span>
                        </li>
                    </ul>
                </div>
                <div class="lay_login_r lay_login_cr">
                    <p>已有账号？</p><a href="javascript:show_login()" class="lay_alogin">现在登录</a>
                    <p>合作网站登录</p><a target="_blank" href="http://user.265g.com/qqlogin/" class="lay_btn_qq">QQ账号登录</a> 
                </div>
            </div>
        </div>
        <div id="dd_light" class="login_mask" style="display: block;"></div>
    </div>
    
</template>

<style lang="less">
  @import "~assets/styles/popupLogin.less";
</style>


