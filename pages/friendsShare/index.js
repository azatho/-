// pages/friendsShare/index.js
import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    h: '00',
    m: '00',
    s: '00',
    user: {
      merchant_name: '',
      nanme: '',
      share_time: ''
    },
    money: 0,
    order_index: '',
    showOneButtonDialog: false,
    oneButton: [{
      text: '确定'
    }],
    items: [{
      name: '余额支付',
      value: '0',
      checked: true
    }, {
      name: '微信支付',
      value: '1',
      checked: false
    }],
    value: '0' //默认余额支付
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.order_index = options.order_index
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
    this.otherPayOrder()
    this.getUserCash();
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
  //倒计时函数
  countdown() {
    var that = this;
    var overTime = setInterval(function () {
      var date = new Date();
      var onTime = date.getTime() / 1000;
      var objTime = that.data.user.share_time
      var obj = total.util.countTime(onTime, objTime)
      if (objTime - onTime <= 0) {
        clearInterval(overTime);
      }else{
        that.setData({
          h: obj.hour,
          m: obj.min,
          s: obj.sen
        })
      }
    }, 1000)
  },
  //立即支付
  pay_immediately() {
    if (!wx.getStorageSync('token')) {
      return total.util.showModal();
    }
    this.setData({
      showOneButtonDialog: true,
    })
  },
  otherPayOrder() {
    var that = this
    var order_index = that.data.order_index
    ajax(total.config.otherPayOrder, 'GET', {
        token: wx.getStorageSync('token'),
        order_index: order_index,
      },
      res => {
        if (res.success) {
          this.setData({
            user: res.data
          })
          this.countdown();
        } else {
          total.util.showText(res.msg)
        }
      })
  },
  //获取现金余额
  getUserCash() {
    ajax(total.config.getUserCash, 'GET', {
        token: wx.getStorageSync('token'),
      },
      res => {
        if (res.success) {
          this.setData({
            money: res.data
          })
          if (res.data == 0) {
            this.data.items[0].checked = false
            this.data.items[1].checked = true
            this.data.value = 1;
          }
          this.setData({
            items: this.data.items
          })
        } else {
          total.util.showText(res.msg)
        }
      })
  },
  //支付选择
  tapDialogButton() {
    if (this.data.value == '0') { //选择余额支付
      this.cartPayOrder();
    } else { //选择微信支付
      this.wxpay();
    }
  },
  wxpay() {
    var that = this;
    wx.login({
      success(res) {
        ajax(total.config.rechargeOrder, 'GET', {
          token: wx.getStorageSync('token'),
          order_index: that.data.order_index,
          order_money: that.data.user.money,
          pay_type: 1,
          type: 107,
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
                   wx.reLaunch({
                     url: '../home/index',
                   })
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
  radioChange(e) {
    this.data.value = e.detail.value;
  },
  //余额待支付订单
  cartPayOrder() {
    ajax(total.config.payOrder, 'GET', {
      token: wx.getStorageSync("token"),
      order_index: this.data.order_index,
    }, res => {
      if (res.success) {
        total.util.showText(res.msg)
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/paysuccess/index?activity_id=' + res.data.activity_id + '&order_id=' + res.data.order_id + '&cash=' + res.data.cash +'&oldPage=1',
          })
        }, 500)
      } else {
        total.util.showText(res.msg)
      }
    })
  },
})