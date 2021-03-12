<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/login">login</router-link> |
      <router-link to="/person">person</router-link> | -->
      <van-tabbar route v-model="active" active-color="#ee0a24" inactive-color="#000000" @change="onChange">
        <van-tabbar-item replace to="/index" name="index" icon="wap-home">首页</van-tabbar-item>
        <van-tabbar-item replace to="/gameList" name="game" icon="hot">赛事</van-tabbar-item>
        <van-tabbar-item replace to="/newsList" name="news" icon="comment">新闻</van-tabbar-item>
        <van-tabbar-item replace to="/person" name="person" icon="friends">我的</van-tabbar-item>
      </van-tabbar>
    </div>
    <router-view />
  </div>
</template>
<script>
    import {
        Tabbar,
        TabbarItem,
        Toast
    } from "vant"; //Notify
    export default {
        name: "Home",
        components: {
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },
        data() {
            return {
                checkedGoods: ["1", "2", "3"],
                active: "index"
            };
        },
        computed: {
            totalPrice() {
                return "1233";
            }
        },

        methods: {
            onChange(index) {
                this.active = index;
                // Notify({ type: "primary", message: index });

            },
            onClickLeft() {

            },
            onSubmit() {
                Toast("点击结算");
            }
        }
    };
</script>
<style lang="less">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>