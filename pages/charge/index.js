// pages/charge/index.js
import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cut: 0,
    list: [],
    activity_id: '',
    pay_money: '',
    currentTxt:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRechargeList()
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
  select(e) {
    // console.log(e);
    var activity_id = e.currentTarget.dataset.activity_id;
    var pay_money = e.currentTarget.dataset.pay_money;
    // console.log(this.data.list);
    let item=this.data.list.find(item=>item.activity_id==activity_id);
    // console.log(item);
    this.setData({
      cut: e.currentTarget.dataset.id,
      activity_id: activity_id,
      pay_money: pay_money,
      currentTxt:item
    })
    // console.log(this.data.currentTxt);

  },
  sub(e) {
    this.wxPay()
    return
    wx.navigateTo({
      url: '/pages/win/index',
    })
  },
  //获得充值金额列表
  getRechargeList() {
    let that = this;
    ajax(total.config.getRechargeList, 'GET', {
      token: wx.getStorageSync("token"),
      merchant_id:wx.getStorageSync('merchant_id')
    }, res => {
      if (res.success) {
        that.setData({
          list: res.data,
          currentTxt:res.data[0]
        })
        that.data.activity_id = res.data[0].activity_id;
        that.data.recharge_cash = res.data[0].recharge_cash;
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  czjl(){
    wx.navigateTo({
      url: '/pages/czjl/czjl',
    })
    
  },
  //发起微信预支付
  wxPay() {
    var that = this;
    ajax(total.config.submitRechargeOrder,'GET',{
      merchant_id:wx.getStorageSync('merchant_id'),
      token:wx.getStorageSync('token'),
      activity_id:that.data.activity_id
    },res=>{
      var order_index = res.data.order_index;
      var recharge_cash = res.data.recharge_cash;
      wx.login({
        success: (res) => {
          ajax(total.config.rechargeOrder, 'GET', {
            token: wx.getStorageSync("token"),
            device: '',
            order_index: order_index,
            mer_order_price:recharge_cash,
            type: '105',
            pay_type: '1',
            code: res.code
          }, res => {
            wx.requestPayment({
              'timeStamp': res.data.timeStamp,
              'nonceStr': res.data.nonceStr,
              'package': res.data.package,
              'signType': res.data.signType,
              'paySign': res.data.paySign,
              'success': function (res) {
                total.util.showText('支付成功')
                setTimeout(function(){
                  wx.navigateTo({
                    url: '/pages/win/index',
                  })
                },500)
              },
              'fail': function (err) {
                if (err.errMsg == 'requestPayment:fail cancel') {
                  total.util.showText('取消支付')
                }
                if (err.errMsg == 'requestPayment:fail (detail message)') {
                  total.util.showText('调用支付失败')
                }
              },
              complete: function (reserr) {
                if (reserr.errMsg == 'requestPayment:cancel') {
                  total.util.showText('取消支付')
                }
              }
            })
          })
        }
      })
    })
  }
})