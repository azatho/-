import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cdn: total.config.cdnHost,
    OrderList:[]
  },
  //购物车列表
  getMyOrderList() {
    let that = this;
    ajax(total.config.getMyOrderList, 'GET', {
      token: wx.getStorageSync("token")
    }, res => {
      if (res.success) {
        console.log(res);
        for (let i = 0; i < res.data.length;i++){
          res.data[i].mer_order_time = total.util.formatTime1(total.util.formatTime1(Number(res.data[i].mer_order_time) * 1000));
        }
        that.setData({
          OrderList: res.data
        })
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyOrderList();
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
  charge(e){
    console.log(e);
  },
  ddxq(e){
    //console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/ddxq/index?id=' + e.currentTarget.dataset.id,
    })
  },
})