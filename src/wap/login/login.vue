<template>
    <div class="wap_login_bg">
        <div class="logo"><img src="~assets/images/wap/logo.png" alt="logo"></div>
         <Form class="custom-form" :model="form" ref="form" :rules="form.rule">
            <FormItem prop="phone">
                <Input v-model.trim="form.phone" placeholder="手机号"></Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model.trim="form.password" placeholder="密码"></Input>
            </FormItem>
        </Form>
        <Button class="button-custom-red" :loading="form.loading" @click.prevent="handleLogin('form')">登录</Button>
        <div class="other_login">
            <span>手机动态登录</span>
        </div>
    </div>
</template>

<script>
    import { ajaxLogin } from 'src/apis/wap'

    export default {
        name: 'wap-login',
        data () {
            return {
                form: {
                    loading: false,
                    phone: '',
                    password: '',
                    rule: {
                        phone: [
                            { required: true, message: '请填写手机号', trigger: 'blur' },
                            { pattern: /^((1[3-8][0-9])+\d{8})$/, message: '请填写正确的手机号码' }
                        ],
                        password: [
                            { required: true, message: '请输入密码', trigger: 'blur' }
                        ]
                    }
                }
            }
        },
        methods: {
            handleLogin(name){
                const self = this;
                
                this.$refs[name].validate((valid) => {
                    if(valid) {
                        this.form.loading = true;
                        let data = {
                            username: self.form.phone,
                            password: self.form.password
                        }
                        ajaxLogin(data).then(res => {
                            if(res.status === 'success'){
                                self.$Message.success(res.message)
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
