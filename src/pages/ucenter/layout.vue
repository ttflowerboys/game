<template>
    <div class="wrapped Ucenter">
        <div class="center-top">
            <!-- 有消息的情况 最多显示99条 -->
            <a class="user-message none" href="http://wan.265g.com/ucenter/news/">0</a>
            <!-- 没有消息的情况 -->
            <a class="user-message none">0</a>
            <a class="user-avatar" href="/ucenter/avatar/">
                <img src="0">
                <span>修改头像</span>
            </a>
            <div class="user-info">
                <p>账户：qq081221e</p>
                <p>昵称：至尊玉<span class="level l1" title="会员"></span><a href="/ucenter/safety/" target="_blank"><span class="safetystatus no" title="未认证"></span></a>          <!-- <a href="javascript:;" class="btn-check">查看特权</a> -->
                </p>
                <p>经验：<span class="exp"><em style="width:30%"></em></span><span class="exp-num"><em>3</em>/10</span><i class="doubt"></i></p>
                <p>资料：10% <a href="/ucenter/data/" target="_blank">完善资料</a></p>
            </div>

            <div class="count">
                <a href="/ucenter/account/" class="qiandao">每日签到</a>
                <p>G 币：0.00  <a href="http://pay.265g.com" target="_blank">立即充值</a></p>
                <p>积分：0  <a href="javascript:;">赚积分</a></p>
            </div>
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
                    <!-- <router-link to="/ucenter/avatar/">修改头像</router-link>
                    <router-link to="/ucenter/safety/">账号安全</router-link>
                    <router-link to="/ucenter/news/">站内消息</router-link>
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
    export default {
        data () {
            return {

            }
        },
        created(){
            document.body.setAttribute("class", "grayBg");
        }
    }
</script>
<style lang="less">
    @import "~assets/styles/center.less";
</style>
