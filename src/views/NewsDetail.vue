<template>
  <div class="newsDetail">
    <HeadBar title="新闻详情" />
    <NewsContent :newId="newId"></NewsContent>
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
        newId: ''
      };
    },
    computed: {
    },
    mounted() {
      let id = getQueryString('newsId');
      this.newId = id;
    },
    methods: {

    }
  };
</script>
<style scope lang="less">
</style>
