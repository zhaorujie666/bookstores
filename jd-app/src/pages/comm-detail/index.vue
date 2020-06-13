<template>
  <div class="container">
    <div class="book-banner">
      <img :src="commDetailData.goodsImagePath" alt="">
    </div>

    <div class="book-detail">
      <div class="book-price">￥{{commDetailData.goodsPrice}}</div>
      <!-- <div class="book-name">{{commDetailData.goodsName}}</div> -->
      <div class="book-Describe">{{commDetailData.goodsDescribe}}</div>
      <div class="comm-evaluate">
        商品评分:
        <el-rate class="evaluate" v-model="commDetailData.goodsEvaluateScore" disabled></el-rate>
        <!-- <span>{{commDetailData.goodsEvaluateScore}}</span> -->
        <span>{{commDetailData.goodsEvaluateScoreString}}</span>
        分
      </div>
      <div class="count-box">
        <span>数量</span>

        <div class="handler-box">
          <div @click="countDelete">-</div>
          <div>{{bookCount}}</div>
          <div @click="countAdd">+</div>
        </div>
      </div>
      <div class="goods-sales">
        <span>销售量：</span>
        <span>{{commDetailData.goodsSales}}</span>
      </div>
      <div class="address">
        <span>送至</span>
        <span class="iconfont iconhtmal5icon14"></span>
        <span>{{storeName}}</span>
      </div>
    </div>

    <div class="footer">
      <div @click="toShopCar">
        <img src="../../assets/shop_car2.png" alt="">
        <span>购物车</span>
      </div>

      <div @click="addShopCar">加入购物车</div>
      <div @click="payNow">立即购买</div>
    </div>
  </div>
</template>

<script>
import req from '@/api/comm-detail.js'

export default {
  name: 'comm-detail',
  data () {
    return {
      commDetailData: {
        goodsName: '',
        isbn: '',
        goodsDescribe: '',
        goodsPrice: '',
        goodsImagePath: '',
        goodsEvaluateScore: 0,
        goodsAuthor: '',
        goodsPress: '',
        goodsId: '',
        version: '2',
        goodsSales: 0
      },
      bookCount: 1,
      address: '新华书店（新街口店）'
    }
  },
  computed: {
    storeName () {
      return JSON.parse(sessionStorage.getItem('roleInfo')).storeName
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    countDelete () {
      if (this.bookCount > 1) {
        this.bookCount--
      }
    },
    countAdd () {
      this.bookCount++
    },
    getDetail () {
      req('getDetail', {goodsId: JSON.parse(sessionStorage.getItem('currentComm')).goodsId}).then(data => {
        this.commDetailData = Object.assign({}, data.data, {
          goodsEvaluateScore: Number(data.data.goodsEvaluateScore),
          goodsEvaluateScoreString: data.data.goodsEvaluateScore
        })
      })
    },
    toShopCar () {
      this.$router.push({path: '/shop-car'})
    },
    payNow () {
      this.$confirm('确定立即购买该商品吗?').then(() => {
        req('payNow', {
          goodsId: this.commDetailData.goodsId,
          clientGoodsNum: this.bookCount,
          goodsPrice: this.commDetailData.goodsPrice,
          shopCartId: '0',
          storeId: JSON.parse(sessionStorage.getItem('roleInfo')).storeId
        }).then(data => {
          if (data.code === 0) {
            this.$message.success(data.msg)

            this.$router.push({path: '/order-list'})
          } else {
            this.$message.error(data.msg)
            this.$router.push('/change-store-code')
          }
        })
      })
    },
    addShopCar () {
      req('addShopCar', {goodsId: this.commDetailData.goodsId, cartGoodsCount: this.bookCount}).then(data => {
        if (data.code === 0) {
          this.$message.success(data.msg)

          // this.$router.push({path: '/shop-car'})
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #ddd;
}

.book-banner {
  width: 100%;
  height: 300px;
  padding: 10px;
  background: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-sizing: border-box;

  img {
    display: block;
    width: 80%;
    height: 100%;
    margin: 0 auto;
  }
}

.book-detail {
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  margin-top: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  margin: 10px auto 0;

  .book-price {
    font-size: 22px;
    color: red;
  }

  // .book-name {
  //   font-size: 18px;
  //   line-height: 30px;
  // }

  .comm-evaluate {
    margin-top: 10px;
    .evaluate{
      display: inline-block;
      margin-left: 5px;
      margin-top: 5px;
    }
    span {
      color: red;
      font-size: 15px;
    }
  }

  .book-Describe {
    font-size: 14px;
    color: #333;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }

  .count-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;

    .handler-box {
      display: flex;
      height: 30px;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-top: 10px;

      div:first-child {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }

      div:nth-child(2) {
        width: 40px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
      }

      div:nth-child(3) {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }
    }
  }
  .goods-sales{
    margin-top: 5px;
  }
  .address {
    margin-top: 10px;

    .iconhtmal5icon14 {
      color: #ddd;
    }
  }
}

.footer {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  background: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  align-items: center;

   div:first-child {
    width: 50px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 12px;

    img {
      width: 25px;
      height: 25px;
    }
  }

  div:nth-child(2) {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid rgb(197, 156, 104);
    background: #fff;
    border-radius: 10px;
    margin-left: 10px;
  }

  div:nth-child(3) {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: rgb(197, 156, 104);
    color: #fff;
    border-radius: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
