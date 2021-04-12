<template>
  <div class="newsList">
    <HeadBar title="新闻列表" />
    <h3 class="newsTitleH3">新闻列表</h3>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in newsData" :key="item.id" :title="`${index+1}、${item.newsName}`" @click="goDetailLink(item)" />
    </van-list>
  </div>
</template>

<script>
  import HeadBar from "@/components/HeadBar.vue";
  import { getQueryString, fetchHttp, formatTime } from "@/util/fn.js";

  import {
    Toast,
    Button,
    List,
    Cell
  } from "vant";

  export default {
    name: "home",
    components: {
      HeadBar,
      [Button.name]: Button,
      [List.name]: List,
      [Cell.name]: Cell
    },
    data() {
      return {
        newsData: [],
        loading: false,
        finished: false,
        currentPage: 1,
        totalPage: 1,
      };
    },
    computed: {
    },
    methods: {
      onLoad() {
        fetchHttp('marathon/newsInfoListPage', { page: this.currentPage, size: 1000 }, 'GET').then(res => {
          if (res && res.code === 0) {
            if (res.data && res.data.list) {
              this.newsData = res.data.list
              this.loading = false;
              this.finished = true;
            } else {
              Toast('没有找到相关新闻');
            }
          }
        });
      },
      goDetailLink(item) {
        window.location.href = 'newsDetail?newsId=' + item.id;
      }
    }
  };
</script>
<style scope lang="less">
  .newsList {
    color: #333333;
    font-size: 16px;
  }
  .newsTitleH3{
    border-bottom: 2px solid #ddd;
    padding: 0 0px 5px 15px;
  }
</style>
