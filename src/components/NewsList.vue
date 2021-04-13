<template>
  <div>
    <ul>
      <li class="news-item" v-for="(item, index) in newsList" :key="index">
        <a :href='`newsDetail?newsId=${item.id}`' class="activeItem">
          <div class="news-img">
            NEWS
          </div>
          <div class="news-info">
              <div class="news-title">{{item.newsName}}</div>
              <div class="news-desc" v-html="item.newsContent"></div>
              <div class="news-time">{{formatTimeStr(item.createDate)}}</div>
          </div>

        </a>
      </li>
    </ul>
  </div>

</template>

<script>
  import { fetchHttp, formatTime } from "@/util/fn.js";
  import { Toast, Image as VanImage, Button } from "vant";

  export default {
    name: "FunctionBar",
    props: {
      newsList: Array,
      fromIndex: Boolean
    },
    components: {
      [VanImage.name]: VanImage,
      [Button.name]: Button,
    },
    data() {
      return {
        
      };
    },
    computed: {
      formatTimeStr() {
        return function (time) {
            return formatTime(time);
        }
      }
    },
    mounted() {
      
    },
    methods: {
      onChange(index) {
        this.active = index;
        Toast("首页");
      },
    },
  };
</script>
<style lang="less" scope>
.news-item{
  display: block;
  clear:both;
  padding: 10px;
  overflow: hidden;
  border-bottom: 1px solid #e4e4e4;
  &:last-child {
    border: 0;
  }
  .news-img{
    float: right;
    width: 30%;
    height: 115px;
    background-color: #e50021;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .news-info{
    float: left;
    width: 70%;
    padding-right: 10px;
    text-align: left;
  }
  .news-title{
    color: #333;
    // font-size: 14px;
    width: 100%;
    line-height: 18px;
    height: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 6px;
    color: #e50021;
  }
  .news-desc{
    margin: 6px 0;
    font-size:13px;
    color: #333;
    line-height: 20px;
    height: 60px;
    overflow: hidden;
    color: #666;
    p{
      margin:0;
      display: block;
      margin-block-start: 0px;
      margin-block-end: 0px;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    }
  }
  .news-time{
    color: #ccc;
    font-size:14px;
  }
}

</style>
