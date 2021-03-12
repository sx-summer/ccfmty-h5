<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/login">login</router-link> |
      <router-link to="/person">person</router-link> | -->

      <van-tabbar active-color="#ee0a24" inactive-color="#000">
        <van-tabbar-item icon="home-o">
          <router-link to="/">首页</router-link>
        </van-tabbar-item>
        <van-tabbar-item icon="search">
          <router-link to="/login">赛事</router-link>
        </van-tabbar-item>
        <van-tabbar-item icon="friends-o">
          <router-link to="/login">新闻</router-link>
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o">
          <router-link to="/person">我的</router-link>
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <router-view />
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast } from "vant";
export default {
  name: "Home",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      checkedGoods: ["1", "2", "3"]
    };
  },
  computed: {
    totalPrice() {
      return "1233";
    }
  },

  methods: {
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
