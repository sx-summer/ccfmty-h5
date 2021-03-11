<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div>
      <van-button type="info" @click="onSubmit">信息按钮</van-button>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { Toast, Button } from 'vant';

export default {
  name: "App",
  components: {
    HelloWorld,
    [Button.name]: Button,
  },
  data() {
    return {
      checkedGoods: ['1', '2', '3']
    }
  },
  computed: {

    totalPrice() {
      return '1233'
    }
  },

  methods: {
    onSubmit() {
      Toast('点击结算');
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
