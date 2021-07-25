//index.js
//获取应用实例
import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
     photo:'',
     user_name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      this.setData({
        photo:options.photo,
        user_name:options.user_name
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  paypsd(){
    wx.navigateTo({
      url: '/pages/zfmmSetting/index',
    })
  },
  outlogin(){
    ajax(total.config.loginOut, 'GET', {
      token: wx.getStorageSync("token")
    }, res => {
      if (res.success) {
        total.util.showText(res.msg)
        wx.clearStorage()
        setTimeout(function(){
          wx.navigateBack({
            delta: 1,
          })
        },2000)
      } else {
        total.util.showText(res.msg)
      }
    })
  }
})