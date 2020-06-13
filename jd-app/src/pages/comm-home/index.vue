<template>
  <div class="container">
    <div class="banner-pic-list">
      <el-carousel height="200px" indicator-position="none">
        <el-carousel-item v-for="(item, index) in slideshowList" :key="index">
          <img :src="item.slideshowPath" alt="" @click="toDetailPage(item)">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="module-title">热门商品</div>

    <ul class="comm-list">
      <li
        v-for="(item, index) in commList"
        :key="index"
        @click="toDetailPage(item)">
        <img :src="item.goodsImagePath" alt="">
        <div class="book-info">{{item.goodsName}}</div>
        <div>￥{{item.goodsPrice}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-home.js'

export default {
  name: 'comm-home',
  data () {
    return {
      slideshowList: [],
      commList: []
    }
  },
  mounted () {
    this.getSliderPicList()
    this.getHotComm()
  },
  methods: {
    getSliderPicList () {
      req('getSliderPicList', {}).then(data => {
        this.slideshowList = data.data.slideshowList
      })
    },
    getHotComm () {
      req('getHotComm', {}).then(data => {
        this.commList = data.data.list
        console.log(data)
      })
    },
    toDetailPage (data) {
      sessionStorage.setItem('currentComm', JSON.stringify(data))

      this.$router.push({path: '/comm-detail'})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #ddd;
}

.el-carousel {
  .el-carousel__container {
    .el-carousel__item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.module-title {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  background: #ddd;
  margin-top: 10px;
}

.comm-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  // margin-top: 10px;

  li {
    position: relative;
    width: 48%;
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
    margin: 5px 1%;
    border-radius: 10px;

    img {
      width: 100%;
      height: 170px;
    }

    div:nth-child(2) {
      font-size: 12px;
      padding-left: 10px;
    }

    div:nth-child(3) {
      font-size: 12px;
      text-align: center;
      margin-top: 10px;
      color: red;
    }
  }
}
</style>
