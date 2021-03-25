<template>
  <h3 class="item-title">
    <span class="left left-text">{{title}}</span>
    <a v-if="needMore" :href="href" class="right right-more">更多
      <van-icon name="arrow" class="arrow" />
    </a>
  </h3>

</template>

<script>
  export default {
    name: "ItemTitle",
    props: {
      title: String,
      needMore: Boolean,
      href: String
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
    },
  };
</script>
<style lang="less" scope>
  .item-title {
    border-bottom: 1px solid #e50021;
    overflow: hidden;
    margin: 10px 0;
    font-size: 13px;
  }

  .left-text {
    background-color: #e50021;
    color: #fff;
    padding: 7px 10px;
    margin: 0;
  }

  .right-more {
    color: #666666;
    margin-top: 12px;
    font-weight: normal;
    font-size: 12px;
    margin-right: 5px;
  }

  .right-more .arrow {
    vertical-align: middle;
    margin-top: -3px;
  }

</style>
