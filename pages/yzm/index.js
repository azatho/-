import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入框参数设置
    phone:"17638190512",
    ms:"重新获取",
    inputData: {
      input_value: "",//输入框的初始内容
      isNext: true,//设置是否自动清空输入的内容
      get_focus: true,//输入框的聚焦状态
      value_num: [1, 2, 3, 4, 5, 6],//输入框格子数
      height: "60rpx",//输入框高度
      width: "400rpx",//输入框宽度
      see: true,//是否明文展示
    }
  },
  // 当组件输入数字6位数时的自定义函数
  valueSix(e) {
    console.log(e.detail);
    if (e.detail=="123456"){
      //请输入新密码
    }else{
      total.util.showText("密码错误");
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    total.util.topTitle("身份验证");
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