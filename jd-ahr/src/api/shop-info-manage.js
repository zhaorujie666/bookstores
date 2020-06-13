import req from '../fetch/index.js'

const config = {
  getTableData: {
    url: '/pc/store/listStores',
    method: 'post'
  },
  getAreaData: {
    url: '/pc/selectCombox/listArea',
    method: 'post'
  },
  addShop: {
    url: '/pc/store/addStore',
    method: 'post'
  },
  getShop: {
    url: '/pc/store/getStore',
    method: 'post'
  },
  updateShop: {
    url: '/pc/store/updateStore',
    method: 'post'
  },
  deleteShop: {
    url: '/pc/store/deleteStore',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
