<template>
  <div class="bottombar">
    <div>
      <ItemTitle title="联系我们" href="http://ccfmty.com" :needMore="false"></ItemTitle>
      <p>
        <van-icon name="phone-o" class="icon" /> 
        <span>移动电话： +86 13194388808 铁军</span>
      </p>
      <p>
        <van-icon name="comment-o" class="icon" />
        <span>邮箱：2450683543@qq.com 邮编：130000</span>
      </p>
      <p>
        <van-icon name="location-o" class="icon" /> 
        <span>地址：长春市净月开发区亚泰华府第Y07幢2单元103号房 </span>
      </p>
    </div>
    <!-- <img src="https://s10.mogucdn.com/mlcdn/c45406/200329_4de97kj4jddfhkk5d6j7e21112de9_258x258.jpg" alt="咱家马拉松" width="100"> -->
    <div class="beian">
      <p class="copyright">©2020 ccfmty.com 长春疯马体育文化发展有限公司</p>
      <p class="gongan">
        <a href="http://icp.chinaz.com/%E5%90%89ICP%E5%A4%8720001316%E5%8F%B7">
          <span>
            <img
              class="img-center"
              src="https://s10.mogucdn.com/mlcdn/c45406/190515_0gei4681dhlh0cf9ch0g33j97d88l_20x20.png"
              alt="备案号"
            />
            吉ICP备20001316号
          </span>
        </a>
      </p>
      
    </div>
  </div>

</template>

<script>
  import ItemTitle from "@/components/ItemTitle.vue";

  export default {
    name: "BottomBar",
    props: {
      funObj: Array
    },
    components: {
      ItemTitle
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
      onChange(index) {
        this.active = index;
      },
    },
  };
</script>
<style scope lang="less">
  .bottombar p {
    line-height: 10px;
    font-size: 13px;
  }
  .bottombar{
    text-align: left;
    color:#333;
  }
  .beian{
    background-color: #000;
    font-size: 12px;
    color: #fff;
    padding: 1px 0;
    text-align: center;
  }
  .copyright{
    line-height: 0px;
  }
  .img-center{
    vertical-align:text-bottom;
  }
  .gongan{
    line-height: 0;
    margin-bottom: 5px;
  }
  .icon{
    margin: 0 5px 0 10px;
    vertical-align: bottom;
  }
</style>
