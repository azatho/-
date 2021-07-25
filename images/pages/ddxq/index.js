import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cdn: total.config.cdnHost,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id);
    this.getOrderInfo(options.id);
  },
  //订单详情
  getOrderInfo(mer_order_index) {
    let that = this;
    ajax(total.config.getOrderInfo, 'GET', {
      token: wx.getStorageSync("token"),
      mer_order_index: mer_order_index
    }, res => {
      if (res.success) {
       
        res.data.mer_order_time = res.data.mer_order_time=="0"?0:total.util.formatTime1(Number(res.data.mer_order_time) * 1000);
        res.data.mer_payment_time = res.data.mer_payment_time == "0" ? 0 : total.util.formatTime1(Number(res.data.mer_payment_time) * 1000);
        res.data.out_meal_time = res.data.out_meal_time == "0" ? 0 : total.util.formatTime1(Number(res.data.out_meal_time) * 1000);
        res.data.complete_time = res.data.complete_time == "0" ? 0 : total.util.formatTime1(Number(res.data.complete_time) * 1000);
        console.log(res);
        that.setData({
          OrderInfo: res.data,
          OrderList: res.data.dishes
        })
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})