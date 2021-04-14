<template>
  <div class="gameSignUp">
    <HeadBar title="报名" />
    <div class="gameSignUpInfo">
      <h3 class="signUpTitle">{{matchName}}</h3>
      <div class="signUpForm">
        <van-form @submit="onSubmit">
          <!-- 姓名 -->
          <van-field v-model="username" name="真实姓名" label="真实姓名" placeholder="真实姓名" :rules="[{ required: true, message: '请填写真实姓名' }]" />
          <!-- 性别 -->
          <van-field name="radio" label="单选框">
            <template #input>
              <van-radio-group v-model="radio" direction="horizontal">
                <van-radio name="1">单选框 1</van-radio>
                <van-radio name="2">单选框 2</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 血型 -->
          <van-field readonly clickable name="picker" :value="value" label="选择器" placeholder="点击选择城市" @click="showPicker = true" />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
          </van-popup>
          <!-- 地址选择 -->
          <van-field readonly clickable name="area" :value="address" label="地区选择" placeholder="点击选择省市区" @click="showArea = true" />
          <van-popup v-model="showArea" position="bottom">
            <van-area :area-list="areaList" @confirm="onConfirmAddress" @cancel="showArea = false" />
          </van-popup>
          <van-field name="uploader" label="文件上传">
            <template #input>
              <van-uploader v-model="uploader" />
            </template>
          </van-field>
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
  import HeadBar from "@/components/HeadBar.vue";
  import { areaList } from '@vant/area-data';
  import { getQueryString, fetchHttp, formatTime } from "@/util/fn.js";
  
console.log(1111,areaList);
  import {
    Toast,
    Button,
    Form,
    Field,
    Radio,
    RadioGroup,
    Popup,
    Picker,
    Area,
    Uploader
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
      [Popup.name]: Popup,
      [Picker.name]: Picker,
      [Area.name]: Area,
      [Uploader.name]: Uploader
    },
    data() {
      return {
        matchName: '',
        username: '',
        radio: '',
        columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        showPicker: false,
        value: '',
        address: '',
        showArea: false,
        areaList,
        uploader: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],
      };
    },
    computed: {
    },
    mounted() {
      //获取赛事详情
      this.getGameDetail();
    },
    methods: {
      onConfirmAddress(values) {
      this.address = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/');
      this.showArea = false;
    },
      onConfirm(value) {
        this.value = value;
        this.showPicker = false;
      },
      onSubmit(values) {
        console.log(values)
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
      }
    }
  };
</script>
<style scope lang="less">
  .gameSignUp {
    color: #333333;
  }

  .signUpTitle {
    border-bottom: 2px solid #ddd;
    padding: 0 10px 10px 10px;
    font-size: 16px;
  }

</style>
