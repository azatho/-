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
    code: "",
    userInfo: "",
    wxsq:false,
    phonesq:false
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.data.code = res.code;
        this.userInfo();
      }
    })

  },
  // 获取头像和昵称
  userInfo() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.setData({
            wxsq: true
          })
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.data.userInfo = res.userInfo
              this.register();
            }
          })
        }else{
          this.setData({
            wxsq:false
          })
        }
      }
    })
  },
  //用户授权登录
  register(){
    let that = this;
    ajax(total.config.register, 'GET', {
      code: that.data.code,
      nickName: that.data.userInfo.nickName,
      avatarUrl: that.data.userInfo.avatarUrl
    }, res => {
      if (res.success) {
        that.setData({
          openid: res.data.openid,
          session_key: res.data.session_key
        });
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  //获取用户手机号
  getWechatPhone() {
    let that = this;
    ajax(total.config.getWechatPhone, 'GET', {
      openid: that.data.openid,
      session_key: that.data.session_key,
      encryptedData: that.data.encryptedData,
      iv: that.data.iv
    }, res => {
      if (res.success) {
        wx.setStorageSync("token", res.data.token)
        wx.reLaunch({
          url: '/pages/home/index',
        });
      } else {
        total.util.showText(res.msg)
      }
    })
  },

  getUserInfo: function(e) {
    console.log(e.detail.userInfo);
    this.setData({
      userInfo: e.detail.userInfo,
      wxsq: true
    })
    this.register();
  },
  getPhoneNumber: function (e) {
    console.log(e.detail);
    this.setData({
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv
    })
    this.getWechatPhone();
  },
})