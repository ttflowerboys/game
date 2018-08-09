<template>
    <div class="wap_login_bg">
        <div class="jump"><router-link to="/h5/join">注册</router-link></div>
        <div class="logo"><img src="~assets/images/wap/logo.png" alt="logo"></div>
         <Form class="wap-custom-form" :model="form" ref="form" :rules="form.rule">
            <FormItem prop="phone">
                <Input v-model.trim="form.phone" placeholder="用户名"></Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model.trim="form.password" placeholder="密码"></Input>
            </FormItem>
        </Form>
        <Button class="wap-button-custom-red" :loading="form.loading" @click.prevent="handleLogin('form')">登录</Button>
        <!-- <div class="other_login">
            <span>手机动态登录</span>
        </div> -->
    </div>
</template>

<script>
    import { ajaxLogin } from 'src/apis/wap'

    export default {
        name: 'wap-login',
        data () {
            return {
                toast: {
                    isShowMask: true,
                    show: true,
                    text: '登录成功',
                },
                form: {
                    loading: false,
                    phone: '',
                    password: '',
                    rule: {
                        phone: [
                            { required: true, message: '请填写用户名', trigger: 'blur' },
                            // { pattern: /^((1[3-8][0-9])+\d{8})$/, message: '请填写正确的手机号码' }
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
                            password: self.form.password,
                            mid: 5001
                        }
                        ajaxLogin(data).then(res => {
                            if(res.status === '10000'){
                                self.$vux.toast.show({
                                     text: '登录成功',
                                     time: 1000,
                                     onHide () {
                                        window.location = res.data
                                     }
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

.vux-loading .weui-toast {
    z-index: 5001
}

.weui-icon_toast.weui-loading {
    display: inline-block
}
.vux-loading-no-text .weui-toast {
    min-height: 98px
}
.weui-toast {
    position: fixed;
    z-index: 5001;
    width: 7.6em;
    min-height: 7.6em;
    top: 180px;
    left: 50%;
    margin-left: -3.8em;
    background: hsla(0,0%,7%,.7);
    text-align: center;
    border-radius: 5px;
    color: #fff
}

.weui-icon_toast {
    margin: 22px 0 0;
    display: block
}

.weui-icon_toast.weui-icon-success-no-circle:before {
    color: #fff;
    font-size: 55px
}

.weui-icon_toast.weui-loading {
    margin: 30px 0 0;
    width: 38px;
    height: 38px;
    vertical-align: baseline
}

.weui-toast__content {
    margin: 0 0 15px
}

.weui-toast.vux-toast-top {
    top: 56px
}

.weui-toast.vux-toast-bottom {
    top: auto;
    bottom: 60px;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%)
}

.weui-toast.vux-toast-middle {
    top: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%)
}

</style>
