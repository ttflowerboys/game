<template>
    <div class="wap_login_page" :style="bg.game ? 'background-image: url(' + bg.game +')' : ''">
        <div class="login_box" v-show="!pop.state">
            <div class="login_header clearfix"> 
                <img class="loginIndex_logo" src="~assets/images/wap/login_title.png" alt="精彩即将显示"> 
            </div>
            <div class="login_box_main"> 
                <h3 class="loginIndex_text">请选择登录方式</h3> 
                <div class="loginIndex_way"> 
                    <div class="items">
                        <i class="qq"></i>
                        <span class="text">QQ登录</span> 
                    </div> 
                    <div class="items" @click="pop.state = !pop.state"> 
                        <i class="count"></i>
                        <span class="text">账号登录</span> 
                    </div>
                </div> 
            </div>
            <div class="login_way">
                <router-link class="login_way_others" to="/h5/join">注册平台账号</router-link>
             </div>
        </div>

        <div class="login_box" v-show="pop.state">
            <div class="login_header clearfix"> 
                <h3>账号登陆</h3> 
            </div>
            <div class="login_box_main"> 
                <div class="loginForm"> 
                    <div class="items">
                        <Icon type="ios-person" />
                        <input v-model.trim="form.phone" type="text" class="ipt_text" placeholder="平台帐号"> 
                    </div> 
                    <div class="items"> 
                        <Icon type="ios-unlocked" />
                        <input v-model.trim="form.password" type="password" class="ipt_text" placeholder="密码">
                    </div>
                    
                    <Button class="wap-button-custom-join" :loading="form.loading" @click.prevent="handleLogin('form')">进入游戏</Button>
                    <router-link class="wap-button-custom-login" to="/h5/join">注册新账号</router-link>
                </div> 
            </div>
            <div class="login_way">
                <span class="login_way_others" @click="pop.state = !pop.state">其他方式登陆</span>
             </div>
        </div>

        <!-- <div class="jump"><router-link to="/h5/join">注册</router-link></div>
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
     -->
     </div>
</template>

<script>
    import { ajaxLogin, ajaxGameImage } from 'src/apis/wap'

    export default {
        name: 'wap-login',
        data () {
            return {
                toast: {
                    isShowMask: true,
                    show: true,
                    text: '登录成功',
                },
                pop: {
                    state: false
                },
                bg: {
                    game: '',
                    web: ''
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
            checkField(){
                if(!this.form.phone){
                    this.$vux.toast.show({
                        text: '请填写平台帐号',
                        type: 'text',
                        width: '220px'
                    })
                    return false;
                }
                if(!this.form.password){
                    this.$vux.toast.show({
                        text: '请填写密码',
                        type: 'text',
                        width: '200px'
                    })
                    return false;
                }
                return true;
            },
            handleLogin(name){
                const self = this;
                let valid = this.checkField();
                // this.$refs[name].validate((valid) => {
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
                // })
            },
            getBackground(){
                const self = this;
                let data = {
                    gid: '',
                    mid: ''
                }
                ajaxGameImage(data).then(res => {
                    if(res.status === '10000'){
                        let resource = res.data;
                        self.bg.game = resource.gameImage;
                        self.bg.web = resource.backImage;
                    }
                })
            }
        },
        created(){
            this.getBackground()
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
