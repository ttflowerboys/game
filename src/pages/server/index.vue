<template>
<div class="s_body">
    <a class="logo" href="/" target="_blank">封神霸业</a>
    <div class="s_wrap">
        <div class="head_nav clear">
            <a href="/"><span class="head_nav01">进入官网</span></a>
            <a href=""><span class="head_nav02">领取礼包</span></a>
            <a href=""><span class="head_nav03">用户充值</span></a>
            <a href="" style="border-right:none;"><span class="head_nav04">游戏论坛</span></a>
        </div>
        <div class="logn_head">用户登录</div>
        <div class="logn_state">
            <a href="javascript:show_login();" class="start_btn" style=""></a>
            <div class="logn_info" style="display:none;">
                <h3>您好<i>，</i><span></span><i>，</i><a target="_blank" href="/ucenter/account/">完善资料</a><i>，</i><a href="javascript:login_out();">注销</a></h3>
                <p></p>
            </div>
        </div>
        <div class="list_head">服务器列表</div>
        <div class="server_title clear"><span>最新区服推荐</span><a target="_blank" href="http://pay.265g.com/?tp=go&amp;areaid=9041">双线1服&nbsp;&nbsp;&nbsp;&nbsp;火爆开启</a></div>
        <!-- 区服推荐列表 -->
        <div class="server_box" id="scroll">
            <ul class="server_list"><li><a target="_blank" href="http://pay.265g.com/?tp=go&amp;areaid=9041">双线1服<span>已开启</span></a></li></ul>
        </div>
    </div>
</div>
</template>
<style lang="less">
    @import "~assets/styles/server.less";
</style>