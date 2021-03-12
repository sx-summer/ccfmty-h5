<template>
  <div class="home">
    <HeadBar title="成绩查询" />
    <div class="box">
      <van-button type="info" @click="onSubmit">成绩查询</van-button>
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
        Toast("成绩查询");
      }
    }
  };
</script>
<style scope lang="less">
  .home {
    text-align: center;
  }

</style>
