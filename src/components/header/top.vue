<template>
    <div class="topbar">
    	<div class="wrapped clearfix">
    		<!-- <a href="javascript:;" class="save-to-desktop">保存到桌面</a> -->
            <div class="all-game">
            	<a href="javascript:void(0);">全部游戏</a>
            	<ul class="ag-list">
                    <li v-for="(item, key) in gameData" :key="key"><a :href="item.url" target="_blank"><img :src="item.icon" alt="item.name">{{item.name}}</a></li>
                </ul>
            </div>
            <div class="user">
                <div class="before" v-if="!userData.username"><a @click="show_login()">登录</a><span>|</span><a @click="show_join()">注册</a></div>
                <a v-if="userData.username">{{userData.username}}</a> <a  v-if="userData.username" @click="logout">注销</a>
            </div>
        </div>
        <join-popup :is-show="showJoin" @close="closeJoin" :JoinLoading="JoinLoading" @join="join"></join-popup>
        <login-popup :is-show="showLogin" :LoginLoading="LoginLoading" @close="closeLogin" @login="login"></login-popup>
    </div>
</template>

<script>
    import JoinPopup from "@/components/popup/join";
    import LoginPopup from "@/components/popup/login";

    import { mapGetters, mapActions } from 'vuex'
    import { AjaxLoginPanel, AjaxJoinPanel } from 'src/apis/user'

    export default {
        name: 'HeaderTop',
        components: {
            JoinPopup,
            LoginPopup
        },
        data() {
            return {
                showLogin: false,
                LoginLoading: false,
                showJoin: false,
                JoinLoading: false,
                gameData: [
                    { url: '', icon: 'http://wan.265g.com/cache/index/logo/mffyj.jpg', name: '魔法风云纪' },
                    { url: '', icon: 'http://wan.265g.com/cache/index/logo/bfsg.jpg', name: '兵法三国' },
                    { url: '', icon: 'http://wan.265g.com/cache/index/logo/jpsg.jpg', name: '极品三国志' },
                    { url: '', icon: 'http://wan.265g.com/cache/index/logo/hmtz.jpg', name: '鸿蒙天尊' },
                    { url: '', icon: 'http://wan.265g.com/cache/index/logo/bwzx.png', name: '霸王之心' },
                    { url: '', icon: 'http://wan.265g.com/cache/index/logo/cjsguo.jpg', name: '皓月屠龙之裁决三国' },
                    { url: '', icon: 'http://wan.265g.com/cache/index/logo/zhjie.jpg', name: '镇魂街' }
                ],
                username: ''
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
            logout(){
                window.location = '/'
                this.userLogout()
            },
            login(params){
                const self = this;
                self.LoginLoading = true;
                AjaxLoginPanel(params).then(res => {
                    if(res.status === 'success'){
                        let data = {
                            token: res.data,   // 因为只有token
                            data: {
                                username: params.username // TODO，登录成功后后台应该回显用户基本信息
                            }
                        }
                        self.recordUserInfo(data)
                        let redirect = self.$route.path ? self.$route.path : decodeURIComponent(self.$route.query.redirect || '/ucenter');
                        self.$router.push({
                            path: redirect
                        })
                        self.closeLogin();
                    }else{
                        self.$Message.error(res.message)
                    }
                    self.LoginLoading = false;
                })
            },
            join(params){
                const self = this;
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

                this.JoinLoading = true;
                AjaxJoinPanel(params).then(res => {
                    if(res.status === 'success'){
                        let data = {
                            token: res.data,
                            data: {
                                username: params.username // TODO，登录成功后后台应该回显用户基本信息
                            }
                        }
                        self.recordUserInfo(data)
                        let redirect = self.$route.path ? self.$route.path : decodeURIComponent(self.$route.query.redirect || '/ucenter');
                        self.$router.push({
                            path: redirect
                        })
                        self.closeJoin();
                    }else{
                        self.$Message.error(res.message)
                    }
                    self.JoinLoading = false;
                })
            },
            GetQueryString(name) {  // TODO，提取成公共函数
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i"); 
                var r = window.location.search.substr(1).match(reg); 
                if (r!=null) return (r[2]); return null; 
            }
        },
        computed: {
            ...mapGetters([ 'userToken', 'userData' ])
        }
    }
</script>

<style lang="less">
.topbar { height: 40px; line-height: 40px; background: #eee; }
.topbar a { color: #666; }
.topbar a:hover { color: #f00; }
.topbar .after a { margin-right: 10px; }
.save-to-desktop, .all-game, .user { padding-left: 20px; background: url("~@/assets/images/topbar_icon.gif") no-repeat; }
.save-to-desktop { float: left; background-position: 0 0; }

.user { float: right; padding-left: 16px; background-position: 0 -40px; margin-right: 26px; }
.user span { color: #d5d5d5; margin: 0 9px; }

.all-game {position: relative; float: right; background-position: 0 -80px; }
.ag-list { width: 348px; background: #fff; padding: 0 0 20px 25px; border: 5px solid #eee; position: absolute; top: 40px; right: 0;overflow: hidden; z-index: 13; display: none; }
.ag-list .more-game { width: 320px; height: 34px; line-height: 34px; display: block; text-align: center; background: #f2f2f2; color: #999; border: 1px solid #e9e9e9; margin-top: 15px; }
.ag-list ul { overflow: hidden; zoom: 1; }
.ag-list li { float: left; width: 33.33%; margin-top: 15px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
.ag-list li a { float: left; height: 20px; line-height: 20px; display: block; color: #000; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
.ag-list li a img { float: left; width: 20px; height: 20px; margin-right: 4px; }
.ag-list li a:hover { color: #f00; }
.all-game:hover .ag-list{
    display: block;
}
</style>
