<template>
  <van-tabbar router v-model="active" active-color="#ee0a24" inactive-color="#000000" @change="onChange">
    <van-tabbar-item replace name="index" to="/index"  icon="wap-home">首页</van-tabbar-item>
    <van-tabbar-item replace name="game" to="/gameList"  icon="hot">赛事</van-tabbar-item>
    <van-tabbar-item replace name="news" to="/newsList"  icon="comment">新闻</van-tabbar-item>
    <van-tabbar-item replace name="user" to="/user" icon="friends">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
  import {
    Tabbar,
    TabbarItem,
    Toast
  } from "vant";

  export default {
    name: "BottomBar",
    props: {
      active: String
    },
    components: {
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem,
    },
    data() {
      return {

      };
    },
    computed: {
    },
    mounted() {
    },
    methods: {
      onChange(index) {
        this.active = index;
        Toast(index);
      },
    },
  };
</script>
