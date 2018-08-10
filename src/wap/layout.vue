<template>
    <div id="Layout" class="Wap_layout">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'wap',
        data() {
            return {}
        }
    }
</script>
<style lang="less">
	.Wap_layout{
		background-color: #eee;
	}	
</style>
