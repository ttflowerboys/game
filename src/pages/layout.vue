<template>
    <div id="Layout" class="Layout">
        <app-header/>
        <div id="Main" class="Main">
            <router-view></router-view>
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
