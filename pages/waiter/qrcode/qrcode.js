// pages/index/qrcode/qrcode.js
import total from '../../../js/total.js'
import {
  ajax
} from '../../../js/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      CDN:total.config.cdnHost,
      obj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.init(options.mer_order_index);
  },
    init(mer_order_index){
      ajax(total.config.getMoney,'GET',{
        token:wx.getStorageSync('token'),
        mer_order_index:mer_order_index
      },res=>{
        if(res.success){
          this.setData({
            obj:res.data
          });
        }else{

        }
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

  }
})