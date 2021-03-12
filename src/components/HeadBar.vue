<template>
  <van-nav-bar
    class="red"
    :title="title"
    @click-left="onClickLeft"
    :left-arrow="showBack"
    :fixed="true"
    :placeholder="true"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
</van-nav-bar>
</template>

<script>
    import {
        NavBar,
        Icon
    } from "vant";

    export default {
        name: "HeadBar",
        props: {
            title: String,
            needBack: String,
        },
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
        },
        computed: {
            showBack() {
                let needBack = this.needBack === "true" ? true : false;
                return needBack;
            },
        },
        methods: {
            onClickLeft() {
                window.history.back();
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    h3 {
        margin: 40px 0 0;
    }
    
    ul {
        list-style-type: none;
        padding: 0;
    }
    
    li {
        display: inline-block;
        margin: 0 10px;
    }
    
    a {
        color: #42b983;
    }
</style>