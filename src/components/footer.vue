<template>
    <div class="footer">
    	<div class="wrapped clearfix">
        	<div class="footerL">
            	<a class="logo" href="">玩页游就上798WAN.com</a>
            </div>
            <div class="footerC">
            	<p><a href="" >关于本站</a><span>|</span><a href="">商务合作</a><span>|</span><a>广告服务</a><span>|</span><a>网站地图</a><span>|</span><a href="/help">客服中心</a><span>|</span><a>通行证注册</a><span>|</span><a>人才招聘</a></p>
                <p>网站备案：鄂ICP备17022515号-3</p>
                <p>Copyright © 2007-2018 798wan.com</p>
                <p>健康游戏忠告：抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活</p>
            </div>
            <div class="footerR">
                <p>客服QQ<br><i>{{qq}}</i></p>
            </div>
        </div>
    </div>
</template>

<script>
    import * as basicConfig from 'src/config/basicConfig'
    export default {
        name: 'AppFooter',
        data(){
            return {
                qq: basicConfig.qq
            }
        }
    }
</script>
<style lang="less">
  @import "~assets/styles/footer.less";
</style>
