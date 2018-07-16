<template>
    <div>
        <div v-if="isShow" class="popup_login">
            <a @click="close" class="lay_colse">关闭</a>

                <div class="title title_join">注册789W通行证</div>
                <Form class="popup_form" ref="formInline" :model="formInline" :rules="ruleformInline">
                    <FormItem prop="username">
                        <Input type="text" v-model="formInline.username" placeholder="请输入您的用户名"></Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="密码"></Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.cpassword" placeholder="确认密码"></Input>
                    </FormItem>
                    <!-- <FormItem prop="code">
                        <Input type="text" v-model="formInline.code" placeholder="密码"></Input>
                        <img :src="codePic" alt="验证码">
                    </FormItem> -->
                    <FormItem>
                        <Button class="submitButton" type="primary" :loading="formInline.loading" @click.prevent="handleSubmit('formInline')">注册</Button>
                    </FormItem>
                </Form>
        </div>
        <div v-if="isShow" class="login_mask"></div>
    </div>
    
</template>

<script>
    import { mapActions } from 'vuex'
    import { AjaxLoginPanel, AjaxgetCaptcha } from 'src/apis/user'

    export default {
        name: 'gameindex',
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            ruleformInline: {
                username: [
                    { required: true,  message: "请填写您的用户名", trigger: 'blur' },
                ],
                password: [
                    { required: true, message: "请填写密码", trigger: 'blur' }
                ]
            },
        },
        data() {
            return {
                formInline: {
                    username: '',
                    password: '',
                    cpassword: '',
                    loading: false,
                    code: ''
                },
                codePic: ''
            }
        },
        methods: {
            ...mapActions([
                'recordUserInfo'
            ]),
            close(){
                this.$emit("close");
            },
            GetQueryString(name) { 
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i"); 
                var r = window.location.search.substr(1).match(reg); 
                if (r!=null) return (r[2]); return null; 
            },
            handleSubmit(name){
                const self = this;
                this.$refs[name].validate((valid) => {
                    if(valid) {
                        self.formInline.loading = true;
                        let params = {
                            "username": self.formInline.username,
                            "password": self.formInline.password                            
                        }

                        let GID = self.GetQueryString('gid')
                        if(GID){
                            params = Object.assign(params, { 'gid': GID})
                        }
                        let SID = self.GetQueryString('sid')
                        if(SID){
                            params = Object.assign(params, { 'serverId': SID})
                        }
                        let CID = self.GetQueryString('cid')
                        if(CID){
                            params = Object.assign(params, { 'cid': CID})
                        }
                        let TG = self.GetQueryString('tg')
                        if(TG){
                            params = Object.assign(params, { 'tgId': TG})
                        }

                        AjaxLoginPanel(params).then(res => {
                            if(res.status === 'success'){
                                // localStorage.setItem('userToken', res.data);
                                let data = {
                                    token: res.data,
                                    data: {
                                        username: self.formInline.username // TODO，登录成功后后台应该回显用户基本信息
                                    }
                                }
                                self.recordUserInfo(data)
                                let redirect = self.$route.path ? self.$route.path : decodeURIComponent(self.$route.query.redirect || '/ucenter');
                                self.$router.push({
                                    path: redirect
                                })
                                self.close();
                            }else{
                                self.$Message.error(res.message)
                            }
                        })
                        self.formInline.loading = false;
                    }
                })
            },
            getCode(){
                const self = this;
                // AjaxgetCaptcha().then(res => {                  
                //     self.codePic = res
                // })
            }
        },
        created(){
            // this.getCode()
        }
    }
</script>

<style lang="less">
  @import "~assets/styles/popupLogin.less";
</style>


