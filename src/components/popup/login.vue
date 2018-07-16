<template>
    <div>
        <div v-if="isShow" class="popup_login">
            <a @click="close" class="lay_colse">关闭</a>

                <div class="title title_join">登录789W通行证</div>
                <Form class="popup_form" ref="formInline" :model="formInline" :rules="ruleformInline">
                    <FormItem prop="username">
                        <Input type="text" v-model="formInline.username" placeholder="请输入您的用户名"></Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="密码"></Input>
                    </FormItem>
                    <FormItem>
                        <Button class="submitButton" type="primary"  :loading="formInline.loading" @click.prevent="handleSubmit('formInline')">登录</Button>
                    </FormItem>
                </Form>
        </div>
        <div v-if="isShow" class="login_mask"></div>
    </div>
    
</template>

<script>
    import { mapActions } from 'vuex'
    import { AjaxLogin } from 'src/apis/user'

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
                    loading: false
                }
            }
        },
        methods: {
            ...mapActions([
                'recordUserInfo'
            ]),
            close(){
                this.$emit("close");
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
                        AjaxLogin(params).then(res => {
                            if(res.status === 'success'){
                                let data = {
                                    token: res.data,   // 因为只有token
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
        }
    }
</script>

<style lang="less">
  @import "~assets/styles/popupLogin.less";
</style>
