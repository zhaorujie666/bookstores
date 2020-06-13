
import req from '../fetch/index.js'

const config = {
  // portExport: {
  //   url: '/api/media/stimulate/exportExcel',
  //   method: 'post',
  //   fileConfig: {
  //     type: 'file',
  //     fileName: '销售激励报表'
  //   }
  // },
  getDetail: {
    url: '/app/clientGoods/getGoods',
    method: 'post'
  },
  payNow: {
    url: '/app/clientOrder/addOrder',
    method: 'post'
  },
  addShopCar: {
    url: '/app/clientShopCart/addShoppingCart',
    method: 'post'
  },
  // 查询商品评价接口
  getCommEvaluates: {
    url: '/app/clientGoods/listGoodsEvaluates',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
