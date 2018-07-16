<template>
    <div class="main">
        <div class="topbox wrapped">
            <div class="clearfix">
                <div class="server-box">
                    <div class="btns">
                        <a :href="'/server/'+gameCode" class="btn-start"><i class="start-txt"></i></a>
                        <a href="http://wan.265g.com/help/problems/" target="_blank" class="btn-download">客服中心</a>
                        <a href="http://pay.265g.com/?gameid=174" target="_blank" class="btn-recharge">游戏充值</a>
                    </div>
                    <!-- 服务器列表 -->
                    <div class="server-list">
                        <dl>
                            <dt id="qf">
                            <h3>游戏服务器</h3>
                            </dt> <dd> <span>双线1服（s1）</span> <em class="hot_game"> 火爆开启 <s></s> </em> <a href="" target="_blank">进入</a> </dd>
                        </dl>
                    </div>
                </div>

                <div class="server-focus">
                    <div class="focusPlacehoder">
                        <div class="plocalhoder" v-if="!info.bannerList.length">暂无数据</div>
                        <Carousel class="focusBox" loop autoplay autoplay-speed="5000" v-if="info.bannerList.length">
                            <CarouselItem v-for="item in info.bannerList" :key="item.xs_banner_title">
                                <div class="demo-carousel"><a :href="item.xs_banner_link"><img :src="item.xs_banner_img" :alt="item.xs_banner_title"></a></div>
                            </CarouselItem>
                        </Carousel>
                    </div>
                    <div class="activ-link">
                        <a href="" target="_blank" title="新手礼包">
                            <img src="/static/upload/201806270626082587.jpg" width="186" height="80">
                        </a>
                        <a href="" target="_blank" title="新手礼包">
                            <img src="/static/upload/201806270626171059.jpg" width="186" height="80">
                        </a>
                        <a href="" target="_blank" title="新手礼包">
                            <img src="/static/upload/201806270626214934.jpg" width="186" height="80">
                        </a>
                    </div>
                </div>

                <div class="topNews">
                    <div class="news-nav">
                        <ul>
                            <li v-for="(items,index) in doc.title" :class="doc.Type === items.value ? 'active': ''" @click="doc.Type = items.value">{{items.name}}</li>
                        </ul>
                    </div>
                    <div class="news-tab">
                        <ul class="tab-list" v-for="(items,index) in info.docList" v-show="doc.Type === index">
                            <div v-if="!items" class="plocalhoder">暂无数据</div>
                            <li v-if="items.length" v-for="item in items"><i class="square"></i><a href="" target="_blank">{{item.xs_doc_title}}</a><em>{{item.xs_createtime.slice(11,16)}}</em></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="image-appreciation">
                <div class="title">
                    <i class="icon-image-appreciation"></i><span>图片鉴赏</span>
                </div>
                <div class="image-list">
                    <ul class="clearfix">
                        <li v-for="item in 4" v-if="info.picLoading"></li>
                        <li v-for="item in info.picList" v-if="!info.picLoading"><a :href="item" target="_blank"><img :src="item" width="258px" height="178px"></a></li>
                    </ul>
                </div>
            </div>

            <div class="server-center center-wrap">
                <a href="" class="qq-group">加入Q群</a>
                <a href="javascript:void(0)" target="_blank" class="online-server" id="BizQQWPA">在线客服</a>
                <a href="/pay" target="_blank" class="recharge">充值中心</a>
                <a href="" target="_blank" class="complain">账号申诉</a>
            </div>
        </div>
    </div>
</template>

<script>
    import { AjaxGameDetail, AjaxGameBanner, AjaxGameDoc, AjaxGamePic, AjaxGameType } from 'src/apis/game'

    export default {
        name: 'gameindex',
        data() {
            return {
                gameCode: this.$route.params.code,
                doc: {
                    title: [
                        { name: '最新', value: 'news_notices' },
                        { name: '公告', value: 'activity_advices' },
                        { name: '活动', value: 'game_strategies' },
                        { name: '攻略', value: 'newDocs' }
                    ],
                    Type: 'activity_advices'
                },
                info: {
                    bannerList: [],
                    picList: [],
                    picLoading: false,
                    docList: []
                }
            }
        },
        methods: {
            getFocus(){
                const self = this;
                let data = {
                    gid: localStorage.getItem('gameID') // TODO
                }
                AjaxGameBanner(data).then(res => {
                    if(res.status === 'success'){
                        self.info.bannerList = res.data ? res.data : [];
                    }
                })
            },
            getPic(){
                const self = this;
                this.info.picLoading = true;
                let data = {
                    gid: localStorage.getItem('gameID') // TODO
                }
                
                AjaxGamePic(data).then(res => {
                    if(res.status === 'success'){
                        let result = res.data;
                        if(result && result.length){
                            self.info.picList = res.data;
                            self.info.picLoading = false;
                        }else{
                            
                        }                        
                    }else{

                    }
                })
            },
            getDoc(){
                const self = this;
                let data = {
                    gid: localStorage.getItem('gameID') // TODO
                }
                AjaxGameDoc(data).then(res => {
                    if(res.status === 'success'){
                        self.info.docList = res.data;
                    }else{

                    }
                })
            },
            init(){
                this.getFocus()
                this.getPic()
                this.getDoc()
            }
        },
        created(){
            this.init()
        }
    }
</script>