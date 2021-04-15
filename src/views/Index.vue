<template>

    <div class="home">
        <HeadBar title="首页" needBack="false" />
        <!-- 焦点图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item, index) in images" :key="index">
                <a :href="item.url" target="_blank" rel="noopener noreferrer">
                    <van-image fit="contain" lazy-load :src="item.imageUrl" alt="长春疯马体育" />
                </a>
            </van-swipe-item>
        </van-swipe>
        <!-- 功能模块 -->
        <FunctionBar :funObj="funObj"></FunctionBar>

        <!-- 赛事活动 -->
        <ItemTitle title="赛事活动" href="/gameList" :needMore="true"></ItemTitle>
        <GamaList :gameList="gameList" :fromIndex="true"></GamaList>

        <!-- 新闻公告 -->
        <ItemTitle title="新闻公告" href="/newsList" :needMore="true"></ItemTitle>
        <NewsList :newsList="newsList"></NewsList>

        <ItemTitle title="报名查询" ></ItemTitle>
        <ApplySearch :submitUrl="'/searchList'"></ApplySearch>

        <ItemTitle title="分数查询" ></ItemTitle>
        <ScoreSearch :submitUrl="'/scoreSearch'"></ScoreSearch>


        <!-- 赛事专供 -->
        <ItemTitle title="赛事专供" :needMore="false"></ItemTitle>
        <AdList :adData="adData" ></AdList>

        <!-- 冠名商logo -->
        <ItemTitle title="赞助商"  :needMore="false"></ItemTitle>
        <LogoList :logoList="zanzhuLogo"></LogoList>
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
    import ItemTitle from "@/components/ItemTitle.vue";
    import ApplySearch from "@/components/ApplySearch.vue";
    import ScoreSearch from "@/components/ScoreSearch.vue";
    import { fetchHttp, formatTime } from "@/util/fn.js";



    import {
        Toast,
        Button,
        Swipe,
        SwipeItem,
        Image as VanImage
    } from "vant";
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
            BottomBar,
            ApplySearch,
            ScoreSearch,
            ItemTitle
        },
        data() {
            return {
                gameList: [],
                newsList:[],
                zanzhuLogo:[],
                adData:[
                    // {title:'测试1',url:'', pictureUrl:'http://ccfmty.com/marathon/%E9%A9%AC%E6%8B%89%E6%9D%BE/3a349a3df9ed4ffb8b06faeab7499e58.jpg' },
                ],
                images: [],
                funObj: [{
                    text: "报名查询",
                    icon: "award",
                    href: "/SearchList"
                }, {
                    text: "成绩查询",
                    icon: 'star',
                    href: "/ScoreSearch"
                }, {
                    text: "赛事中心",
                    icon: 'volume',
                    href: "/gameList"
                }, {
                    text: "照片查询",
                    icon: 'photo',
                    href: "/SearchList"
                }]
            };
        },
        created(){
           
        },
        mounted() {
             //首页焦点图模块
            fetchHttp('marathon/picture/homePage', 'GET').then(res => {
                if (res && res.code === 0) {
                    this.images = res.data;
                }else{
                    //默认两张图
                    this.images = [
                        {   url:'index',
                            imageUrl:'http://ccfmty.com/marathon/%E9%A9%AC%E6%8B%89%E6%9D%BE/3a349a3df9ed4ffb8b06faeab7499e58.jpg'
                        },
                        {   url:'index',
                            imageUrl:'http://ccfmty.com/marathon/%E9%A9%AC%E6%8B%89%E6%9D%BE/64f00303d6c14f8d8a40b624fc8d4a58.png'
                        },
                    ];
                }
            });
            
            //首页赛事模块
            fetchHttp('marathon/match/information', 'POST').then(res => {
                if (res && res.code === 0) {
                    const dataList = res && res.data;
                    let doing = [];
                    let done = [];
                    let lastData = [];
                    dataList && dataList.length > 0 && dataList.forEach((item, index) => {
                        item.startTime = formatTime(item.startTime)
                        item.endTime = formatTime(item.endTime)
                        item.matchTime = formatTime(item.matchTime)
                        if (item.state === 4) {
                            done.push(item)
                        } else {
                            doing.push(item)
                        }
                    })
                    lastData = doing.concat(done)
                    this.gameList = lastData.slice(0,4)
                }
            });
            
            //首页新闻模块
            fetchHttp('marathon/newsHomePage', 'POST').then(res => {
                if (res && res.code === 0) {
                    this.newsList = res.data;
                }
            });

            //首页赞助商logo
            fetchHttp('marathon/picture/logo', 'POST').then(res => {
                if (res && res.code === 0) {
                    this.zanzhuLogo = res.data;
                }
            });

            //首页赛事专供
            fetchHttp('marathon/picture/wonderfulPicture', { type: 4 }, 'GET').then(res => {
            if (res && res.code === 0) {
                    this.adData = res.data;
                }
            });
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
