<template>
    <div id="Layout" class="wap_layout">
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
	.wap_layout{
		background-color: #eee;
        .wap-button-custom-red{
            width: 100%;
            margin-top: 22px;
            background-color: #dc5535;
            border-color: #dc5535;
            text-align: center;
            font-size: 16px;
            line-height: 32px;
            color: #fff;
            &:hover,
            &:active{
                color: #fff;
                background-color: #dc5535;
                border-color: #dc5535;
            }
            &:focus {
                box-shadow: 0 0 0 2px rgba(237,63,20,.2)
            }
        }
	}	
</style>
