import req from '../fetch/index.js'

const config = {
  getOrderList: {
    url: '/app/clientOrder/listOrder',
    method: 'post'
  },
  getShopOrderList: {
    url: '/app/managerOrder/listManagerOrders',
    method: 'post'
  },
  changeOrderStatus: {
    url: '/app/clientOrder/updateOrderState',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
