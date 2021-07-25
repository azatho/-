import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: "3",
    emptyType: 0,
    loadingTransparent: true,
    list3: [
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      this.getMyCommonList()
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
     setTimeout(function(){
       wx.stopPullDownRefresh();
       console.log("stop");
     },3000);
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

   // 获取我的评价
getMyCommonList(){
    let that = this;
    ajax(total.config.getMyCommonList, 'GET', {
      token: wx.getStorageSync("token"),
    }, res => {
      if (res.success) {
         console.log(res.data)
         that.setData({
          list3:res.data
         }) 
      } else {
        total.util.showText(res.msg)
      }
    })
   } 
})