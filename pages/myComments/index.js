import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex:'',//一共多少页，
    page:"1",//当前页数（初始值为1）
    score: "3",
    emptyType: 0,
    loadingTransparent: true,
    list3: [
    ],
    cdn:total.config.cdnHost
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
    this.page=1;
    this.pageIndex='';
    this.getMyCommonList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      list3:[]
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      list3:[]
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
     setTimeout(function(){
       wx.stopPullDownRefresh();
     },3000);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.page<this.data.pageIndex){
      this.data.page++
      this.getMyCommonList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },
  // 
  xqSelect(){

  },
   // 获取我的评价
getMyCommonList(){
    let that = this;
    ajax(total.config.getMyCommonList, 'GET', {
      token: wx.getStorageSync("token"),
      page:that.data.page,
      limit:20,
    }, res => {
      if (res.success) {
          res.data.map(el=>{
             el.comment_time=total.util.formatTime1(el.comment_time*1000)
             return res
          })
        that.data.list3.length>0?that.data.list3=[...that.data.list3,...res.data]:that.data.list3=res.data;
        that.setData({
          pageIndex:res.cmd,
          list3:that.data.list3
         }) 
      } else {
        total.util.showText(res.msg)
      }
    })
   },
  imgSelect(e){ 
    console.log(e)
    var arr = []
    var self = this;
    e.currentTarget.dataset.imgarr.forEach(item=>{
       arr.push(this.data.cdn+item);
    })
    wx.previewImage({
      urls: arr,
      current: self.data.cdn+e.currentTarget.dataset.item
    })
  } ,
  goOrderInfo(e){
    wx.navigateTo({
      url: '/pages/ddxq/index?id='+e.currentTarget.dataset.comment,
    })
  }
})