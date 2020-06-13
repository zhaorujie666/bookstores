import req from '../fetch/index.js'

const config = {
  getClientDetail: {
    url: '/app/clientOrder/listOrderDeepen',
    method: 'post'
  },
  getShopDetail: {
    url: '/app/managerOrder/listManagerOrderDeepen',
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
