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
    OrderList:[],
    pageIndex:'',
    page:1,
  },
  //
  getMyOrderList() {
    let that = this;
    ajax(total.config.getMyOrderList, 'GET', {
      token: wx.getStorageSync("token"),
      mer_id:wx.getStorageSync('merchant_id'),
      limit:20,
      page:that.data.page,
    }, res => {
      if (res.success) {
        for (let i = 0; i < res.data.length;i++){
          res.data[i].mer_order_time = total.util.formatTime1(total.util.formatTime1(Number(res.data[i].mer_order_time) * 1000));
        }
        that.data.OrderList.length>0?that.data.OrderList=[...that.data.OrderList,...res.data]:that.data.OrderList=res.data;
        that.setData({
          pageIndex:res.cmd,
          OrderList:that.data.OrderList
        })
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.page=1;
    this.data.pageIndex='';
    this.getMyOrderList();
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
    this.setData({
      pageIndex:'',
      page:1
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      pageIndex:'',
      page:1
    })
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
    if (this.data.page<this.data.pageIndex){
      this.data.page++
      this.getMyOrderList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  charge(e){
    console.log(e);
  },
  ddxq(e){
    wx.navigateTo({
      url: '/pages/ddxq/index?id='+e.currentTarget.dataset.id,
    })
  },
  //去支付
  go_pay(e){
     wx.navigateTo({
       url: '/pages/qrzf/index?order_id=' + e.currentTarget.dataset.item.mer_order_index + "&cart_order=1&money=" + e.currentTarget.dataset.item.real_price,
     })
  },
  //立即出餐
  immediately(e){
    let that = this;
    ajax(total.config.editEatLater, 'GET', {
      token: wx.getStorageSync("token"),
      order_id: e.currentTarget.dataset.item.mer_order_id,
      type: 1,
      number: e.currentTarget.dataset.item.number
    }, res => {
      if (res.success) {
        total.util.showText(res.msg);
        that.getMyOrderList();
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  //去评价
  evaluate(e){
    wx.navigateTo({
      url: '/pages/fbpl/index?mer_order_index=' + e.currentTarget.dataset.item.mer_order_index,
    })
  }
})