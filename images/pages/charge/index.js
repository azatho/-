// pages/charge/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cut:0,
    list: [{
        title: 100,
        zs: 10
      }, {
        title: 150,
        zs: 20
      }
      , {
        title: 200,
        zs: 50
      }, {
        title: 300,
        zs: 100
      }, {
        title: 400,
        zs: 150
      }, {
        title: 500,
        zs: 200
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  select(e){
    console.log(e.currentTarget.dataset.id);
    this.setData({
      cut: e.currentTarget.dataset.id
    })
  },
  sub(e){
   wx.navigateTo({
     url: '/pages/win/index',
   })
  }
})