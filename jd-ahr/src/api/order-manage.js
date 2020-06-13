import req from '../fetch/index.js'

const config = {
  getTableData: {
    url: '/pc/order/listOrders',
    method: 'post'
  },
  getOrderDetailData: {
    url: '/pc/order/getListOrder',
    method: 'post'
  },
  updateOrder: {
    url: '/pc/order/updateOrderState',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
