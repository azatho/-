// pages/qrzf/index.js
// pages/reservation/index.js
import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subscribe_id:"",
    money: '',
    id: '',
    account_balance: '',
    submitSub: '',
    payWay: '0',
    disabled: false,
    loadModal: false,
    goodFriends: false,
    payType: 1, //当前的支付方式
    yu_e_status: true, //是否选中了余额
    wx_status: true, //是否选中了微信支付
    isStatus: 0 //是否可以混合支付 0 不可以 1 可以
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // // 获取预约金额
    this.data.id = options.order_id
    this.data.submitSub = options.type
    this.data.cart_order = options.cart_order
    if (this.data.cart_order == '1') { //购物车订单支付
      this.setData({
        goodFriends: true
      })
    }
    this.setData({
      money: (+options.money)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getUserCash();
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
    this.sharePayOrder();
    var order_index = this.data.id
    var shareObj = {
      title: "待付款", // 默认是小程序的名称(可以写slogan等)
      path: '/pages/friendsShare/index?order_index=' + order_index, // 默认是当前页面，必须是以‘/’开头的完整路径
    };
    return shareObj
  },
  //分享内容
  onshara() {

  },
  //配置分享订单
  sharePayOrder() {
    ajax(total.config.sharePayOrder, 'GET', {
      token: wx.getStorageSync("token"),
      order_index: this.data.id
    }, res => {
      if (res.success) {
        this.onshara()
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  //获取预约金额
  getSubscribePayInfo(id) {
    ajax(total.config.getSubscribePayInfo, 'GET', {
      token: wx.getStorageSync("token"),
      subscribe_index: id
    }, res => {
      if (res.success) {
        this.setData({
          money: res.data.money / 1000
        })
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  //支付购物车订单
  cartPayOrder() {
    this.setData({
      loadModal: true
    })
    ajax(total.config.payOrder, 'GET', {
      token: wx.getStorageSync("token"),
      order_index: this.data.id,
    }, res => {
      if (res.success) {
        this.setData({
          loadModal: false
        })
        total.util.showText(res.msg)
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/paysuccess/index?activity_id=' + res.data.activity_id + '&id=' + res.data.order_id + '&cash=' + res.data.cash,
          })
        }, 500)
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  // 支付预约订单
  paySubscribe() { 
    this.setData({
      loadModal: true
    })
    var that = this;
    ajax(total.config.paySubscribe, 'GET', {
      token: wx.getStorageSync("token"),
      order_id: this.data.id,
      type: this.data.submitSub
    }, res => {
      if (res.success) {
        this.setData({
          loadModal: false,
          subscribe_id:res.data.subscribe_id
        })
        total.util.showText(res.msg)
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/yysuccess/index?id=' + that.data.subscribe_id
          })
        }, 500)
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  //获取余额
  getUserCash() {
    var that = this;
    ajax(total.config.getUserCash, 'GET', {
      token: wx.getStorageSync("token"),

    }, res => {
      if (res.success) {
        that.setData({
          account_balance: res.data / 100
        })
        if (res.data >= this.data.money) {
            this.setData({
              isStatus: 0
            })
        } else if (res.data == 0) {
          //微信支付
          this.setData({
            disabled: true,
            payWay: 1,
            payType:1
          })
        } else {  
          //混合支付
          this.setData({
            isStatus: 1,
            payWay: 1,
            payType:2
          })
        }
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  //选择支付方式
  isPayWay(e) {
    this.data.payWay = e.detail.value
  },
  //选择余额
  selectyu_e(){
    this.setData({
      yu_e_status:!this.data.yu_e_status
    })
  },
  wxPay(type,payType) {
    var that = this;
    wx.login({
      success: (res) => {
        console.log(res.code)
        ajax(total.config.rechargeOrder, 'GET', {
          token: wx.getStorageSync("token"),
          device: '',
          order_index: this.data.id,
          order_money: this.data.money,
          type,
          pay_type: payType,
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
              if (res.errMsg == 'requestPayment:ok') {
                setTimeout(function () {
                  if (that.data.cart_order == '1') { //购物车订单支付
                    wx.navigateTo({
                      url: '/pages/paysuccess/index?id=' + that.data.id,
                    })
                  } else {
                    wx.navigateTo({
                      url: '/pages/yysuccess/index?id=' + that.data.subscribe_id,
                    })
                  }
                }, 500)
              }
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
  },
  // 去支付
  goPay() {
    if(this.data.isStatus==1 && (!this.data.yu_e_status)){ //混合支付单独选择了微信支付
        this.data.payType = 1
    };
    if (this.data.payWay == '0') {
      if (this.data.cart_order == '1') { //购物车订单支付
        this.cartPayOrder();
      } else {
        this.paySubscribe(); //预约支付
      }
    } else if (this.data.payWay == '1') {
      if (this.data.cart_order == '1') { //购物车订单支付
        this.wxPay(107,this.data.payType);
      } else { // 预约支付
        this.wxPay(this.data.submitSub,this.data.payType);
      }
    }
  }
})