// pages/shoukuan/index.js
import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mer_order_index:'',
        orderInfo:{},
        cdn:total.config.cdnHost
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.mer_order_index = options.mer_order_index
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
        this.getMoney();
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
   getMoney(){
       if(!wx.getStorageSync('token')){
         wx.navigateTo({
           url: '/pages/sqdl/index',
         })
         return false;
       }
       var that = this;
     ajax(total.config.readyPaya,'GET',{
        token:wx.getStorageSync('token'),
        mer_order_index:that.data.mer_order_index
     },res=>{
          if(res.success){
            orderInfo = res.data;
          }
     })
   },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
    // 选择支付方式
    isPayWay(e){
        if(e.detail.value=='r1'){
           console.log('选择了余额支付');
        }else if(e.detail.value == 'r2'){
           console.log('选择了微信支付');
        }
    },
    pay(){
        console.log(111);
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})