<template>
  <div class="newsContent">
    <h4 class="newsTitle">
      {{newsData.newsName}}
    </h4>
    <div class="newsDesc" v-html='newsData.newsContent'>
    </div>
  </div>
</template>

<script>
  import { Toast } from "vant";
  import { getQueryString, fetchHttp, formatTime } from "@/util/fn.js";

  export default {
    name: "NewsContent",
    props: {
      newsId: String
    },
    components: {
      // [Tabbar.name]: Tabbar,
    },
    data() {
      return {
        newsData: ''
      };
    },
    computed: {
    },
    mounted() {
      setTimeout(() => {
        this.getNewsInfo();
      }, 600);
    },
    methods: {
      getNewsInfo() {
        let id = this.newsId;
        if (id) {
          //获取新闻详情
          fetchHttp('marathon/newsDetail', { id }, 'GET').then(
            res => {
              if (res && res.code === 0) {
                if (res.data && res.data.id) {
                  this.newsData = res.data;
                } else {
                  Toast('没有找到相关新闻!');
                }
              }
            }
          );
        }
      }
    }
  };
</script>
<style lang="less" scope>
  .NewsContent {
    width: 100%;
    color: #333333;
  }

  .newsDetail {
    padding: 10px 0;
    color: #333333;
  }

  .newsTitle {
    font-size: 20px;
    color: #333333;
    text-align: center;
    border-bottom: 1px solid #f1f1f1;
    padding: 15px 0;
    margin: 0;
  }

  .newsDesc{
    width: 100%;
    padding: 0 15px;
  }
</style>
