<template>

    <div class="home">
        <HeadBar title="首页" needBack="false" />
        <!-- 焦点图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <van-image fit="contain" lazy-load :src="image" alt="蘑菇街" />
            </van-swipe-item>
        </van-swipe>
        <!-- 功能模块 -->
        <FunctionBar :funObj = "funObj" ></FunctionBar>
        <!-- 赛事活动 -->
        <GamaList></GamaList>
        <!-- 新闻公告 -->
        <NewsList></NewsList>
        <!-- 赛事专供 -->
        <AdList></AdList>
        <!-- 冠名商logo -->
        <LogoList></LogoList>
        <!-- 版权相关 -->
        <BottomBar></BottomBar>
    </div>
</template>

<script>
    import HeadBar from "@/components/HeadBar.vue";
    import FunctionBar from "@/components/FunctionBar.vue";
    import GamaList from "@/components/GamaList.vue";
    import NewsList from "@/components/NewsList.vue";
    import AdList from "@/components/AdList.vue";
    import LogoList from "@/components/LogoList.vue";
    import BottomBar from "@/components/BottomBar.vue";

    import {
        Toast,
        Button,
        Swipe,
        SwipeItem,
        Image as VanImage
    } from "vant";
    // import Vue from "vue";
    // Vue.use(Lazyload);
    export default {
        name: "Home",
        components: {
            HeadBar,
            [Button.name]: Button,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [VanImage.name]: VanImage,
            FunctionBar,
            GamaList,
            NewsList,
            AdList,
            LogoList,
            BottomBar
        },
        data() {
            return {
                images: [
                    'http://ccfmty.com/marathon/%E9%A9%AC%E6%8B%89%E6%9D%BE/3a349a3df9ed4ffb8b06faeab7499e58.jpg',
                    'http://ccfmty.com/marathon/%E9%A9%AC%E6%8B%89%E6%9D%BE/64f00303d6c14f8d8a40b624fc8d4a58.png'
                ],
                funObj: [{
                    text: "报名查询",
                    icon: "award",
                    href: "/SearchList"
                },{
                    text: "成绩查询",
                    icon: 'star',
                    href: "/ScoreSearch"
                },{
                    text: "赛事中心",
                    icon: 'volume',
                    href: "/gameList"
                },{
                    text: "照片查询",
                    icon: 'photo',
                    href: "/SearchList"
                }]
            };
        },
        computed: {
            totalPrice() {
                return "1233";
            }
        },

        methods: {
            onSubmit() {
                Toast("首页");
            }
        }
    };
</script>
<style scope lang="less">
    .home {
        text-align: center;
    }

    .my-swipe .van-swipe-item {
        text-align: center;
        width: 100%;
        /* height: 200px; */
    }

</style>
