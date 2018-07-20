<template>
    <div>
        <header-top></header-top>
        <header-nav></header-nav>
    </div>
</template>

<script>
    import HeaderTop from "@/components/header/top";
    import HeaderNav from "@/components/header/nav";

    export default {
        name: 'AppHeader',
        components: {
            HeaderTop,
            HeaderNav
        },
        data() {
            return {}
        }
    }
</script>

