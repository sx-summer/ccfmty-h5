<template>
  <div class="home">
    <HeadBar title="首页" needBack = "true" />
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="box">
      <van-button type="info" @click="onSubmit">我是首页</van-button>
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
        name: "Home",
        components: {
            HeadBar,
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
<style lang="less">
    .box {
        height: 1000px;
        background-color: #f8f8f8;
    }
</style>