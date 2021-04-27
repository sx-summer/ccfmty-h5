<template>
  <div class="gameSignUp">
    <HeadBar title="报名" />
    <div class="gameSignUpInfo">
      <div class="game-card">
        <h3 class="signUpTitle">{{matchName}}</h3>
      </div>
      

      <div class="signUpForm">
        <van-form @submit="onSubmit">

          <!-- 姓名 -->
          <van-field v-model="form.name" name="name" label="真实姓名" placeholder="真实姓名" :rules="[{ required: true, message: '请填写真实姓名' }]" />
          <!-- 性别 -->
          <van-field name="sex" label="性别">
            <template #input>
              <van-radio-group v-model="form.sex" direction="horizontal">
                <van-radio name="1" value="1">男</van-radio>
                <van-radio name="2" value="2">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 血型 -->
          <van-field readonly clickable name="bloodType" label="血型" placeholder="点击选择血型" 
          v-model="form.bloodType" @click="showBloodType = true" />
          <van-popup v-model="showBloodType" position="bottom"> 
            <van-picker show-toolbar :columns="bloodTypeArr" @confirm="onBloodType" @cancel="showBloodType = false" />
          </van-popup>

          <!-- 衣服尺码 -->
          <van-field readonly clickable name="dressSize" label="衣服尺码" placeholder="点击选择衣服尺码"
          v-model="form.dressSize" @click="showDressSize = true" />
          <van-popup v-model="showDressSize" position="bottom">
            <van-picker show-toolbar :columns="dressSizeArr" @confirm="onDressSize" @cancel="showDressSize = false" />
          </van-popup>

          <!-- 证件类型 -->
          <van-field readonly clickable name="type" label="证件类型" placeholder="点击选择证件类型" 
          v-model="form.type"  @click="showType = true" />
          <van-popup v-model="showType" position="bottom">
            <van-picker show-toolbar :columns="typeArr" @confirm="onType" @cancel="showType = false" />
          </van-popup>

          <!-- 证件号码 -->
          <van-field v-model="form.number" name="number" label="证件号码" placeholder="证件号码" :rules="[{ required: true, message: '请填写证件号码' }]" />
          <!-- 手机号码 -->
          <van-field v-model="form.tel" name="tel" label="手机号码" placeholder="手机号码" :rules="[{ required: true, message: '请填写手机号码' }]" />
          <!-- 紧急联系人 -->
          <van-field v-model="form.contactsName" name="contactsName" label="紧急联系人" placeholder="紧急联系人" :rules="[{ required: true, message: '请填写紧急联系人' }]" />
          <!-- 紧急联系人电话 -->
          <van-field v-model="form.contactsTel" name="contactsTel" label="紧急联系人电话" placeholder="紧急联系人电话" :rules="[{ required: true, message: '请填写紧急联系人电话' }]" />

          <!-- 快递邮寄地址（省市区） -->
          <van-field readonly clickable name="area" label="地区选择" placeholder="点击选择省市区"
          :value="areaString"  @click="showArea = true" />
          <van-popup v-model="showArea" position="bottom">
            <van-area :area-list="areaList" @confirm="onConfirmAddress" @cancel="showArea = false" />
          </van-popup>
          <!--  快递邮寄详细地址-->
          <van-field v-model="form.address" name="address" label="快递邮寄详细地址" placeholder="快递邮寄详细地址" :rules="[{ required: true, message: '快递邮寄详细地址' }]" />
         
          <!-- 完赛证书 -->
          <van-field name="uploader" label="文件上传" >
            <template #input>
              <van-uploader v-model="uploader" />
            </template>
          </van-field>

          <!-- 参赛协议 -->
          <van-field name="agree" label="参赛协议">
            <template #input>
              <van-checkbox v-model="form.agree"  shape="square"></van-checkbox>
              <a class="readAgree" href="javascript:void(0);" @click="showAgree=true">阅读并同意参赛协议</a>
            </template>
          </van-field>

          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>

      <!-- <van-submit-bar :price="showPrice" button-text="提交订单" @submit="onSubmit" native-type="submit"> -->
        <!-- <van-icon name="arrow-down" size="22" @click="onShowPriceDetail"/> -->
        <!-- <template #tip>
          你的收货地址不支持同城送, <span @click="onClickLink">修改地址</span>
        </template> -->
      <!-- </van-submit-bar> -->

      <!-- <van-popup v-model:show="showPriceDetail">price</van-popup> -->
      <!-- 参赛协议dialog -->
      <Agreement @onAgree="onAgree" :show="showAgree"></Agreement>
    </div>
  </div>
</template>

<script>
  import HeadBar from "@/components/HeadBar.vue";
  // import PayType from "@/components/PayType.vue";
  import Agreement from "@/components/Agreement.vue";
  import { areaList } from '@vant/area-data';
  import { getQueryString, fetchHttp, formatTime, getCookie } from "@/util/fn.js";

  import {
    Toast,
    Button,
    Form,
    Field,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Popup,
    Picker,
    Area,
    Uploader,
    SubmitBar,
  } from "vant";

  export default {
    name: "gameSignUp",
    components: {
      HeadBar,
      [Button.name]: Button,
      [Form.name]: Form,
      [Field.name]: Field,
      [Radio.name]: Radio,
      [RadioGroup.name]: RadioGroup,
      [Checkbox.name]: Checkbox,
      [CheckboxGroup.name]: CheckboxGroup,
      [Popup.name]: Popup,
      [Picker.name]: Picker,
      [Area.name]: Area,
      [Uploader.name]: Uploader,
      [SubmitBar.name]: SubmitBar,
      Agreement,
    },
    data() {
      return {
        currentPay:'',  //支付方式
        
        username: '',
        userId: getCookie('USERID'),
        matchName: '',
        matchId: getQueryString('matchId'),
        projectId: getQueryString('projectId'),
        price: getQueryString('price') ,
        showPrice:0,
        matchInfo: {},
     
        areaString:'',  //浙江省/杭州市/西湖区   
        areaList:areaList,
        bloodTypeArr:['A','B','AB','O','其他'],
        dressSizeArr:['S','M','L','XL','2XL','3XL'],
        typeArr:['身份证','护照','其他'],
        showArea: false,
        showBloodType:false,
        showDressSize:false,
        showType:false,

        showPriceDetail: false,
        showAgree:true,

        uploader: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],

        form:{
          name:'',  //真实姓名
          sex: 1,
          bloodType:'', //血型
          dressSize: '',
          type:'',  //证件类型
          number:'',  //身份证号码
          tel:'',
          contactsName:'',
          contactsTel: '',
          nationality: '中国',
          province: "浙江省",
          city: "杭州市",
          county: "西湖区",
          address: "",
          url: "", //完赛证书
          agree: false
        }
      };
    },
    computed: {
    },
    mounted() {
      this.showPrice =  this.price ? parseFloat(this.price) * 100 : 0;
      //获取赛事详情
      this.getGameDetail();
      this.initOrginData();
    },
    methods: {
      onBloodType(value) {
        this.form.bloodType = value;
        this.showBloodType = false;
      },
      onDressSize(value) {
        this.form.dressSize = value;
        this.showDressSize = false;
      },
      onType(value) {
        this.form.type = value;
        this.showType = false;
      },
      
      onConfirmAddress(values) {
        this.areaString = values
          .filter((item) => !!item)
          .map((item) => item.name)
          .join('/');
        console.log(this.areaString);
        
        this.showArea = false;
      },

      //表单验证通过时的提交
      onSubmit(values) {
        console.log(values);
          //校验省市区
        if (this.areaString.length<1) {
          Toast('请正确选择省市区！');
          return;
        }

        if (!this.form.agree) {
          Toast('请仔细阅读并同意参赛协议');
          return;
        }

        var areaArr = this.areaString.split('/');
        //用户id
        // let postData = Object.assign(values, {
        //   matchId: this.matchId,
        //   projectId: this.projectId,
        //   userId: this.userId,

        //   nationality: '中国',
        //   province: areaArr[0],
        //   city: areaArr[1],
        //   county: areaArr[2],
        //   url: values.uploader[0].url,
        //   agree: this.form.agree
        // });

        let postData = Object.assign(this.form, {
          matchId: this.matchId,
          projectId: this.projectId,
          userId: this.userId,

          nationality: '中国',
          province: areaArr[0],
          city: areaArr[1],
          county: areaArr[2],
          // url: values.uploader[0].url
        });

        //校验健康证明
        // if (!postData.url) {
        //   showNotification('error', '提示', '请上传一年内完赛证书！');
        //   return;
        // }
        console.log(postData);
        console.log('提交数据', postData);
        fetchHttp('marathon/signUp/project', postData, 'GET', 'showError').then(res => {
          if (res && res.code === 0) {
            if (res.data) {
              if (!this.price || this.price === '0') {
                Toast.success(
                  '提交成功，请在规定时间内上传完赛证明，否则无法获取证书',
                );
                // 跳转到我的赛事页面
                setTimeout(() => {
                  window.location.href = 'myGame';  //personalSignUp.html
                }, 3000);
              } else {
                Toast.success('提交成功，请尽快付款！');
                // 跳转到我的支付页面
                setTimeout(() => {
                  window.location.href = `pay?id=${res.data}&matchName=${this.matchName}&price=${this.price}`;
                }, 2500);
              }

            } else {
              Toast.fail(res.message);
            }
          }else{
            Toast.fail(res.message);
          }
        });
        
      },
      getGameDetail() {
        let id = getQueryString('matchId');
        if (id) {
          //获取赛事详情
          fetchHttp('marathon/match/getMatchInfo', { id }, 'GET').then(
            res => {
              if (res && res.code === 0) {
                if (res.data && res.data.matchName) {
                  this.matchInfo = res.data;
                  this.matchName = res.data.matchName;
                 
                  console.log(this.matchInfo, this.matchName);
                } else {
                  Toast('没有找到相关赛事!');
                }
              }
            },
          );
        } else {
          Toast('没有找到相关的赛事项目!');
        }
      },
      initOrginData(){
        //获取基本信息
        fetchHttp('marathon/getUserInfo', { id: this.userId }, 'GET').then(res => {
          if (res && res.code === 0) {
            let data = res.data;
            if (data) {
              // let picPath = this.transferUrlToArray(data.url);
              // let originData = Object.assign(data, { picPath });
              this.userName = data.username;
              if(data.province && data.city && data.county){
                this.areaString = data.province+'/'+ data.city+'/'+ data.county;
              }
              // this.showAgree = !data.agree;
              Object.assign(this.form, data);
              console.log('原始数据信息',this.form);
            }
          }
        });
      },
      onFormSubmit(){
        // console.log(this.currentPay);
        this.onSubmit();
      },
     
      onAgree(e){
        this.form.agree = e.agree;
        this.showAgree = false;
      }
    }
  };
</script>
<style scope lang="less">

html, body {
    // height: 100%;
    // overflow: hidden;
}
body{
    position: relative;
}
/*遮罩层显示时body的样式*/
.notScroll {
  overflow: hidden;

}
.game-card{
  background: #fff;
  margin-bottom: 10px;
  padding:10px;
}

  .gameSignUp {
    color: #333333;
    background: #efefef;
  }

  .signUpTitle {
    // border-bottom: 2px solid #ddd;
    padding: 10px 0;
    font-size: 16px;
    margin:0;
  }
  .van-submit-bar{
    border-top: 1px solid #efefef;
  }
  .van-submit-bar__text{
    text-align: left;
  }
  .readAgree{
    margin-left:15px;
    color:#1890ff;

    text-decoration: underline;
  }

</style>
