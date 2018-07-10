<template>
    <div class="Game">
        <app-top/>
        <div class="GameMain" :style="{ 'background-image': 'url('+ detail.pic +')'}">
            <div class="header">
                <div class="wrapped">
                    <div class="nav">
                        <router-link to="/index">官网首页</router-link>
                        <router-link :to="'/game/'+ gameCode + '/yxgl'">游戏攻略</router-link>
                        <router-link :to="'/game/'+ gameCode + '/yxgg'">新闻公告</router-link>
                        <router-link :to="'/game/'+ gameCode + '/index'" class="logo"></router-link>
                        <a href="/pay?gameid=174" target="_blank">游戏充值</a>
                        <router-link to="/help">客服中心</router-link>
                        <router-link :to="'/game/'+ gameCode + '/hdzx'">活动咨询</router-link>
                    </div>
                </div>
            </div>
            <router-view></router-view>
        </div>
        <app-footer/>
    </div>
</template>

<script>
    import AppTop from "@/components/header/top";
    import AppFooter from "@/components/footer";

    import { AjaxGameDetail, AjaxGameBanner, AjaxGameDoc, AjaxGamePic, AjaxGameType } from 'src/apis/game'

    export default {
        name: 'index',
        components: {
            AppTop,
            AppFooter
        },
        data() {
            return {
                gameCode: this.$route.params.code,
                detail: {
                    pic: ''
                }
            }
        },
        methods: {
            getGameDetail(){
                const self = this;
                let data = {
                    game_show_code: this.gameCode
                }
                AjaxGameDetail(data).then(res => {
                    if(res.status === 'success'){
                        self.detail.pic = res.data.pic;
                        localStorage.setItem('gameID', res.data.gid)
                    }else{
                        // self.$Message.error(res.message)
                    }
                })
            }
        },
        created(){
            this.getGameDetail()
        }
    }
</script>

<style lang="less">
    @import "~assets/styles/game.less";
</style>
