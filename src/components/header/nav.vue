<template>
    <div class="navigation">
    	<div class="wrapped clearfix">
        	<h1 class="site-logo"><a href="/"><strong class="hide">798w.com</strong></a></h1>
            <div class="site-nav">
                <router-link to="/index">首页</router-link>
                <router-link to="/pay">充值中心</router-link>
                <router-link to="/help">客服中心</router-link>
                <router-link to="/ucenter">个人中心</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HeaderNav',
        data() {
            return {}
        }
    }
</script>
