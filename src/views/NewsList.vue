<template>
  <div class="newsList">
    <HeadBar title="新闻列表" />
    <div>
      <!-- 新闻列表 -->
      <NewsList :newsList="newsList" :fromIndex="true" class="noimage-list"></NewsList>
    </div>
  </div>
</template>

<script>
  import HeadBar from "@/components/HeadBar.vue";
  import NewsList from "@/components/NewsList.vue";
  import { getQueryString, fetchHttp, formatTime } from "@/util/fn.js";

  export default {
    name: "newsList",
    components: {
      HeadBar,
      NewsList
    },
    data() {
      return {
        newsList: []
      };
    },
    mounted() {
      //新闻列表
      fetchHttp('marathon/newsInfoListPage', 'POST').then(res => {
          if (res && res.code === 0 && res.data) {
              this.newsList = res.data.list ? res.data.list : [];
          }
      });
    },
    methods: {
     
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

  .noimage-list .news-item{
   .news-desc{
     display: none;
   } 
   .news-img{
     display: none;
   } 
   .news-info{
     width:100%;
   }
   .news-time{
     margin-top: 5px;
   }
}
</style>
