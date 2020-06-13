import req from '../fetch/index.js'

const config = {
  getEvaluate: {
    url: '/app/clientOrder/listGoodsForEvaluate',
    method: 'post'
  },
  addEvaluate: {
    url: '/app/clientOrder/addGoodsEvaluate',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
