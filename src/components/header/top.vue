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
                <div class="before" v-if="!username"><a @click="show_login()">登录</a><span>|</span><a @click="show_join()">注册</a></div>
                <a v-if="username">{{username}}</a> <a  v-if="username" @click="logout">注销</a>
            </div>
        </div>
        <join-popup :is-show="showJoin" @close="closeJoin"></join-popup>
        <login-popup :is-show="showLogin" @close="closeLogin"></login-popup>
    </div>
</template>

<script>
    import JoinPopup from "@/components/popup/join";
    import LoginPopup from "@/components/popup/login";
    export default {
        name: 'HeaderTop',
        components: {
            JoinPopup,
            LoginPopup
        },
        data() {
            return {
                showLogin: false,
                showJoin: false,
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
                localStorage.clear('username')
                localStorage.clear('token')
                window.location = '/'
            }
        },
        created(){
            this.username = localStorage.getItem('username') ? localStorage.getItem('username') : '';
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
