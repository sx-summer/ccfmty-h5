<template>
  <div>

    <ul class="ad-list">
      <li class="ad-item" v-for="(item, index) in adData" :key="index">
        <a :href='item.url' class="activeItem">
          <div class="ad-image">
            <van-image fit="cover" lazy-load class="ad-image" :src="item.imageUrl" :alt="item.title" />
          </div>
          <div class="ad-buy">
              立即购买
          </div>
          <!-- <div class="ad-info">
            <div class="ad-title" v-if="fromIndex">{{ item.title}}</div>
            <div class="ad-buy">
              <van-button size="large" type="info" style="height:30px;">立即购买</van-button>
            </div>
          </div> -->
        </a>
      </li>
    </ul>

  </div>
  
</template>

<script>
 import { Toast, Image as VanImage, Button as VanButton } from "vant";

  export default {
    name: "FunctionBar",
    props: {
      adData: Array
    },
    components: {
      VanImage
      // VanButton
    },
    data() {
      return {
        title: "sssss"
      };
    },
    computed: {
    },
    mounted() {
    },
    methods: {
    },
  };
</script>
<style lang="less" scope>
  .ad-list{
    overflow:hidden;
    _zoom:1;
  }
  .ad-item{
    float:left;
    width:47%;
    margin: 2% 0 0 2%;
    position: relative;
  }
  .ad-image{
    width:100%;
    height:176px;
    overflow:hidden;
  }
  
  .ad-info{
    margin-top:5px;
  }
  .ad-buy{
    position: absolute;
    bottom:0;
    left:0;
    width:100%;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    opacity: 0.7;
    color:#fff;
    // background-color: #ee0a24;
    background-color: #1989fa;
  }
</style>
