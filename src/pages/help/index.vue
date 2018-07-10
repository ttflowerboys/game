<template>
<div class="Help">
    <div class="service-banner service-index">
    <p>客服QQ：3458333481</p>
    <li>
        <a target="iframe_qq" href="http://wpa.qq.com/msgrd?v=3&uin=3458333481&site=qq&menu=yes">在线咨询</a>
    </li>
</div>
<div class="wrapped">
    	<div class="service-links">
        	<h3>服务</h3>
            <ul>
            	<li v-for="item in helpArr">
                	<a :href="item.url" target="_blank" class="service-link">
                    	<span><i :class="item.icon"></i></span>
                        <em>{{item.name}}</em>
                    </a>
                    <p>
                        <span v-for="(child,index) in item.children"><a :href="child.url" target="_blank">{{child.name}}</a><b>|</b></span>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'help',
        data() {
            return {
                helpArr: [
                    { name: '常见问题', url: '', icon: 'cjwt', children: [ { name: '账号问题', url: '' }, { name: '账号丢失申诉', url: '' },{ name: '物品被盗申诉', url: '' }] },
                    { name: '账号申诉', url: '', icon: 'zhss', children: [ { name: '账号丢失申诉', url: '' }, { name: '物品被盗申诉', url: '' }] },
                    { name: '安全绑定', url: '', icon: 'aqbd', children: [ { name: '手机绑定', url: '' }, { name: '邮箱绑定', url: '' }] },
                    { name: '自助服务', url: '', icon: 'zzfw', children: [ { name: '问题建议', url: '' }, { name: 'BUG反馈', url: '' }, { name: '结果查询', url: ''}] }
                ]
            }
        }
    }
</script>
<style lang="less">
    @import "~assets/styles/help.less";
</style>
