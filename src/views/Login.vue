<template>
  <div class="home">
    <HeadBar title="登陆" />
    <div class="box">
      <van-button type="info" @click="onSubmit">登陆</van-button>
    </div>
  </div>
</template>

<script>
  import HeadBar from "@/components/HeadBar.vue";
  import {
    Toast,
    Button
  } from "vant";

  export default {
    name: "home",
    components: {
      HeadBar,
      [Button.name]: Button
    },
    data() {
      return {
      };
    },
    computed: {
    },
    methods: {
      onSubmit() {
        Toast("登陆");
      }
    }
  };
</script>
<style scope lang="less">
  .home {
    text-align: center;
  }

</style>
