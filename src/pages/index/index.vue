<template>
    <div class="Home wrapped clearfix">
        <div class="Left">
            <div class="lbox">
                <h3 :class="recommend.type">{{recommend.name}}</h3>
                <div :class="recommend.type + '-list'">
                    <ul>
                        <li v-for="item in recommend.list">
                            <a :href="item.url" target="_blank" :class="recommend.type + '-img'"><img :src="item.pic"></a>
                            <div class="imgHover">
                                <div class="iht">
                                    <a href="" target="_blank">{{item.name}}</a>
                                    <span>最新开服：<a href="" target="_blank">双线1服(s1)</a></span>
                                </div>
                                <div class="ihb">
                                    <a href="" target="_blank" class="start">开始游戏</a>
                                    <div class="tjyx-links">
                                        <a href="" target="_blank">官网</a><span>|</span><a href="" target="_blank">活动</a><span>|</span><a href="" target="_blank">新手礼包</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="lbox">
                <h3 :class="hot.type">{{hot.name}}</h3>
                <div :class="hot.type + '-list'">
                    <ul>
                        <li v-for="item in hot.list">
                            <a :href="item.url" target="_blank" :class="hot.type + '-img'"><img :src="item.pic"></a>
                            <div :class="hot.type + '-links'"><a href="http://wan.265g.com/fsby/" target="_blank" :class="hot.type + '-name'">{{item.name}}</a>
                                <a :href="item.url" target="_blank" class="start">开始游戏</a>
                                <a :href="item.url" target="_blank">领礼包</a>
                                <span>|</span>
                                <a :href="item.url" target="_blank">官网</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="lbox">
                <h3 :class="gift.type">{{gift.name}}</h3>
                <div :class="gift.type + '-list'">
                    <ul class="clearfix">
                        <li v-for="item in gift.list">
                            <a :href="item.url" target="_blank">
                                <img :src="item.pic">
                                <p>{{item.name}}</p>
                                <em>剩余：{{item.num}}个</em>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="lbox">
                <h3 :class="other.type">{{other.name}}</h3>
                <div :class="other.type + '-list'">
                    <ul>
                        <li v-for="item in other.list">
                            <a :href="item.url" target="_blank"><img :src="item.pic">{{item.name}}</a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
        <div class="Right">
            <div class="rbox">
            	<h3>{{news.title}}</h3>
                <div :class="news.type + '-list border'">
                	<ul>
                    	<li v-for="item in news.list"><a :href="item.url" target="_blank">{{item.title}}</a> <em></em></li>
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
                            <a :href="item.url" target="_blank" class="ng-img"><img :src="item.pic" width="80" height="60"></a>
                            <p><a :href="item.url" target="_blank" class="ng-name">{{item.title}}</a></p>
                            <p>角色扮演</p>
                            <p><a :href="item.url" target="_blank">[官网]</a><a href="" target="_blank">[领礼包]</a></p>
                        </li>
                    </ul>
                </div>
           	</div>

            <div class="rbox">
            	<h3>快速通道</h3>
                <div class="quick-links border">
                	<ul>
                    	<li><a href="/ucenter/user/vgetpwd" target="_blank"><i class="zhzh"></i>账号找回</a></li>
                        <li><a href="tencent://message/?uin=2850901596&amp;Site=wan.265g.com&amp;Menu=yes" target="_blank"><i class="swhz"></i>商务合作</a></li>
                        <li><a href="/ucenter/safety/" target="_blank"><i class="bdsj"></i>绑定手机</a></li>
                        <li><a href="/ucenter/safety/" target="_blank"><i class="bdyx"></i>绑定邮箱</a></li>
                    </ul>
                </div>
           	</div>
        </div>

     </div>

</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                recommend: {
                    name: '推荐游戏',
                    type: 'tjyx',
                    list: [
                        { name: '封神霸业', url: '', pic: 'http://i5.265g.com/images/201806/201806290140045190.jpg' },
                        { name: '不灭轮回', url: '', pic: 'http://i5.265g.com/images/201806/201806210105568856.jpg' },
                        { name: '大明征途', url: '', pic: 'http://i5.265g.com/images/201806/201806120123011803.jpg' }
                    ]
                },
                hot: {
                    name: '热门游戏',
                    type: 'rmyx',
                    list: [
                        { name: '封神霸业', url: '', pic: 'http://i7.265g.com/images/201806/201806290140139488.jpg' },
                        { name: '不灭轮回', url: '', pic: 'http://i2.265g.com/images/201806/201806210106039532.jpg' },
                        { name: '大明征途', url: '', pic: 'http://i2.265g.com/images/201806/201806120123061752.jpg' },
                        { name: '仙境物语RO', url: '', pic: 'http://i4.265g.com/images/201804/201804100214077725.jpg' },
                        { name: '兵法三国', url: '', pic: 'http://i6.265g.com/images/201803/201803130134541242.jpg' },
                        { name: '极品三国志', url: '', pic: 'http://i3.265g.com/images/201801/201801150914219341.jpg' },
                        { name: '封神霸业', url: '', pic: 'http://i7.265g.com/images/201806/201806290140139488.jpg' },
                        { name: '封神霸业', url: '', pic: 'http://i7.265g.com/images/201806/201806290140139488.jpg' },
                        { name: '封神霸业', url: '', pic: 'http://i7.265g.com/images/201806/201806290140139488.jpg' },
                        { name: '封神霸业', url: '', pic: 'http://i7.265g.com/images/201806/201806290140139488.jpg' },
                        { name: '封神霸业', url: '', pic: 'http://i7.265g.com/images/201806/201806290140139488.jpg' },
                        { name: '封神霸业', url: '', pic: 'http://i7.265g.com/images/201806/201806290140139488.jpg' }
                    ]
                },
                gift: {
                    name: '热门礼包',
                    type: 'rmlb',
                    list: [
                        { name: '不灭轮回 媒体礼包', url: '', pic: 'http://i7.265g.com/images/201806/201806210106167928.jpg', num: '9874' },
                        { name: '大明征途 新手礼包', url: '', pic: 'http://i5.265g.com/images/201806/201806120123333426.jpg', num: '9874' },
                        { name: '仙境物语RO 新手礼包', url: '', pic: 'http://i7.265g.com/images/201804/201804100214169101.jpg', num: '9874' },
                        { name: 'NBA征程 高级礼包', url: '', pic: 'http://i4.265g.com/images/201804/201804020111185293.jpg', num: '9874' },
                        { name: 'NBA征程 高级礼包', url: '', pic: 'http://i4.265g.com/images/201804/201804020111185293.jpg', num: '9874' }
                    ]
                },
                other: {
                    name: '其他游戏',
                    type: 'qtyx',
                    list: [
                        { name: '大明征途', url: '', pic: 'http://wan.265g.com/cache/index/logo/dmzt.jpg' },
                        { name: '斗罗大陆2D', url: '', pic: 'http://wan.265g.com/cache/index/logo/dldl.jpg' },
                        { name: '剑道仙语', url: '', pic: 'http://wan.265g.com/cache/index/logo/jdxy.jpg' },
                        { name: '仙境物语RO', url: '', pic: 'http://wan.265g.com/cache/index/logo/xjwy.jpg' },
                        { name: 'NBA征程', url: '', pic: 'http://wan.265g.com/cache/index/logo/nbazc.jpg' },
                        { name: '魔法风云纪', url: '', pic: 'http://wan.265g.com/cache/index/logo/mffyj.jpg' },
                        { name: '兵法三国', url: '', pic: 'http://wan.265g.com/cache/index/logo/bfsg.jpg' },
                        { name: '斗罗大陆2D', url: '', pic: 'http://wan.265g.com/cache/index/logo/dldl.jpg' },
                        { name: '斗罗大陆2D', url: '', pic: 'http://wan.265g.com/cache/index/logo/dldl.jpg' },
                        { name: '斗罗大陆2D', url: '', pic: 'http://wan.265g.com/cache/index/logo/dldl.jpg' },
                    ]
                },
                news: {
                    title: "活动公告",
                    type: 'news',
                    list: [
                        { title: 'QQ登陆用户自助登陆微端方法说明', url: '' },
                        { title: '265G游戏服务器冠名争霸赛', url: '' },
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
                        { title: '封神霸业', url: '', pic: 'http://i6.265g.com/images/201806/201806270716329872.jpg' },
                        { title: '不灭轮回', url: '', pic: 'http://i6.265g.com/images/201806/201806200644542827.jpg' },
                        { title: '大明征途', url: '', pic: 'http://i7.265g.com/images/201806/201806110622172220.jpg' },
                        { title: '仙境物语RO', url: '', pic: 'http://i6.265g.com/images/201804/201804080206335475.jpg' }
                    ]
                }
            }
        }
    }
</script>

<style lang="less">
@import "~assets/styles/list.less";
.Home {
  padding: 40px 0;
  .Left{
        float: left;
        width: 940px;
  }
  .Right{
        float: right;
        width: 240px;
  }
}
</style>
