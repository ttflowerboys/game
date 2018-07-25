<template>
    <div id="Layout" class="Layout">
        <app-header/>
        <div id="Main" class="Main">
            <div class="error-404"></div>
        </div>
        <app-footer/>
    </div>
</template>

<script>
    import AppHeader from "@/components/header";
    import AppFooter from "@/components/footer";

    export default {
        name: 'index',
        components: {
            AppHeader,
            AppFooter
        },
        data() {
            return {}
        }
    }
</script>

<style>
	.error-404{
		width: 100%;
		height: 1080px;
		background: #ccc url(~assets/images/error-404.jpg) center no-repeat;
	}
</style>
