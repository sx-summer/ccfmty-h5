<template>
  <div>

    <ul class="logo-list">
      <li class="logo-item" v-for="(item, index) in logoList" :key="index">
        <a :href="item.url">
          <img :src="item.imageUrl" alt="赞助商">
        </a>
      </li>
    </ul>
  </div>

</template>

<script>
  import { Toast } from "vant";
  // import ItemTitle from "@/components/ItemTitle.vue";


  export default {
    name: "FunctionBar",
    props: {
      logoList: Array
    },
    components: {
      // [Tabbar.name]: Tabbar,
    },
    data() {
      return {
      };
    },
    computed: {
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
.logo-list{
  clear:both;
  width:100%;
  overflow:hidden;
  _zoom:1;
}
.logo-item{
  float:left;
  width:33.3%;  //33% 50%
  
  // border:1px solid #efefef;
  padding:10px;
  // margin:10px;
  img{
    width:100%;
    height:42px;  //42 96
  }
}
</style>
