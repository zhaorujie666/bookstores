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
    url: '/pc/slideshowHome/listSlideshowHome',
    method: 'post'
  },
  getCommSelectData: {
    url: '/pc/slideshowHome/listGoods',
    method: 'post'
  },
  addSliderPic: {
    url: '/pc/slideshowHome/addSlideshowHome',
    method: 'post'
  },
  deleteSliderPic: {
    url: '/pc/slideshowHome/deleteSlideshowHome',
    method: 'post'
  },
  updateSliderState: {
    url: '/pc/slideshowHome/updateSlideshowHomeState',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
