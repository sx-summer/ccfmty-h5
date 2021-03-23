<template>
    <div class="home">
        <HeadBar title="首页" needBack="false" />
        <img alt="Vue logo" src="../assets/logo.png" />
        <div class="box">
            <van-button type="info" @click="onSubmit">我是首页</van-button>
        </div>
        <router-link to="/">Home</router-link> |
        <router-link to="/login">login</router-link> |
        <router-link to="/user">user</router-link> |
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
            };
        },
        computed: {
            totalPrice() {
                return "1233";
            }
        },

        methods: {
            onSubmit() {
                Toast("首页");
            }
        }
    };
</script>
<style scope lang="less">
.home{
    text-align: center;
}
</style>
