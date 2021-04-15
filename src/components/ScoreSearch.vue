<template>
    <div class="box">
      <van-form @submit="onSubmit">
        <van-field
          v-model="name"
          name="用户名"
          placeholder="请输入姓名"
          :rules="[{ required: true}]"
        />
        <van-field
          v-model="number"
          name="密码"
          placeholder="请输入身份证号码"
          :rules="[{ required: true}]"
        />
        <div style="margin: 16px;">
          <van-button type="danger" size="small" block icon="search">查询</van-button>
        </div>
      </van-form>

      <div class="result-box">

        <div class="matchs" v-for="(item, index) in searchResult" :key="index">
           <a class="result-match" :href="`/ScoreDetail?userId=${item.userId}&matchId=${item.matchId}&projectId=${item.projectId}`">
            <span class="name">{{item.matchName}}</span>
            <span class="go">查看详情</span>
          </a>
          <table class="result-list">
            <tr class="result-item">
              <td class="td-title">姓名：</td>
              <td class="td-value">{{item.name}}</td>
            </tr>
            <tr>
              <td class="td-title">性别：</td>
              <td class="td-value">{{item.sex ===1? '男':'女'}}</td>
            </tr>
            <tr>
              <td class="td-title">参赛项目：</td>
              <td class="td-value">{{item.projectName}}</td>
            </tr>
            <tr>
              <td class="td-title">参赛号码：</td>
              <td class="td-value">{{item.projectNumber}}</td>
            </tr>
            <tr>
              <td class="td-title">赛事类型： </td>
              <td class="td-value">{{item.regular === 1 ? '标准' : '非标准'}}</td>
            </tr>
            <tr>
              <td class="td-title">个人净成绩：</td>
              <td class="td-value">{{item.personalNetScore}}</td>
            </tr>
            <tr>
              <td class="td-title">个人排名：</td>
              <td class="td-value">{{item.allnetranking}}</td>
            </tr>
            <tr>
              <td class="td-title"></td>
              <td class="td-value">
                <van-button type="primary" size="mini" 
                :url="`/ScoreDetail?userId=${item.userId}&matchId=${item.matchId}&projectId=${item.projectId}`">
                查看详情
                </van-button>
              </td>
            </tr>
          </table>
        </div>
        
        <div class="result-end" v-if="searchResult.length>0">
          --------------  . 疯马体育 .  -------------
        </div>

      </div>


    </div>
</template>

<script>
  import { fetchHttp } from "@/util/fn.js";

  import {
    Button,
    Toast
  } from "vant";

  export default {
    name: "ApplySearch",
    components: {
      [Button.name]: Button
    },
    props:{
      submitUrl: String,
      defaultName: String,
      defaultNumber: String
    },
    data() {
      return {
        title: '成绩查询',
        searchResult: [],
        name: this.defaultName || '',//伍靖
        number: this.defaultNumber || '',//360430199409050330
      };
    },
    computed: {
    },
    mounted() {
      
    },
    methods: {
      onSubmit() {
        if(this.submitUrl){
          this.$router.push({
          　　path: this.submitUrl,
          　　query: {
          　　　 name: this.name,
                number: this.number
          　　}
          });
          return;
        }
        if (this.name && this.number) {
          fetchHttp('marathon/result/informationList', { name: this.name, number: this.number }, 'GET').then(
            res => {
              if (res && res.code === 0) {
                if (res.data && res.data.length > 0) {
                  this.searchResult = res.data;
                } else {
                  this.searchResult = [];
                    // showNotification('error', '提示', '没有搜索到相关报名信息');
                    Toast.fail('没有搜索到相关报名信息');
                }
              }
            }
          );
        } else {
            //   showNotification('error', '提示', '请输入姓名/身份证号码来查询！');
            Toast.fail('没有搜索到相关报名信息');
        }
      }
    }
  };
</script>
<style scope lang="less">
  .home {
    text-align: center;
  }
  .matchs{
    margin-top:15px;
  }
  .result-box{
    padding-bottom: 20px;
  }
  .result-match{
    padding:5px 10px;
    font-size: 14px;
    color:#ee0a24;
    overflow:hidden;
    display: flex;
    .name{
      flex:1;
    }
    .go{
       width: 50px;
      text-align: right;
     
      font-size: 12px;
      color:#ee0a24;
      vertical-align: bottom;
    }
  }
  .result-list{
    width:100%;
    font-size:12px;
    color:#444;
    border-top:1px solid #efefef;
    // line-height: 28px;
    td{
      height:28px;
    }
    .td-title{
      width:90px;
      text-align: right;
      border-bottom:1px solid #efefef;
    }
    .td-value{
      // width:70%;
      text-align: left;
      border-bottom:1px solid #efefef;
    }
  }

  .result-end{
    color: #bbb;
    text-align: center;
    padding: 15px 0;
    font-size:12px;
  }
</style>
