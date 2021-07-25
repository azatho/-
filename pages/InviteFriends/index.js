// pages/InviteFriends/index.js
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
    canvasW:"",
    canvasH:"",
    cdn: total.config.cdnHost,
    dataList:{},
    lng:'',  //经度
    lat:'', //纬度
    address:'',
    canvasHidden: true,     //设置画板的显示与隐藏，画板不隐藏会影响页面正常显示
    wxappName: '页面生成图片',    //小程序名称
    shareImgPath: '',
    screenWidth: '',       //设备屏幕宽度
    shareImgSrc: '',
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax(total.config.invitation, 'GET', {
      token: wx.getStorageSync("token"),
      subscribe_id : options.id
    }, res => {
      if (res.success) {
        res.data.list.subscribe_datetime=total.util.formatTime2((res.data.list.subscribe_datetime)*1000)
        this.setData({
          dataList:res.data.list,
          lng:res.data.list.merchant_longitude,  //经度
          lat:res.data.list.merchant_latitude, //纬度
          address:res.data.list.merchant_address
        })
      }else{
        total.util.showText(res.msg)
      }
    })
  },
  goAddress(){
    wx.openLocation({
      latitude: Number(this.data.lat),
      longitude: Number(this.data.lng),
      scale: 18,
      address: (this.data.address)
    });
  },
  /**生命周期函数--监听页面初次渲染完成*/
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