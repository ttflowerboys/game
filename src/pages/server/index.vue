<template>
<div class="s_body" :style="'background-image:url('+ bgImage +')'">
    <a class="logo" href="/" target="_blank">封神霸业</a>
    <div class="s_wrap">
        <div class="head_nav clearfix">
            <a href="/"><span class="head_nav01">进入官网</span></a>
            <a href=""><span class="head_nav02">领取礼包</span></a>
            <a href="/pay"><span class="head_nav03">用户充值</span></a>
            <a href="/help" style="border-right:none;"><span class="head_nav04">游戏客服</span></a>
        </div>
        <div class="logn_head">用户登录</div>
        <div class="logn_state">
            <a v-if="!userData.username" @click="show_login" class="start_btn"></a>
            <div class="logn_info" v-if="userData.username" style="padding-top: 64px;">
                <h3>您好<i>，</i><span>{{userData.username}}</span><i>，</i><a target="_blank" href="/ucenter/">完善资料</a><i>，</i><a @click="logout">注销</a></h3>
                <p></p>
            </div>
        </div>
        <div class="list_head">服务器列表</div>
        <div class="server_title clearfix"><span>最新区服推荐</span><a @click="jump(gameId)">{{docList && docList[0] ? docList[0].area_server_name:''}}服&nbsp;&nbsp;&nbsp;&nbsp;火爆开启</a></div>
        <!-- 区服推荐列表 -->
        <div class="server_box" id="scroll">
            <ul class="server_list">
                <li v-for="items in docList"><a @click="jump(items.gid,items.area_server_code)">{{items.area_server_name}}服<span>已开启</span></a></li>
            </ul>
        </div>
    </div>
    <login-popup :is-show="showLogin" :LoginLoading="LoginLoading" @close="closeLogin" @login="login">
        <div slot="footer">
            <a href="/forget" style="float: right;">找回密码</a>
        </div>
    </login-popup>
</div>
</template>




<script>
    import { AjaxGameDetail, AjaxGameLogin } from 'src/apis/game'
    import { AjaxJoin, AjaxLogin } from 'src/apis/user'

    import * as basicConfig from 'src/config/basicConfig'

    import JoinPopup from "@/components/popup/join";
    import LoginPopup from "@/components/popup/login";
    import { mapGetters, mapActions } from 'vuex'
        
    export default {
        name: 'gameindex',
        components: {
            JoinPopup,
            LoginPopup
        },
        data() {
            return {
                gameCode: this.$route.params.code,
                docList: [],
                showLogin: false,
                LoginLoading: false,
                showJoin: false,
                JoinLoading: false,
                gameId: '',
                bgImage: ''
            }
        },
        methods: {
            ...mapActions([ 'userLogout', 'recordUserInfo' ]),
            show_login(){
                this.showLogin = true;
            },
            closeJoin(){
                this.showJoin = false;
            },
            closeLogin(){
                this.showLogin = false;
            },
            show_join(){
                this.showJoin = true;
            },
            getDoc(){
                const self = this;
                let data = {
                    game_show_code: this.gameCode // TODO
                }
                AjaxGameDetail(data).then(res => {
                    if(res.status === 'success'){
                        self.docList = res.data.servers;
                        self.gameId = res.data.gid;
                        self.bgImage = res.data.login_img;
                        document.title = (res.data.servers && res.data.servers[0] ? res.data.servers[0].game_name : '') + basicConfig.title
                    }else{
                        self.$Message.error(res.message)
                    }
                })
            },
            jump(gid,sid){
                let token = localStorage.getItem('userToken');
                if(!token){
                    // window.open('/login')
                    this.showLogin = true;
                }else{
                    const self = this;
                    let data = {
                        gid: gid,
                    }
                    if(sid){
                        data = Object.assign(data, { sid: sid })
                    }
                    AjaxGameLogin(data).then(res => {
                        if(res.status === 'success'){
                            window.location = res.data;
                        }else{
                            self.$Message.error(res.message)
                        }
                    })
                }
            },
            logout(){
                this.userLogout()
                // window.location = '/'
            },
            login(params){
                const self = this;
                self.LoginLoading = true;
                let GID = this.GetQueryString('gid')
                if(GID){
                    params = Object.assign(params, { 'gid': GID})
                }
                let SID = this.GetQueryString('sid')
                if(SID){
                    params = Object.assign(params, { 'serverId': SID})
                }
                let CID = this.GetQueryString('cid')
                if(CID){
                    params = Object.assign(params, { 'cid': CID})
                }
                let TG = this.GetQueryString('tg')
                if(TG){
                    params = Object.assign(params, { 'tgId': TG})
                }
                AjaxLogin(params).then(res => {
                    if(res.status === 'success'){
                        let data = {
                            token: res.data,   // 因为只有token
                            data: {
                                username: params.username // TODO，登录成功后后台应该回显用户基本信息
                            }
                        }
                        self.recordUserInfo(data)
                        self.closeLogin();
                    }else{
                        self.$Message.error(res.message)
                    }
                    self.LoginLoading = false;
                })
            },
            GetQueryString(name) {  // TODO，提取成公共函数
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i"); 
                var r = window.location.search.substr(1).match(reg); 
                if (r!=null) return (r[2]); return null; 
            },
            init(){
                this.getDoc() 
            }
        },
        computed: {
            ...mapGetters([ 'userToken', 'userData' ])
        },
        created(){
            this.init()
        }
    }
</script>


<style lang="less">
    @import "~assets/styles/server.less";
</style>