<template>
  <div class="newsDetail">
    <HeadBar title="新闻详情" />
    <NewsContent :newsId="newsId"></NewsContent>
  </div>
</template>

<script>
  import HeadBar from "@/components/HeadBar.vue";
  import { getQueryString } from "@/util/fn.js";
  import NewsContent from "@/components/NewsContent.vue";

  import {
    Toast,
    Button
  } from "vant";

  export default {
    name: "newsDetail",
    components: {
      HeadBar,
      [Button.name]: Button,
      NewsContent
    },
    data() {
      return {
        newsId: ''
      };
    },
    computed: {
    },
    mounted() {
      let id = getQueryString('newsId');
      this.newsId = id;
    },
    methods: {

    }
  };
</script>
<style scope lang="less">
</style>
