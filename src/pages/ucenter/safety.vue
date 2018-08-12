<template>
    <div class="center-grid">
    	<h4 style="height: 68px;font-weight: bold;">账号安全</h4>
        <!-- <div class="safety-top">
            <div class="security-index">
            	<span class="red"></span><span></span><span></span>安全指数：<strong class="low">低</strong>
                <p class="last-login">上次登录时间：2018-07-08 11:45:52</p>
            </div>
            <div class="safety-tips low">您的账号未设置任何安全措施，请您进行“<strong>密保邮箱</strong>”、“<strong>密保手机</strong>”安全设置，完成账号安全认证！</div>
        </div> -->
        <div class="safety-list">
        	<ul>
            	<!-- <li class="">
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
                                        <em class="check-mail"></em>
                                        <span class="Validform_checktip"></span>
                                    </td>
                                </tr>                                        
                            </tbody></table>
                            <button type="submit" data="verifyphone">确认</button>
                        </form>
                    </div>
                </li> -->
                <li>
                    <div v-if="userData.idcard && userData.real_name">
                        <div class="safety-status safe">防沉迷</div>
                        <div class="safety-describe">已设置</div>
                        <a href="javascript:;" class="setting" @click="fcm.show = !fcm.show">展示</a>
                    </div>
                    <div v-else>
                        <div class="safety-status danger">防沉迷</div>
                        <div class="safety-describe">未设置</div>
                        <a href="javascript:;" class="setting" @click="fcm.state = !fcm.state">设置</a>
                    </div>

                    <div v-if="fcm.show">
                        <div class="setted ucenter_setting">
                            <p style="line-height: 24px;">已设置防沉迷<br>真实姓名：{{userData.real_name}}<br>身份证：{{userData.idcard}}</p>
                        </div>
                    </div>
                    
                    <div v-if="fcm.state">
                        <Form :model="fcm" ref="fcm" :rules="fcm.rules" class="custom-user-form"  :label-width="100">
                            <FormItem prop="realname" label="真实姓名">
                                <Row>
                                    <Col span="3">
                                        <Input v-model="fcm.realname" class="input-text" placeholder="真实姓名"></Input>
                                    </Col>
                                    <Col class="tips" span="6">例如：张三</Col>
                                </Row>
                            </FormItem>
                            <FormItem prop="identity" label="身份证">
                                <Row>
                                    <Col span="8">
                                        <Input v-model="fcm.identity" class="input-text" placeholder="请输入身份证"></Input>
                                    </Col>
                                    <Col class="tips" span="6">例如：420106198205192017</Col>
                                </Row>
                            </FormItem>

                            <FormItem>
                                <Button type="primary" class="btn-login" :loading="fcm.loading" @click.prevent="handleFcm('fcm')">保存</Button>
                            </FormItem>
                        </Form>
                    </div>
                </li>
            </ul>
        </div>
   	</div>
</template>

<script>
    import { AjaxUserFcm } from 'src/apis/user'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data () {
            return {
                fcm: {
                    state: false,
                    show: false,
                    loading: false,
                    realname: '',
                    identity: '',
                    rules: {
                        realname: [
                            { required: true, message: '请输入真实姓名', trigger: 'blur' },
                            { pattern: /.*[\u4e00-\u9fa5]+.*$/, message: '姓名还是填中文的吧！' },
                        ],
                        identity: [
                            { required: true, message: '请输入身份证', trigger: 'blur' },
                            { pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入正确的身份证号' },
                        ]
                    }
                }
            }
        },
        methods: {
            handleFcm(name){
                const self = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let data = {
                            uid: self.userData.id,
                            username: self.fcm.realname,
                            idcard: self.fcm.identity
                        }
                        self.fcm.loading = true;
                        AjaxUserFcm(data).then(res => {
                            if(res.status === '10000'){

                            }else{
                                self.$Message.error(res.message)
                            }
                            self.fcm.loading = false;
                        })
                    }
                })
            }
        },
        computed: {
            ...mapGetters([ 'userData' ])
        }
    }
</script>

<style lang="less">
.custom-user-form{
    .tips{
        font-size: 14px;
        padding-left: 6px;
        color: #999;
    }
}
.ucenter_setting{
    padding: 20px;background: #fff;border-top: 1px solid #e5e5e5;
}
</style>