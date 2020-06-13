import req from '../fetch/index.js'

const config = {
  changeStoreCode: {
    url: '/app/clientInformation/updateClientInvite',
    method: 'post'
  },
  // 保存个人信息接口
  getUserInfo: {
    url: 'app/userInformation/getUser',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
