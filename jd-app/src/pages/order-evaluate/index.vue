<template>
  <div class="container">
    <div class="comm" v-for="(item, index) in evaluateList" :key="index">
      <div class="pic-info">
        <img :src="item.goodsImagePath" alt="">

        <div class="star">
          <el-rate v-model="item.evaluateScore"></el-rate>
        </div>
      </div>

      <div class="eva-box">
        <div class="title">分享你的使用体验吧</div>

        <el-input v-model="item.evaluateContent" style="display: block;width:95%;margin: 0 auto;" type="textarea" :rows="5"></el-input>
      </div>
    </div>
    <!-- <div class="comm" v-for="(item, index) in evaluateList" :key="index">
      <div class="pic-info">
        <img :src="item.goodsImagePath" alt="">

        <div class="star" :style="{backgroundPosition: `${180 - 5 * 36}px 0`}"></div>
      </div>

      <div class="eva-box">
        <div class="title">分享你的使用体验吧</div>

        <el-input style="display: block;width:95%;margin: 0 auto;" type="textarea" :rows="5"></el-input>
      </div>
    </div> -->

    <el-button class="submit-btn" type="primary" @click="addEvaluate">提交</el-button>
  </div>
</template>

<script>
import req from '@/api/order-evaluate.js'
import axios from 'axios'
// const qs = require('qs')

export default {
  name: 'order-evaluate',
  data () {
    return {
      evaluateList: []
    }
  },
  rules: {
    evaluateScore: [
      {required: true, message: '评价等级不能为空', trigger: 'change'}
    ]
  },
  mounted () {
    console.log(this.$route.query)
    this.getEvaluate()
  },
  methods: {
    getEvaluate () {
      req('getEvaluate', {orderId: this.$route.query.orderId}).then(data => {
        this.evaluateList = data.data.goodsList
      })
    },
    addEvaluate () {
      axios({
        method: 'post',
        url: process.env.BASE_API + '/app/clientOrder/addGoodsEvaluate',
        data: JSON.stringify({
          orderId: this.$route.query.orderId,
          evaluateList: this.evaluateList.map(item => {
            return Object.assign({}, {goodsId: item.goodsId, evaluateContent: item.evaluateContent, evaluateScore: item.evaluateScore})
          })
        }),
        headers: {
          'Content-Type': 'application/json;',
          Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('userInfo')).access_token
        }
      }).then(data => {
        if (data.data.code === 0) {
          this.$message.success(data.data.msg)

          this.$router.push({path: '/order-list'})
        } else {
          this.$message.error(data.data.msg)
        }
      })
      // req('addEvaluate', {
      //   orderId: this.$route.query.orderId,
      //   evaluateList: this.evaluateList.map(item => {
      //     return Object.assign({}, {goodsId: item.goodsId, evaluateContent: item.evaluateContent, evaluateScore: '5'})
      //   })
      // }).then(data => {

      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #fff;

  .comm {
    width: 100%;
    // height: 200px;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    padding: 10px 10px 0;
    box-sizing: border-box;
    background: #fff;

    .pic-info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 150px;
        height: 150px;
      }

      .star {
        width: 180px;
        height: 36px;
        position: relative;
        left: -20px;
        // background: url('../../assets/stars.png');
        // background-repeat: no-repeat;
        // background-size: 100% 100%;

        /deep/ .el-rate__item {
          .el-rate__icon {
            font-size: 25px;
          }
        }
      }
    }

    .eva-box {
      width: 100%;
      .title {
        padding-left: 10px;
        line-height: 40px;
      }
    }
  }

  .submit-btn {
    display: block;
    width: 95%;
    margin: 10px auto 0;
    height: 40px;
    line-height: 40px;
  }
}
</style>
