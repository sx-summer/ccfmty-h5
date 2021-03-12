<template>
    <van-nav-bar :title="title" @click-left="onClickLeft" :fixed="true" :placeholder="true" class="head-bg">
        <template #left v-if="showBack">
            <van-icon class="head-icon" name="arrow-left" size="18" />
            <span>返回</span>
        </template>
        <template #right>
            <van-icon class="head-icon" name="search" size="18" />
            <router-link to="/scoreSearch">成绩</router-link>
        </template>
    </van-nav-bar>
</template>

<script>
    import {
        NavBar,
        Icon
    } from "vant";

    export default {
        name: "HeadBar",
        props: {
            title: String,
            needBack: String,
        },
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
        },
        computed: {
            showBack() {
                let needBack = this.needBack === "false" ? false : true;
                return needBack;
            },
        },
        methods: {
            onClickLeft() {
                window.history.back(-1);
            }
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .head-icon {
        margin: -2px 2px 0 0;
        color: #ffffff;
    }

    a {
        color: #ffffff;
    }

</style>

<style lang="less">
    .head-bg .van-nav-bar {
        background: #ee0a24;
        color: #ffffff;
    }

    .head-bg .van-nav-bar__title {
        color: #ffffff;
    }

</style>
