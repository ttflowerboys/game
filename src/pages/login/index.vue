<template>
    <div class="loginLayer">
        <login-header currentTitle="用户登录"/>
        <div class="content">
            <div class="loginbox">
                <input v-model="form.username" type="text" placeholder="账号" class="username">
                <input v-model="form.password" type="password" placeholder="密码" class="pwd">
                <button action="login" class="btn-login" @click="login">登录</button>
                <div class="links">
                    <div class="links-l"><a href="/forget">忘记密码？</a></div>
                    <div class="links-r">没有WAN账号？<a href="/join">免费注册</a></div>
                </div>
            </div>        
        </div>
        <app-footer/>
    </div>
</template>

<script>
    import { AjaxLogin } from 'src/apis/user'
    import { mapActions } from 'vuex'

    import LoginHeader from "@/components/login/header.vue";
    import AppFooter from "@/components/footer";

    export default {
        name: 'login',
        components: {
            LoginHeader,
            AppFooter
        },
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                }
            }
        },
        methods:{
            ...mapActions([
                'recordUserInfo'
            ]),
            login(){
                if(this.form.username === ''){
                    this.$Message.error('请填写帐号')
                    return false;
                }
                if(this.form.password === ''){
                    this.$$Message.error('请填写密码');
                    return false;
                }
                let data = {
                    'username': this.form.username,
                    'password': this.form.password
                }
                const self = this;
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
        }
    }
</script>

<style lang="less">
@import "~assets/styles/login.less";
</style>
