
import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'
// pages/yejlxq/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{
      amount:0,//金额
      type_name:'',//变更类型
      later:0,//余额
      type:'',//变更类型
      time:'',//余额变更时间
      order_id:'',//订单号
    }//余额详情信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    let that = this;
    ajax(total.config.getMyBalanceInfo, 'GET', {
      token: wx.getStorageSync("token"),
      id:options.id
    }, res => {
      if (res.success) {
        res.data.time=total.util.formatTime1(res.data.time*1000)
        that.setData({
          info:res.data
        })
      } else {
        total.util.showText(res.msg)
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