<template>
    <div class="wrapped Ucenter">
        <div class="center-top">
            <!-- 有消息的情况 最多显示99条 -->
            <a class="user-message none" href="">0</a>
            <!-- 没有消息的情况 -->
            <a class="user-message none">0</a>
            <a class="user-avatar" href="/ucenter/avatar/">
                <img src="~src/assets/images/face.jpg">
                <!-- <span>修改头像</span> -->
            </a>
            <div class="user-info">
                <p>账户：{{userData.username}}</p>
                <p>昵称：{{userData.nick_name}}</p>
                <p>充值帐号：{{userData.uid}}</p>
            </div>

            <!-- <div class="count">
                <a href="/ucenter/account/" class="qiandao">每日签到</a>
                <p>G 币：0.00  <a href="http://pay.265g.com" target="_blank">立即充值</a></p>
                <p>积分：0  <a href="javascript:;">赚积分</a></p>
            </div> -->
            <!-- <a class="ad-380-110" href="/server/list_143.html" target="_blank">
                <img src="/static/index/images/ad/dzz.jpg">
            </a> -->
        </div>
        <div class="center-main">
            <div class="center-nav">
                <ul>
                    <!-- <router-link to="/ucenter/data/">我的账号</router-link>
                    <router-link to="/ucenter/game/">我的游戏</router-link> -->
                    <router-link to="/ucenter/index/">个人资料</router-link>
                    <!-- <router-link to="/ucenter/avatar/">修改头像</router-link> -->
                    <router-link to="/ucenter/safety/">账号安全</router-link>
                    <!-- <router-link to="/ucenter/news/">站内消息</router-link>
                    <router-link to="/ucenter/recycling/">账号回收</router-link> -->
                </ul>
            </div>
            <div class="center-grid">
                <router-view></router-view>
            </div>
        </div>
        
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data () {
            return {
                userinfo: {
                    nick_name: '',
                    member_uid: '',
                    idcard: '',
                    real_name: '',
                    nick_name: '',
                    phone: '',
                    uid: ''
                }
            }
        },
        methods: {
            
        },
        computed: {
            ...mapGetters([ 'userToken', 'userData' ])
        },
        created(){
            document.body.setAttribute("class", "grayBg");
        }
    }
</script>
<style lang="less">
    @import "~assets/styles/center.less";
.dataform td.label{width:95px;padding-right:10px;text-align:right;color:#333;font-size: 14px;}
.dataform td.label strong{color:#fe0000;margin-left:3px}
.dataform td label{color:#666;margin-right:10px}
.dataform td.full{color:#666}
.dataform td.textarea{height:200px}
.dataform button{width:90px;height:34px;display:block;text-align:center;background:#1891d7;border-radius:5px;color:#fff;cursor:pointer;margin:16px 0 0 110px}
.dataform button:hover{background:#1dacff}
.dataform td.upload-screen{height:77px;overflow:hidden}
.dataform td .upload-file input{width:63px;height:63px;opacity:0;filter:alpha(opacity=0);cursor:pointer}

</style>
