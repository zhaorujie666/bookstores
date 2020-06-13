import req from '../fetch/index.js'

const config = {
  getShopData: {
    url: '/app/clientShopCart/listShoppingCarts',
    method: 'post'
  },
  addOrder: {
    url: '/app/clientOrder/addOrder',
    method: 'post'
  },
  updateShopCar: {
    url: '/app/clientShopCart/updateShoppingCart',
    method: 'post'
  },
  deleteShopCar: {
    url: '/app/clientShopCart/deleteShoppingCart',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
