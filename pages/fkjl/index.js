// pages/fkjl/index.js
import {
  ajax
} from '../../js/ajax.js'
import total from '../../js/total'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cdn:total.config.cdnHost,
    infoList:[],//反馈记录列表
    pageIndex:'',//一共有多少页数据
    page:1,//默认页数
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
    this.setData({
      infoList:[]
    });
    this.data.pageIndex='';
    this.data.page=1;
    this.getFeedbackList();
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
    if (this.data.page<this.data.pageIndex){
      this.data.page++
      this.getFeedbackList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取反馈记录列表
  getFeedbackList(){
    let that =this ;
    ajax(total.config.getFeedbackList,'GET',{
      token:wx.getStorageSync("token"),
      limit:20,
      page:that.data.page
    },res=>{
      if(res.success){
        res.data.map(el=>{
          el.feedback_addtime=total.util.formatTime1(el.feedback_addtime*1000)
          return el
        })
        that.data.infoList.length>0?that.data.infoList=[...that.data.infoList,...res.data]:that.data.infoList=res.data;
        that.setData({
          infoList:that.data.infoList,
          pageIndex:res.cmd
        })
      }else{
        total.util.showText(res.msg)
      }
    })
  },
  // 跳转至反馈详情页面
  goFeedbackDetails(e){
    let a=JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/fkxq/fkxq?info='+a,
    })
  }
})