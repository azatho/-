// pages/index/clientOrder/clientOrder.js
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
    list:[],
    number:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.init();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //获取列表
  init(){
    var that = this;
    ajax(total.config.getMyOrderList,'GET',{
      token:wx.getStorageSync('token'),
      number:that.data.number,
      mer_id:wx.getStorageSync('merchant_id')
    },res=>{
       if(res.success){
         let arr = res.data;
         res.data.forEach((item,index)=>{
           arr[index].mer_order_time = total.util.formatTime(item.mer_order_time*1000);
           switch(item.mer_status){
               case '0':
                arr[index].mer_statusName = '待支付'
               break
               case '1':
                arr[index].mer_statusName = '待出餐'
               break;
               case '2':
                arr[index].mer_statusName = '已出餐'
               break;
               case '3':
                arr[index].mer_statusName = '已完成'
               break;
               case '-1':
                arr[index].mer_statusName = '已取消'
               break;
           }
         })
        this.setData({
          list:arr
        })
       }else{

       }
    })
  },
  sys(){
    wx.scanCode({
      success:(res)=> {
        this.data.number = res.number;
        that.init(); 
      }
    })
  },
  goOrder(e){
    wx.navigateTo({
      url: '/pages/ddxq/index?id='+e.currentTarget.dataset.id,
    })
  },
  onReady: function () {

  },
  collection(e){
     
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
  collection(e){
    wx.navigateTo({
      url: '/pages/waiter/qrcode/qrcode?mer_order_index='+e.target.dataset.mer_order_index
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})