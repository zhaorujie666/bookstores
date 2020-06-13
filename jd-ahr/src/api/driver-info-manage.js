import req from '../fetch/index.js'

const config = {
  getTableData: {
    url: '/pc/driver/listDrivers',
    method: 'post'
  },
  getAreaData: {
    url: '/pc/selectCombox/listArea',
    method: 'post'
  },
  addDriver: {
    url: '/pc/driver/addDriver',
    method: 'post'
  },
  getDriver: {
    url: '/pc/driver/getDriver',
    method: 'post'
  },
  updateDriver: {
    url: '/pc/driver/updateDriver',
    method: 'post'
  },
  deleteDriver: {
    url: '/pc/driver/deleteDriver',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
