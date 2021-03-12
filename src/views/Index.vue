<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <HelloWorld msg="Welcome to Vue.js" />
    <van-button type="info" @click="onSubmit">我是首页</van-button>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import { Toast, Button } from "vant";

export default {
  name: "Home",
  components: {
    HelloWorld,
    [Button.name]: Button
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
