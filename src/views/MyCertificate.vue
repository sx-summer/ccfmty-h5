<template>
  <div class="home">
    <HeadBar title="我的证书" />
    <div class="box">
      <van-button type="info" @click="onSubmit">我的证书</van-button>
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
        Toast("报名列表");
      }
    }
  };
</script>
<style scope lang="less">
  .home {
    text-align: center;
  }

</style>
