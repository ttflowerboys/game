<template>
<div class="loginLayer">
    <login-header currentTitle="用户注册"/>
    <div class="content">
        <Form :model="form" ref="LoginForm" :rules="form.rules" class="loginbox custom-form ">
            <FormItem prop="username">
                <Input v-model="form.username" class="input-text" placeholder="账号">
                    <Icon slot="prepend" type="person"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="phone">
                <Input v-model="form.phone" class="input-text" placeholder="手机号">
                    <Icon slot="prepend" type="android-phone-portrait"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="picCode" class="sendCodeItem">
                <Input v-model.trim="form.picCode" class="input-text" placeholder="请输入图形验证码" style="width: 220px;">
                    <Icon slot="prepend" type="images"></Icon>
                </Input>
                <div class="picCode" title="看不清？点我刷新">
                    <img :src="picCode" alt="图形验证码" width="130" height="50" @click="refresh">
                </div>
            </FormItem>
            <FormItem prop="code" class="sendCodeItem">
                <Input v-model.trim="form.code" class="input-text" placeholder="请输入短信验证码" style="width: 220px;">
                    <Icon slot="prepend" type="ios-keypad"></Icon>
                </Input>
                <Button type="primary" size="large" @click.prevent="SendSMSCode('LoginForm')" v-show="!form.computedTime">发送验证码</Button>
                <Button size="large" disabled v-show="form.computedTime">{{form.computedTime}}s后再次发送</Button>
            </FormItem>
            <FormItem prop="password">
                <Input v-model="form.password" class="input-text" placeholder="密码">
                    <Icon slot="prepend" type="ios-locked"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" class="btn-login" @click.prevent="handleLogin('LoginForm')">注册</Button>
            </FormItem>
            <div class="links" style="padding-top: 0;">
                <div class="links-l"><a target="_blank" href="/forget">忘记密码？</a></div>
                <div class="links-r">没有WAN账号？<a href="/login">立即登录</a></div>
            </div>
        </Form>        
    </div>
    <app-footer/>
</div>
</template>

<script>
    import { AjaxLogin, AjaxSendSMS, AjaxgetCaptcha } from 'src/apis/user'
    import { mapActions } from 'vuex'

    import LoginHeader from "@/components/login/header.vue";
    import AppFooter from "@/components/footer";

    import * as basicConfig from 'src/config/basicConfig'

    const customValidatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入新密码'));
        } else {
            if (this.LoginForm.cpassword !== '') {
                // 对第二个密码框单独验证
                this.$refs.LoginForm.validateField('cpassword');
            }
            callback();
        }
    };
    const customValidatePassCheck = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码'));
        } else if (value !== this.LoginForm.password) {
            callback(new Error('两次密码不一致'));
        } else {
            callback();
        }
    };
    const picUrl = basicConfig.APIUrl + '/auth/getCaptcha';

    export default {
        name: 'login',
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                    code: '',
                    picCode: '',
                    computedTime: 0,
                    timer: null,
                    rules: {
                        username: [
                            { required: true, message: '必填', trigger: 'blur' }
                        ],
                        phone: [
                            { required: true, message: '请输入手机号', trigger: 'blur' },
                            { pattern: /^((1[3-8][0-9])+\d{8})$/, message: '请填写正确的手机号码' }
                        ],
                        picCode: [
                            { required: true, message: '必填', trigger: 'blur' }
                        ],
                        code: [
                            { required: true, message: '必填', trigger: 'blur' }
                        ],
                        password: [
                            { required: true, message: '必填', trigger: 'blur' }
                        ]
                    }
                },
                picCode: picUrl + '?time=' + (new Date()).valueOf()
            }
        },
        components: {
            LoginHeader,
            AppFooter
        },
        methods:{
            ...mapActions([
                'recordUserInfo'
            ]),
            refresh(){
                this.picCode = picUrl + '?time=' + (new Date()).valueOf()
            },
            SendSMSCode(name){
                let self = this;
                this.$refs[name].validateField('phone', (valid) => {
                    if(!valid) {
                        self.$refs[name].validateField('picCode', (error) => {
                            if(!error){
                                self.form.computedTime = 60;
                                self.form.timer = setInterval(() => {
                                    self.form.computedTime--;
                                    if (self.form.computedTime == 0) {
                                        clearInterval(self.form.timer);
                                    }
                                }, 1000);

                                // TODO，发送手机验证码
                                let data = {
                                    phone: self.form.phone,
                                    code: self.form.picCode
                                }
                                AjaxSendSMS(data).then(res => {
                                    if(res.state === 0){
                                        self.$Message.success(res.message)
                                    }else{
                                        self.$Message.error(res.message)
                                    }
                                })
                            }
                        })
                    }
                })
            },
            handleLogin(name){
                let self = this;
                this.$refs[name].validate((valid) => {
                    if(valid) {
                        
                        AjaxLogin(data).then(res => {
                            if(res.status === 'success'){
                                let data = {
                                    token: res.data,   // 因为只有token
                                    data: {
                                        username: self.form.username // TODO，登录成功后后台应该回显用户基本信息
                                    }
                                }
                                self.recordUserInfo(data)
                                let redirect = decodeURIComponent(self.$route.query.redirect || '/ucenter');
                                self.$router.push({
                                    path: redirect
                                })
                            }else{
                                self.$Message.error(res.message)
                            }
                        })
                        
                    }
                })
            }
        },
        created(){
            // AjaxgetCaptcha()
        }
    }
</script>

<style lang="less">
@import "~assets/styles/login.less";
</style>
