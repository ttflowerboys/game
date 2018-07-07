<template>
    <div class="navigation">
    	<div class="wrapped clearfix">
        	<h1 class="site-logo"><a href="/"><strong class="hide">798w.com</strong></a></h1>
            <div class="site-nav">
                <router-link to="/">首页</router-link>
                <router-link to="/ucenter">充值中心</router-link>
                <router-link to="/pay">客服中心</router-link>
                <router-link to="/help">个人中心</router-link>
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
