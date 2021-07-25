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
    wxsq:true,
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
        console.log(this.data.code);
      }
    })

  },
  // 获取头像和昵称
  userInfo() {
    wx.getUserProfile({
      success: res => {
        console.log(res)
        // 可以将 res 发送给后台解码出 unionId
        this.data.userInfo = res.userInfo
        this.register();
      }
    })
  },
  //用户授权登录
  register(){
    let that = this;
    ajax(total.config.register, 'GET', {
      code: that.data.code,
      nickName: that.data.userInfo.nickName,
      avatarUrl: that.data.userInfo.avatarUrl,
      appid:wx.getAccountInfoSync().miniProgram.appId
    }, res => {
      if (res.success) {
        that.setData({
          wxsq:false,
          openid: res.data.openid,
          session_key: res.data.session_key
        });
        console.log(that.openid)
        console.log(that.session_key)
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
      appid:wx.getAccountInfoSync().miniProgram.appId,
      iv: that.data.iv
    }, res => {
      if (res.success) {
        wx.setStorageSync("token", res.data.token)
        wx.setStorageSync("is_server", res.data.is_server)
        wx.navigateBack({
          delta: 1
        })
      } else {
        total.util.showText(res.msg)
      }
    })
  },

  getUserInfo: function(e) {
    wx.getUserProfile({
      desc:'用户授权',
      success: res => {
        console.log(res)
        // 可以将 res 发送给后台解码出 unionId
        this.data.userInfo = res.userInfo
        this.register();
      }
    })
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