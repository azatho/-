// pages/yyxq/index.js
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
    subInfoId:'',
    subInfo:{},
    cancel_time:'',
    cdn: total.config.cdnHost,
    status:'',
    money:0,
    orderId:"",
    subscribe_id:"",
  },
  qxyy(){
    wx.showModal({
      title: '提示',
      content: '确认要取消预约吗？',
      success (res) {
        if (res.confirm) {
           console.log('取消成功')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.subInfo(options.id)
      console.log(options)
      this.setData({
        subInfoId:options.id,
        status:options.status,
        money:options.money,
        orderId:options.orderId,
        subscribe_id:options.subscribe_id
      })
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
  onShareAppMessage: function (options) {
    return {
      title:'好友邀请',
      path:'pages/InviteFriends/index?id='+options.target.dataset.id,
    }
  },
  delYuDing(e){
    var self = this;
    wx.showModal({
      title: '提示',
      content: '确认要删除预约订单吗？',
      success(res) {
        if (res.confirm) {
          ajax(total.config.delSubscribe, 'GET', {
            token: wx.getStorageSync("token"),
            subscribe_id: self.data.subscribe_id
          }, res => {
            if (res.success) {
              total.util.showText(res.msg)
              wx.navigateBack({
                delta:-1
              })
            } else {
              total.util.showText(res.msg)
            }
          })
        }
      }
    })
  },
  yjdd(e){
    var obj = e.currentTarget.dataset.item;
    if (obj === "立即点餐") {
      wx.navigateTo({
        url: '/pages/home/index?subscribe_id=' + this.data.subInfo.subscribe_id,
      })
    } else if (obj === "立即出餐") {
      let that = this;
      ajax(total.config.editEatLater, 'GET', {
        token: wx.getStorageSync("token"),
        order_id: this.data.orderId,
        type:2,
        number: this.data.subInfo.subscribe_info.region_name + " " + this.data.subInfo.subscribe_info.region_number
      }, res => {
        if (res.success) {
          total.util.showText(res.msg);
          that.subInfo(this.data.subInfoId);
          that.setData({
          status:'undefined'
          })
          // that.getMyOrderList();
        } else {
          total.util.showText(res.msg)
        }
      })
    } else if (obj === "立即支付") {
      wx.navigateTo({
        url: '/pages/payYuYue/index?subscribe_type=' + this.data.subInfo.subscribe_type + '&order_id=' + this.data.orderId+'&money='+this.data.money
      })
    }
  },
  //获取预约详情
  subInfo(id){
    let that = this;
    ajax(total.config.subInfo, 'GET', {
      token: wx.getStorageSync("token"),
      subscribe_id:id
    }, res => {
      if (res.success) {
        switch(res.data.list.subscribe_info.type){
          case '1':
          res.data.list.subscribe_info.type = '圆形'
          break;    
          case '2':
            res.data.list.subscribe_info.type = '方形'
          break;    
          case '3':
            res.data.list.subscribe_info.type = '包间'
          break;    
          case '4':
            res.data.list.subscribe_info.type = '卡座'
          break;    
      }
      res.data.list.subscribe_datetime=total.util.formatTime2(parseInt(res.data.list.subscribe_datetime)*1000)
      res.data.list.subscribe_submit=total.util.formatTime1(parseInt(res.data.list.subscribe_submit)*1000)
      console.log(res.data.list.start_time)
      let time =new Date(parseInt(res.data.list.start_time)*1000);
      let cancel_time=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+'-'+time.getHours()+":"+'00'
      that.setData({
          subInfo:res.data.list,
          cancel_time:cancel_time,
        })
        console.log(cancel_time)
      } else {
        total.util.showText(res.msg)
      }
    })
  }
})