<template>
    <div class="wap_login_bg">
        <div class="logo"><img src="~assets/images/wap/logo.png" alt="logo"></div>
         <Form class="custom-form" :model="form" ref="form" :rules="form.rule">
            <FormItem prop="username">
                <Input v-model.trim="form.username" placeholder="帐号"></Input>
            </FormItem>
            <!-- <FormItem prop="phone">
                <Input v-model.trim="form.phone" placeholder="手机号"></Input>
            </FormItem> -->
            <!-- <FormItem class="sendCodeItem" prop="code">
                <Input v-model.trim="form.code" placeholder="请输入短信验证码"></Input>
                <Button type="primary" size="large" @click.prevent="handleSendSMS" v-show="!form.computedTime">发送验证码</Button>
                <Button size="large" disabled v-show="form.computedTime">{{form.computedTime}}s后再次发送</Button>
            </FormItem> -->
            <FormItem prop="password">
                <Input type="password" v-model.trim="form.password" placeholder="密码"></Input>
            </FormItem>
            <FormItem prop="cpassword">
                <Input type="password" v-model.trim="form.cpassword" placeholder="确认密码"></Input>
            </FormItem>
        </Form>
        <Button class="button-custom-red" :loading="form.loading" @click.prevent="handleJoin('form')">注册</Button>
        <div class="other_login">
            <span>手机动态登录</span>
        </div>
    </div>
</template>

<script>
    import { ajaxJoin } from 'src/apis/wap'

    import { mapActions } from 'vuex'

    export default {
        name: 'wap-login',
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.cpassword !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.form.validateField('cpassword');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    loading: false,
                    phone: '',
                    password: '',
                    code: '',
                    computedTime: 0,
                    rule: {
                        // phone: [
                        //     { required: true, message: '请填写手机号', trigger: 'blur' },
                        //     { pattern: /^((1[3-8][0-9])+\d{8})$/, message: '请填写正确的手机号码' }
                        // ],
                        username: [
                            { required: true, message: '请填写账号', trigger: 'blur' }
                        ],
                        password: [
                            { validator: validatePass, trigger: 'blur' }
                        ],
                        cpassword: [
                            { validator: validatePassCheck, trigger: 'blur' }
                        ]
                    }
                }
            }
        },
        methods: {
            ...mapActions([
                'recordUserInfo'
            ]),
            handleSendSMS(name){
                let self = this;
                this.$refs[name].validateField('phone', (valid) => {
                    if(!valid) {
                        self.form.computedTime = 120;
                        self.form.timer = setInterval(() => {
                            self.form.computedTime--;
                            if (self.form.computedTime == 0) {
                                clearInterval(self.form.timer);
                            }
                        }, 1000);

                        // TODO，发送手机验证码
                        let data = {
                            phoneNum: self.form.phone
                        }
                        ajaxPhoneSendSMSCode(data).then(res => {
                            if(res.state === 0){
                                self.$Message.success(res.message)
                            }else{
                                self.$Message.error(res.message)
                            }
                        })
                        
                    }
                })
            },
            handleJoin(name){
                const self = this;
                
                this.$refs[name].validate((valid) => {
                    if(valid) {
                        this.form.loading = true;
                        let data = {
                            username: self.form.username,
                            password: self.form.password
                        }
                        ajaxJoin(data).then(res => {
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
                            this.form.loading = false;
                        })
                    }
                })
            }
        }
    }
</script>
<style lang="less">
@import "~assets/styles/wap/login.less";
</style>
