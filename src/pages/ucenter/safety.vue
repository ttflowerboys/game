<template>
    <div class="center-grid">
            	<h4>账号安全</h4>
                <div class="safety-top">
                    <div class="security-index">
                    	                                                	<!-- 安全指数低 -->
                        	<span class="red"></span><span></span><span></span>安全指数：<strong class="low">低</strong>
                                                <!-- 上次登录时间 -->
                        <p class="last-login">上次登录时间：2018-07-08 11:45:52</p>
                    </div>
                                        	<div class="safety-tips low">您的账号未设置任何安全措施，请您进行“<strong>密保邮箱</strong>”、“<strong>密保手机</strong>”安全设置，完成账号安全认证！
</div>
                                    </div>
                <div class="safety-list">
                	<ul>
                    	<!-- open是展开的样式 -->
                    	<li class="">
                        	<!-- danger safe两种状态 -->
                        	<div class="safety-status danger">修改密码</div>
                            <div class="safety-describe">密码过于简单</div>
                            <a href="javascript:void(0)" class="setting">修改</a>
                            <div class="setting-form">
                                <form class="dataform trigger" onsubmit="return false;">
                                    <table>
                                        <tbody><tr>
                                            <td class="label">当前密码：</td>
                                            <td><input type="password" size="20" name="data[currentPassword]" datatype="*" ajaxurl="/ucenter/safety/verifyCurrentPassword" nullmsg="当前密码不能为空！"><span class="Validform_checktip"></span></td>
                                        </tr>
                                        <tr>
                                            <td class="label">新密码：</td>
                                            <td><input type="password" datatype="*6-18" plugin="passwordStrength" class="inputxt" name="data[password]" nullmsg="请输入新密码！" errormsg="密码至少6个字符,最多18个字符！"><span class="Validform_checktip"></span></td>
                                        </tr>
                                        <tr>
                                            <td class="label">密码强度：</td>
                                            <td>
                                            	<div class="passwordStrength">
                                                	<span class="ps1"></span><span class="ps2"></span><span class="ps3"></span>
                                               	</div>
                                         	</td>                      
                                        </tr>
                                        <tr>
                                            <td class="label">确认密码：</td>
                                            <td><input type="password" datatype="*6-18" recheck="data[password]" class="inputxt" name="data[repassword]" nullmsg="请输入确认密码！" errormsg="两次输入的密码不一致！"><span class="Validform_checktip"></span></td>
                                        </tr>
                                    </tbody></table>
                                    <button type="submit">确认</button>
                                </form>
                            </div>
                        </li>
                        <li>
                        	<div class="safety-status danger">安全邮箱</div>
                            <div class="safety-describe">未绑定邮箱</div>
                            <a href="javascript:void(0)" class="setting">设置</a>
                            <div class="setting-form">
                            	                            	<form class="dataform" onsubmit="return false;">
                                	<table>
                                    	<tbody><tr>
                                            <td class="label">安全邮箱：</td>
                                            <td>
                                            	<!--<input type="text" size="20">-->
                                                <div class="parentCls">
                                                    <input type="text" class="inputElem" size="20" name="data[email]" datatype="*" ajaxurl="/ucenter/safety/checkEmail" nullmsg="当前邮箱不能为空！"><span class="Validform_checktip"></span>
                                                </div>
                                                
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="label">验证码：</td>
                                            <td>
                                            	<input type="text" size="10" name="data[emailnum]" id="emailnum" placeholder="输入验证码" ignore="ignore" datatype="*" ajaxurl="/ucenter/safety/checkSmsNum" nullmsg="请输入验证码！">
                                                <input type="submit" class="get-code" value="获取验证码" onclick="setObj(this)">
                                                <em class="check-mail" style="display:none;">验证码已发至邮箱<a href="javascript:void(0)" target="_blank">去邮箱查看</a></em>
                                                <span class="Validform_checktip"></span>
                                           	</td>
                                        </tr>                                        
                                    </tbody></table>
                                    <button type="submit" data="verifyemail">确认</button>
                                </form>
                                                            </div>
                        </li>
                        <li>
                        	<div class="safety-status danger">绑定手机</div>
                            <div class="safety-describe">未绑定手机</div>
                            <a href="javascript:void(0)" class="setting">设置</a>
                            <div class="setting-form">
                            	                                <form class="dataform" onsubmit="return false;">
                                    <table>
                                        <tbody><tr>
                                            <td class="label">手机号码：</td>
                                            <td><input type="text" size="20" name="data[mobile]" datatype="*" ajaxurl="/ucenter/safety/checkPhone"><span class="Validform_checktip"></span></td>
                                        </tr>
                                        <tr>
                                            <td class="label">验证码：</td>
                                            <td>
                                                <input type="text" onsubmit="return false;" size="10" name="data[smsnum]" id="smsnum" placeholder="输入验证码" ignore="ignore" datatype="*" ajaxurl="/ucenter/safety/checkSmsNum" nullmsg="请输入验证码！">
                                                <input type="submit" class="get-code" value="获取验证码" onclick="setObj(this)">
                                                <em class="check-mail"><!--一天只能获取三次验证码--></em>
                                                <span class="Validform_checktip"></span>
                                            </td>
                                        </tr>                                        
                                    </tbody></table>
                                    <button type="submit" data="verifyphone">确认</button>
                                </form>
                                                            </div>
                        </li>
                        <li>
                        	<div class="safety-status danger">防沉迷</div>
                            <div class="safety-describe">未设置</div>
                            <a href="javascript:void(0)" class="setting">设置</a>
                            <div class="setting-form">
                            	                            	<form class="dataform" onsubmit="return false;">
                                	<table>
                                        <tbody><tr>
                                            <td class="label">真实姓名：</td>
                                            <td><input type="text" size="15" name="data[realname]" datatype="*" ajaxurl="/ucenter/safety/checkRealname" nullmsg="请输入真实姓名！"><span class="Validform_checktip"></span><em class="input-tips">例如：张三</em></td>
                                        </tr>
                                        <tr>
                                            <td class="label">身份证：</td>
                                            <td><input type="text" size="30" name="data[identity]" datatype="*" ajaxurl="/ucenter/safety/checkIdentity" nullmsg="请输入身份证！"><span class="Validform_checktip"></span><em class="input-tips">例如：420106198205192017</em></td>
                                        </tr>                                        
                                    </tbody></table>
                                    <button type="submit">保存</button>
                                </form>
                                                            </div>
                        </li>
                    </ul>
                </div>
           	</div>
</template>
