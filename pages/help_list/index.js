//index.js
//获取应用实例
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
     cdn:total.config.cdnHost,
     help_list:[],
     src:[],
     pageIndex:'',//总页数
     page:1,//当前页数
  },

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
    this.pageIndex='';
    this.Page=1;
    this.getHelpList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      help_list:[]
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      help_list:[]
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
    if(this.data.Page<this.page.pageIndex){
      this.data.page++;
      this.getHelpList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getHelpList(){
    let that = this;
    ajax(total.config.getHelpList, 'GET',{
      type:2,
      limit:20,
      page:that.data.page
    },res => {
      if (res.success) {
        that.data.help_list.length>0?that.data.help_list=[...that.data.help_list,...res.data]:that.data.help_list=res.data
        that.setData({
          help_list:res.data,
          pageIndex:res.cmd,
        })
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  click_active(e){
    this.data.src=e.currentTarget.dataset.index.help_content
    wx.navigateTo({
      url: '/pages/extraPage/index?src='+this.data.src,
    })
  }

})