<template>
<div class="s_body">
    <a class="logo" href="/" target="_blank">封神霸业</a>
    <div class="s_wrap">
        <div class="head_nav clear">
            <a href="/"><span class="head_nav01">进入官网</span></a>
            <a href=""><span class="head_nav02">领取礼包</span></a>
            <a href=""><span class="head_nav03">用户充值</span></a>
            <a href="" style="border-right:none;"><span class="head_nav04">游戏论坛</span></a>
        </div>
        <div class="logn_head">用户登录</div>
        <div class="logn_state">
            <a v-if="!username" @click="show_login" class="start_btn"></a>
            <div class="logn_info" v-if="username" style="padding-top: 64px;">
                <h3>您好<i>，</i><span>{{username}}</span><i>，</i><a target="_blank" href="/ucenter/">完善资料</a><i>，</i><a @click="logout">注销</a></h3>
                <p></p>
            </div>
        </div>
        <div class="list_head">服务器列表</div>
        <div class="server_title clear"><span>最新区服推荐</span><a @click="jump(gameId)">双线1服&nbsp;&nbsp;&nbsp;&nbsp;火爆开启</a></div>
        <!-- 区服推荐列表 -->
        <div class="server_box" id="scroll">
            <ul class="server_list">
                <li v-for="items in docList"><a @click="jump(items.gid,items.area_server_code)">{{items.game_name}}<span>已开启</span></a></li>
            </ul>
        </div>
    </div>
    <join-popup :is-show="showJoin" @close="closeJoin"></join-popup>
    <login-popup :is-show="showLogin" @close="closeLogin"></login-popup>
</div>
</template>




<script>
    import { AjaxGameDetail, AjaxGameLogin } from 'src/apis/game'
    import JoinPopup from "@/components/popup/join";
    import LoginPopup from "@/components/popup/login";
        
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
                showJoin: false,
                username: '',
                gameId: ''
            }
        },
        methods: {
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
                    }else{
                        self.$Message.error(res.message)
                    }
                })
            },
            jump(gid,sid){
                let token = localStorage.getItem('token');
                if(!token){
                    window.location = '/login'
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
                            window.location = res.data
                        }else{
                            self.$Message.error(res.message)
                        }
                    })
                }
            },
            logout(){
                localStorage.clear('username')
                localStorage.clear('token')
                window.location = '/'
            },
            init(){
                this.getDoc()
            }
        },
        created(){
            this.init()
            this.username = localStorage.getItem('username') ? localStorage.getItem('username') : '';
        }
    }
</script>


<style lang="less">
    @import "~assets/styles/server.less";
</style>