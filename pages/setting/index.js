// pages/setting/index.js
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
    // phoneNum: "",
    number: 0,
    login:false,
    is_server:0,
    userInfo:{
      cash:0.00
    },
    hideShare:false
  },

  submit(event) {
    console.log(event.detail);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  
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
    if (wx.getStorageSync("token")){
     this.setData({
       login:true
     })
      
    }else{
      this.setData({
        login: false
      })
    }
    this.getUserInfo();
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
  //获取用户信息
  getUserInfo() {
    let that = this;
    ajax(total.config.getUserInfo, 'GET', {
      token: wx.getStorageSync("token")
    }, res => {
      if (res.success) {
         that.setData({
          is_server:parseInt(res.data.is_server)
         });
         wx.setStorageSync('is_server',res.data.is_server);
        res.data.phone = res.data.phone.replace(/^(\d{3})\d*(\d{4})$/,'$1****$2');
        res.data.cash = total.util.getFData1000(res.data.cash/100)
        this.setData({
          userInfo: res.data,
          login: true
          
        })
        // console.log(res.data)
      } else {
        this.setData({
          login: false
        })
      }
    })
  },
  login(){
    wx.navigateTo({
      url: '/pages/sqdl/index',
    })
  },
  grxx() {
    var photo = this.data.userInfo.photo;
    var user_name = this.data.userInfo.name;
    wx.navigateTo({
      url: '/pages/grxx/index?photo='+photo+'&user_name='+user_name,
    })
  },
  //帮助点餐
  bzdc(){
     wx.navigateTo({
       url: '/pages/home/index?help=1'
     })
  },
  //顾客订单
  gkdd(){
    wx.navigateTo({
      url:'/pages/waiter/clientOrder/clientOrder'
    })
  },
  charge() {
    wx.navigateTo({
      url: '/pages/charge/index'
    })
  },
  wddd() {
    if(!wx.getStorageSync("token")){
      total.util.showModal()
      return 
    }
    wx.navigateTo({
      url: '/pages/wddd/index',
    })
  },
  wdyy(){
    if(!wx.getStorageSync("token")){
      total.util.showModal()
      return 
    }
    wx.navigateTo({
      url: '/pages/yuyue/index',
    })
  },
  wdpj() {
  if(!wx.getStorageSync("token")){
      total.util.showModal()
      return 
    }
    wx.navigateTo({
      url: '/pages/myComments/index',
    })
  },
  yjfk(){
    if(!wx.getStorageSync("token")){
      total.util.showModal()
      return 
    }
    wx.navigateTo({
      url: '/pages/yjfk/index',
    })
  },
  cjwt(){
    if(!wx.getStorageSync("token")){
      total.util.showModal()
      return 
    }
    wx.navigateTo({
      url: '/pages/problem/index',
    })
  },
  bzzx(){
    wx.navigateTo({
      url: '/pages/help_list/index',
    }) 
  },
  yemx() {
    wx.navigateTo({
      url: '/pages/yemx/index',
    })
  },
  dj(){
    console.log(1111)
  },
  chooseShare:function(){

    var that = this;

    var hides = that.data.hideShare;

    if (hides==true){
      that.setData({
        hideShare: false
      })
    } else if (hides == false){
      that.setData({
        hideShare: true
      })
    }

  },
})