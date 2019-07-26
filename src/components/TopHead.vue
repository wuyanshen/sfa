<template>
    <div class="tophead">
        <div class="th-l"><i class="icon iconfont icon-icon"></i></div>
        <div class="th-title">{{title}}</div>
        <div class="th-r">
            <slot name="r">右侧插槽</slot>
        </div>

    </div>
</template>

<script>
    export default {
        name: "tophead",
        props: ["title", "backurl"],
        data() {
            return {

            }
        },
        components: {

        }
    }
</script>

<style scoped lang="scss">
    .tophead {
        display: flex;
        justify-content: space-between;
        height: $th;
        line-height: $th;
        color: #fff;
        font-size: $text-size-imp;
        background-color: red;

        .th_l {
            padding-left: px2rem(25);
        }

        .th_title {
            text-align: center;
            flex: 1 1 auto;
        }

        .th-r {
            padding-right: px2rem(25);
        }

        .icon::before {
            font-size: $text-size;
        }

    }
</style>