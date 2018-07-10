<template>
    <div class="inner wrapped clearfix">
        <div class="container">
            <div class="inner-title">
                <span>新闻公告</span>
            </div>
            <div class="news-list">
                <ul>
                    <li v-for="items in docList">
                        <i class="line"></i>
                        <a href="" target="_blank" class="news-title">{{items.xs_doc_title}}</a>
                        <p class="news-info"><span>{{items.xs_createtime}}</span><span>来源：265g</span></p>
                        <p class="news-brief">{{items.xs_doc_abs}}...<a href="" target="_blank"></a></p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="sidebar">
            <div class="btns">
                <a href="javascript:void(0)" target="_blank" class="btn-start" onclick="get_start_url(174)"><i class="start-txt"></i></a>
                <a href="http://wan.265g.com/help/problems/" target="_blank" class="btn-download">客服中心</a>
                <a href="http://pay.265g.com/?gameid=174" target="_blank" class="btn-recharge">游戏充值</a>
            </div>
            <!-- 服务器列表 -->
            <div class="server-list">
                <dl>
                    <dt id="qf">
                    <h3>游戏服务器</h3>
                    <a href="/server/list_174.html" target="_blank">更多</a>
                    </dt> <dd> <span>双线1服（s1）</span> <em class="hot_game"> 火爆开启 <s></s> </em> <a href="http://pay.265g.com?tp=go&amp;areaid=9041" target="_blank">进入</a> </dd> 
                </dl>
            </div>
            <!-- 最新文章 -->
            <div class="side-grid">
                <div class="title">
                    <i class="icon-announcement"></i>
                    <span>最新公告</span>
                </div>
                <div class="side-list">
                    <ul>
                        <li><a href="http://wan.265g.com/fsby/yxgg/18666.html" target="_blank">265G《封神霸业》开服公告</a></li>
                    </ul>
                </div>
            </div>
            <!-- 游戏攻略 -->
            <div class="side-grid">
                <div class="title">
                    <i class="icon-game-strategy"></i>
                    <span>游戏攻略</span>
                    <a href="/fsby/yxgl" target="_blank">更多&gt;&gt;</a>
                </div>
                <div class="side-list">
                    <ul>
                        <li><a href="http://wan.265g.com/fsby/yxgl/18686.html" target="_blank">VIP介绍</a></li>
                    </ul>
                </div>
            </div>
            <!-- 客服 -->   
            <div class="server-center">
                <div class="title">                        
                    <i class="icon-green-passage"></i>
                    <span>快速通道</span>
                </div>
                <div class="side-list">
                    <div class="server-wrap">
                        <a href="http://shang.qq.com/wpa/qunwpa?idkey=7fdf62887a3d69a4b00d3107e648153c321d4c9610a01a1fd34654387b18ef10" target="_blank" class="qq-group">加入Q群</a>
                        <a href="javascript:void(0)" target="_blank" class="online-server" id="BizQQWPA">在线客服</a>
                        <a href="http://pay.265g.com/" target="_blank" class="recharge">充值中心</a>
                        <a href="http://wan.265g.com/help/appeal/account" target="_blank" class="complain">账号申诉</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import { AjaxGameDoc } from 'src/apis/game'

    export default {
        name: 'gameindex',
        data() {
            return {
                gameCode: this.$route.params.code,
                docList: []
            }
        },
        methods: {
            getDoc(){
                const self = this;
                let data = {
                    gid: localStorage.getItem('gameID') // TODO
                }
                AjaxGameDoc(data).then(res => {
                    if(res.status === 'success'){
                        self.docList = res.data.newDocs;
                    }else{

                    }
                })
            },
            init(){
                this.getDoc()
            }
        },
        created(){
            this.init()
        }
    }
</script>