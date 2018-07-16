<template>
    <div>
        <div v-if="isShow" class="popup_login">
            <a @click="close('formInline')" class="lay_colse">关闭</a>

                <div class="title title_join">登录789W通行证</div>
                <Form class="popup_form" ref="formInline" :model="formInline" :rules="ruleformInline">
                    <FormItem prop="username">
                        <Input type="text" v-model="formInline.username" placeholder="请输入您的用户名"></Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="密码"></Input>
                    </FormItem>
                    <FormItem>
                        <Button class="submitButton" type="primary" :loading="LoginLoading" @click.prevent="handleSubmit('formInline')">登录</Button>
                    </FormItem>
                </Form>
        </div>
        <div v-if="isShow" class="login_mask"></div>
    </div>
    
</template>

<script>

    export default {
        name: 'gameindex',
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            LoginLoading: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                formInline: {
                    username: '',
                    password: '',
                    loading: false
                },
                ruleformInline: {
                    username: [
                        { required: true,  message: "请填写您的用户名", trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: "请填写密码", trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            close(name){
                this.$refs[name].resetFields();
                this.$emit("close");
            },
            handleSubmit(name){
                const self = this;
                this.$refs[name].validate((valid) => {
                    if(valid) {
                        let params = {
                            "username": self.formInline.username,
                            "password": self.formInline.password
                        }
                        self.$emit("login", params)
                    }
                })
            }
        }
    }
</script>

<style lang="less">
  @import "~assets/styles/popupLogin.less";
</style>
