const url = require('./config.js').host;
const ajax0 = (lb, method, data, fun, loading, domain) => {
  if (loading) wx.showLoading({ title: '网络加载...', mask: true })
  let token = false
  if (wx.getStorageSync('userinfo')) {
    try {
      token = wx.getStorageSync('userinfo').token;
    } catch (e) { console.log('获取数据失败')}
  }
  let header = header = {
    'content-type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  };
  if (token) {
    header.token = token
  }
  wx.request({
    url: `${domain}${lb}`,
    method: method,
    data: data,
    header: header,
    success: function (res) {
      fun(res.data, res)
    },
    fail: function () {
      wx.showToast({
        title: '网络错误',
        mask: true,
        icon: 'loading',
      })
    },
    complete: function (res) {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      if (loading) wx.hideLoading()
    }
  })
}
const ajax = (lb, method, data, fun, loading) => {
  ajax0(lb, method, data, fun, loading, url)
}

module.exports = {
  ajax:ajax
}