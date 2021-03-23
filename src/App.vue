<template>
    <div id="app">
        <div id="nav">
            <van-tabbar router v-model="active" active-color="#e50021" inactive-color="#000000" @change="onChange">
                <van-tabbar-item to="/index" name="index" icon="wap-home">首页</van-tabbar-item>
                <van-tabbar-item to="/gameList" name="game" icon="hot">赛事</van-tabbar-item>
                <van-tabbar-item to="/newsList" name="news" icon="comment">新闻</van-tabbar-item>
                <van-tabbar-item to="/user" name="user" icon="friends">我的</van-tabbar-item>
            </van-tabbar>
        </div>
        <router-view />
    </div>
</template>
<script>
    import {
        Tabbar,
        TabbarItem
    } from "vant";
    export default {
        name: "Home",
        components: {
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },
        data() {
            return {
                active: "index"
            };
        },
        computed: {
            
        },
        mounted() {
            this.initBottomBar(window.location.href);
        },
        methods: {
            onChange(index) {
                this.active = index;
            },
            initBottomBar(url) {
                if(url.indexOf('/game') > -1){
                    this.active = 'game';
                }else   if(url.indexOf('/news') > -1){
                    this.active = 'game';
                }else if(url.indexOf('/user') > -1) {
                    this.active = 'user';
                }
            }
        }
    };
</script>
<style lang="less">
    * {
        box-sizing: border-box;
    }
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

</style>
