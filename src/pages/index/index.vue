<template>
    <div class="Home">
        <Carousel class="banner" loop>
            <CarouselItem v-for="items in bannerList" :key="items.id">
                <a :href="items.xs_banner_link" target="_blank"><img :src="items.xs_banner_img" :alt="items.xs_banner_title"></a>
            </CarouselItem>
        </Carousel>
        <div class="wrapped clearfix">
            <div class="Left">
                <!-- <div class="lbox">
                    <h3 class="tjyx">推荐游戏</h3>
                    <div class="tjyx-list">
                        <ul>
                            <li v-for="item in recommendGameList" v-if="!loading.tjyx">
                                <a :href="router.game + item.game_show_code" target="_blank" class="tjyx-img"><img :src="item.pic"></a>
                                <div class="imgHover">
                                    <div class="iht">
                                        <a :href="router.game + item.game_show_code" target="_blank">{{item.name}}</a>
                                        <span>最新开服：<a :href="router.game + item.game_show_code" target="_blank">{{item.hotpaly}}</a></span>
                                    </div>
                                    <div class="ihb">
                                        <a :href="router.game + item.game_show_code" target="_blank" class="start">开始游戏</a>
                                        <div class="tjyx-links">
                                            <a :href="router.game + item.game_show_code" target="_blank">官网</a><span>|</span><a  :href="router.game + item.game_show_code" target="_blank">活动</a><span>|</span><a href="" target="_blank">新手礼包</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="loading-list" v-for="i in loads" v-if="loading.tjyx"></li>
                        </ul>
                    </div>
                </div> -->

                <div class="lbox">
                    <h3 class="rmyx">热门游戏</h3>
                    <div class="rmyx-list">
                        <ul>
                            <li v-for="item in hotGameList" v-if="!loading.rmyx">
                                <a :href="router.server + item.game_show_code" :title="item.name" target="_blank" class="rmyx-img"><img :src="item.pic" :alt="item.name"></a>
                                <div class="rmyx-links"><a :href="router.server + item.game_show_code" :title="item.name" target="_blank" class="rmyx-name">{{item.name}}</a>
                                    <a :href="router.server + item.game_show_code" target="_blank" class="start">开始游戏</a>
                                    <a :href="router.server + item.game_show_code" target="_blank">领礼包</a>
                                    <span>|</span>
                                    <a :href="router.server + item.game_show_code" target="_blank">官网</a>
                                </div>
                            </li>
                            <li class="loading-list" v-for="i in loads" v-if="loading.rmyx"></li>
                        </ul>
                    </div>
                </div>

                <!-- <div class="lbox">
                    <h3 :class="gift.type">{{gift.name}}</h3>
                    <div :class="gift.type + '-list'">
                        <ul class="clearfix">
                            <li v-for="item in gift.list">
                                <a target="_blank" :href="item.url">
                                    <img :src="item.pic">
                                    <p>{{item.name}}</p>
                                    <em>剩余：{{item.num}}个</em>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div> -->

                <!-- <div class="lbox">
                    <h3 :class="other.type">{{other.name}}</h3>
                    <div :class="other.type + '-list'">
                        <ul>
                            <li v-for="item in other.list">
                                <a><img :src="item.pic">{{item.name}}</a>
                            </li>
                        </ul>
                    </div>
                </div> -->

            </div>
            <!-- <div class="Right">
                <div class="rbox">
                    <h3>{{news.title}}</h3>
                    <div :class="news.type + '-list border'">
                        <ul>
                            <li v-for="item in news.list"><a>{{item.title}}</a></li>
                        </ul>
                    </div>
                </div>

                <div class="rbox">
                    <h3>{{play.title}}</h3>
                    <div class="als-container  border">
                        <div class="kf-title">
                            <strong class="time">时间</strong>
                            <strong class="name">游戏名称</strong>
                            <strong class="qufu">区服</strong>
                        </div>
                        <ul :class="play.type + '-list'">
                            <li v-for="item in play.list">
                                <i class="today">{{item.time}}</i><a :href="item.url" target="_blank">{{item.title}}</a><em>s3857服</em>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="rbox">
                    <h3>{{newgame.title}}</h3>
                    <div class="new-game border">
                        <ul>
                            <li v-for="item in newgame.list">
                                <a class="ng-img"><img :src="item.pic" width="80" height="60"></a>
                                <p><a class="ng-name">{{item.title}}</a></p>
                                <p>角色扮演</p>
                                <p><a>[官网]</a><a target="_blank">[领礼包]</a></p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="rbox">
                    <h3>快速通道</h3>
                    <div class="quick-links border">
                        <ul>
                            <li><a href=""><i class="zhzh"></i>账号找回</a></li>
                            <li><a href=""><i class="swhz"></i>商务合作</a></li>
                            <li><a href=""><i class="bdsj"></i>绑定手机</a></li>
                            <li><a href=""><i class="bdyx"></i>绑定邮箱</a></li>
                        </ul>
                    </div>
                </div>
            </div> -->
        </div>
     </div>

</template>

<script>
    import { AjaxRecommendGames, AjaxHotGames, AjaxBanner } from 'src/apis/list'

    export default {
        name: 'Home',
        data() {
            return {
                router: {
                    game: '/game/',
                    server: '/server/'
                },
                bannerList: [],
                // recommendGameList: [],
                hotGameList: [],
                loading: {
                    tjyx: true,
                    rmyx: true,
                    banner: true
                },
                loads: 3,
                gift: {
                    name: '热门礼包',
                    type: 'rmlb',
                    list: [
                        { name: '不灭轮回 媒体礼包', url: '/gift/1', pic: '/static/upload/201806210106167928.jpg', num: '9874' },
                        { name: '大明征途 新手礼包', url: '/gift/2', pic: '/static/upload/201806120123333426.jpg', num: '1869' },
                        { name: '仙境物语RO 新手礼包', url: '/gift/3', pic: '/static/upload/201804100214169101.jpg', num: '9874' },
                        { name: 'NBA征程 高级礼包', url: '/gift/4', pic: '/static/upload/201804020111185293.jpg', num: '4800' }
                    ]
                },
                other: {
                    name: '其他游戏',
                    type: 'qtyx',
                    list: [
                        { name: '大明征途', url: '', pic: '/static/upload/logo/dmzt.jpg' },
                        { name: '斗罗大陆2D', url: '', pic: '/static/upload/logo/dldl.jpg' },
                        { name: '剑道仙语', url: '', pic: '/static/upload/logo/jdxy.jpg' },
                        { name: '仙境物语RO', url: '', pic: '/static/upload/logo/xjwy.jpg' },
                        { name: 'NBA征程', url: '', pic: '/static/upload/logo/nbazc.jpg' },
                        { name: '魔法风云纪', url: '', pic: '/static/upload/logo/mffyj.jpg' },
                        { name: '兵法三国', url: '', pic: '/static/upload/logo/bfsg.jpg' }
                    ]
                },
                news: {
                    title: "活动公告",
                    type: 'news',
                    list: [
                        { title: 'QQ登陆用户自助登陆微端方法说明', url: '' },
                        { title: '798wan游戏服务器冠名争霸赛', url: '' },
                        { title: '《游戏共享帐号被盗号及私下交易帐号等事件的处理相关声明》', url: '' },
                        { title: 'QQ登陆用户自助登陆微端方法说明', url: '' }
                    ]
                },
                play: {
                    title: '游戏开服',
                    type: 'als',
                    list: [
                        { title: '镇魂街', time: '今天 10:00' },
                        { title: '龙神契约', time: '今天 10:00' },
                        { title: '镇魂街', time: '今天 10:00' },
                        { title: '七杀', time: '07-06 15:00' },
                        { title: '镇魂街', time: '今天 10:00' },
                        { title: '镇魂街', time: '今天 10:00' },
                        { title: '镇魂街', time: '今天 10:00' },
                        { title: '镇魂街', time: '今天 10:00' },
                        { title: '镇魂街', time: '今天 10:00' },
                        { title: '镇魂街', time: '今天 10:00' }
                    ]
                },
                newgame: {
                    title: '新游戏',
                    list: [
                        { title: '封神霸业', url: '', pic: '/static/upload/201806270716329872.jpg' },
                        { title: '不灭轮回', url: '', pic: '/static/upload/201806200644542827.jpg' },
                        { title: '大明征途', url: '', pic: '/static/upload/201806110622172220.jpg' },
                        { title: '仙境物语RO', url: '', pic: '/static/upload/201804080206335475.jpg' }
                    ]
                }
            }
        },
        methods: {
            // getRecommendGames(){
            //     const self = this;
            //     AjaxRecommendGames().then(res => {
            //         if(res.status === 'success'){
            //             self.recommendGameList = res.data;
            //             self.loading.tjyx = false;
            //         }else{
            //             self.$Message.error(res.message)
            //         }
            //     })
            // },
            getHotGames(){
                const self = this;
                AjaxHotGames().then(res => {
                    if(res.status === 'success'){
                        self.hotGameList = res.data;
                        self.loading.rmyx = false;
                    }else{
                        self.$Message.error(res.message)
                    }
                })
            },
            getBanner(){
                const self = this;
                AjaxBanner().then(res => {
                    if(res.status === 'success'){
                        self.bannerList = res.data;
                        self.loading.banner = false;
                    }else{
                        self.$Message.error(res.message)
                    }
                })
            },
            init(){
                this.getBanner()
                // this.getRecommendGames()
                this.getHotGames()
            }
        },
        created(){
            this.init()
            document.body.setAttribute("class", "");
        }
    }
</script>

<style lang="less">
@import "~assets/styles/list.less";
.Home {
    padding-bottom: 40px;
    background-color: #fff;
    .Left{
        float: left;
        width: 940px;
    }
    .Right{
        float: right;
        width: 240px;
    }
    .banner{
        position: relative;
        width: 100%;
        height: 400px;
        margin-bottom: 40px;
        background: lightgrey;
        overflow: hidden;
        .ivu-carousel-item{
            height: 400px;
            text-align: center;
        }
    }
    .news-list{
        padding: 8px 20px;
    }
}
.loading-list{
    background: lightgrey ;
}
</style>
