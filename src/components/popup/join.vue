<template>
    <div>
        <div v-if="isShow" class="popup_login">
            <a @click="close('formInline')" class="lay_colse">关闭</a>

                <div class="title title_join">注册789W通行证</div>
                <Form class="popup_form" ref="formInline" :model="formInline" :rules="ruleformInline">
                    <FormItem prop="username">
                        <Input type="text" v-model="formInline.username" placeholder="请输入您的用户名"></Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="密码"></Input>
                    </FormItem>
                    <FormItem prop="cpassword">
                        <Input type="password" v-model="formInline.cpassword" placeholder="确认密码"></Input>
                    </FormItem>
                    <!-- <FormItem prop="code">
                        <Input type="text" v-model="formInline.code" placeholder="密码"></Input>
                        <img :src="codePic" alt="验证码">
                    </FormItem> -->
                    <FormItem>
                        <Button class="submitButton" type="primary" :loading="JoinLoading" @click.prevent="handleSubmit('formInline')">注册</Button>
                    </FormItem>
                </Form>
                 <div class="clearfix">
                    <a href="/login" style="float: left;">立即登录</a>
                    <a href="/forget" style="float: right;">找回密码</a>
                </div>
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
            JoinLoading: {
                type: Boolean,
                default: false
            }
        },
        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formInline.cpassword !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formInline.validateField('cpassword');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else if (value !== this.formInline.password) {
                    callback(new Error('密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                formInline: {
                    username: '',
                    password: '',
                    cpassword: '',
                    loading: false,
                    code: ''
                },
                codePic: '',
                ruleformInline: {
                    username: [
                        { required: true,  message: "请填写您的用户名", trigger: 'blur' },
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    cpassword: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
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

                        self.$emit("join", params)
                        
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


