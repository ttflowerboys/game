<template>
    <div class="topbar">
    	<div class="wrapped clearfix">
    		<a href="javascript:;" class="save-to-desktop">保存到桌面</a>
            <div class="all-game">
            	<a href="javascript:void(0);">全部游戏</a>
            	<ul class="ag-list">
                    <li v-for="(item, key) in gameData" :key="key"><a :href="item.url" target="_blank"><img :src="item.icon" alt="item.name">{{item.name}}</a></li>
                </ul>
            </div>
            <div class="user"><div class="before"><a >登录</a><span>|</span><a >注册</a></div></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HeaderTop',
        data() {
            return {
                gameData: [
                    { url: '', icon: 'http://wan.265g.com/cache/index/logo/mffyj.jpg', name: '魔法风云纪' },
                    { url: '', icon: 'http://wan.265g.com/cache/index/logo/bfsg.jpg', name: '兵法三国' },
                    { url: '', icon: 'http://wan.265g.com/cache/index/logo/jpsg.jpg', name: '极品三国志' },
                    { url: '', icon: 'http://wan.265g.com/cache/index/logo/hmtz.jpg', name: '鸿蒙天尊' },
                    { url: '', icon: 'http://wan.265g.com/cache/index/logo/bwzx.png', name: '霸王之心' },
                    { url: '', icon: 'http://wan.265g.com/cache/index/logo/cjsguo.jpg', name: '皓月屠龙之裁决三国' },
                    { url: '', icon: 'http://wan.265g.com/cache/index/logo/zhjie.jpg', name: '镇魂街' }
                ]
            }
        }
    }
</script>