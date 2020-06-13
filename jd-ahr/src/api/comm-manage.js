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
  getTableData: {
    url: '/pc/goods/listGoods',
    method: 'post'
  },
  getClassifyList: {
    url: '/pc/goods/listGoodsClassify',
    method: 'post'
  },
  addGoods: {
    url: '/pc/goods/addGoods',
    method: 'post'
  },
  getGoods: {
    url: '/pc/goods/getGoods',
    method: 'post'
  },
  updateGoods: {
    url: '/pc/goods/updateGoods',
    method: 'post'
  },
  deleteGoods: {
    url: '/pc/goods/deleteGoods',
    method: 'post'
  },
  updateGoodsStatus: {
    url: '/pc/goods/updateGoodsShelfState',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
