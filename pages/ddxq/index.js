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
    state:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
        that.setData({
          OrderInfo: res.data,
          OrderList: res.data.dishes,
          state: res.data.mer_status
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

  },
  //立即支付
  go_pay(e){
     wx.navigateTo({
       url: '/pages/qrzf/index?order_id='+e.currentTarget.dataset.item.mer_order_index+"&cart_order=1&money="+e.currentTarget.dataset.item.mer_order_price,
     })
  },
  //立即出餐
  go_meal(e){
    let that = this;
    ajax(total.config.editEatLater, 'GET', {
      token: wx.getStorageSync("token"),
      order_id: e.currentTarget.dataset.item.mer_order_index,
      number: e.currentTarget.dataset.item.number
    }, res => {
      if (res.success) {
        total.util.showText(res.msg) 
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  //立即评价
  evaluation(){
     wx.navigateTo({
       url: '/pages/fbpl/index?mer_order_index=' + this.data.OrderInfo.mer_order_index,
     })
  }
})