<template>
    <div class="user">
        <headtop title="SFA" backurl="">
            <router-link to="/home" slot="r" class="icon iconfont icon-user"></router-link>
        </headtop>
        <h1>我是用户页面</h1>
    </div>
</template>
<script>
    import headtop from '../components/TopHead.vue';
    export default {
        name: "user",
        data() {
            return {
                count: 0
            };
        },
        components: {
            headtop
        }
    }
</script>
<style lang="scss" scoped>
</style>