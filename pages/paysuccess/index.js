// pages/paysuccess/index.js
import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_id:'',
    order_id:'',
    meal_code:'',
    cash:'',
    hb:false,
    oldPage:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      oldPage:options.oldPage
    })
    this.data.activity_id = options.activity_id
    this.data.order_id = options.id
    this.data.cash = options.cash;
    this.getMmealCode();
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
  lqhb(){
    this.setData({
      hb:true
    })
  },
  sub(){
    wx.reLaunch({
      url: '/pages/wddd/index',
    })
  },
  getMmealCode(){
    var that = this;
    ajax(total.config.getActive,'GET',{
      token:wx.getStorageSync('token'),
      order_index:that.data.order_id
    },res=>{
       that.setData({
        meal_code:res.data.meal_code,
        cash: res.data.cash,     
        activity_id:res.data.activity_id
       })
    })
  },
  //收下红包
  accept(){
    let that = this;
    ajax(total.config.addUserCash, 'GET', {
      token: wx.getStorageSync("token"),
      activity_id: this.data.activity_id,
      order_id: this.data.order_id,
      cash: this.data.cash
    }, res => {
      if (res.success) {
        total.util.showText(res.msg)
        setTimeout(function(){
          wx.redirectTo({
            url: '/pages/home/index'
          })
        },500)
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  //取消
  qx(){
    this.setData({
      hb:false
    })
  }
})