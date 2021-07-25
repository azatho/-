import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fk:[
      {'id':0,'icon':'../../images/fk_icon1.png','icon2':'../../images/fk_icon2.png','name':'咨询'},
      {'id':1,'icon':'../../images/fk_icon1.png','icon2':'../../images/fk_icon2.png','name':'建议'},
      {'id':2,'icon':'../../images/fk_icon1.png','icon2':'../../images/fk_icon2.png','name':'其他'}
    ],
    suoyin:0,
    content:'',
    phone:'',
    device_type:'',
    type:'0'
  },
  // 当组件输入数字6位数时的自定义函数

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
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
  change_fk(e){
    this.setData({
      suoyin:e.currentTarget.dataset.item,
      type:e.currentTarget.dataset.item
    })
  },
  fk_content(e){
    this.data.content = e.detail.value
  },
  email(e){
    this.data.device_type = e.detail.value
  },
  qt(e){
    this.data.phone = e.detail.value
  },
  submit(){
    let that = this;
    if(!that.data.content){
       return total.util.showText("反馈内容不能为空！")
    }
    ajax(total.config.feedback, 'GET', {
      token: wx.getStorageSync("token"),
      type:that.data.type,
      content:that.data.content,
      phone:that.data.phone,
      device_type:that.data.device_type
    }, res => {
      if (res.success) {
        total.util.showText(res.msg);
        setTimeout(function(){
          wx.navigateBack({
            delta: 1,
          })
        },2000)
      } else {
        total.util.showText(res.msg)
      }
    })
  }
})