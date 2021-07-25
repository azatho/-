// pages/problem/index.js
import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cdn:total.config.cdnHost,
    suoyin:'',
    flag:false,
    titleList:[
      {
        "title": "这是常见问题这是常见问题",
        "htmlString": "<p>这是常见问题这是常见问题这是常见问题这是常见问题这是常见问题这是常见问题这是常见问题这是常见问题这是常见问题这是常见问题这是常见问题这是常见问题这是常见问题这是常见问题这是常见问题</p>"
    },
    {
      "title": "问题",
      "htmlString": "456456"
    }
    ]
  },
  getList(){
    ajax(total.config.getNewsList, 'GET', {
      region: 4,
      type:2
    }, res => {
      if (res.success) {
        this.setData({
          titleList:res.data.list
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
    this.getList()
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
  click_active(e){
    if(!this.data.flag){
      this.setData({
        suoyin:e.currentTarget.dataset.index,
        flag:true
      })
    }else{
      this.setData({
        flag:false,
        suoyin:''
      })
    }
  }
})