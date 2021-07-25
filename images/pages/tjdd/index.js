// pages/tjdd/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index2: 0,
    index3: 0,
    picker2: ['微辣', '香辣', '中辣','特辣'],
    picker3: ['1', '2', '3'],
    multiArray: [
      ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      ['00', '10', '20', '30', '40', '50']
    ],
    multiIndex: [0, 0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // var d = new Date();
    // var listHours = new Array();
    // for (var i = d.getHours(); i < 24; i++) {
    //   if (i >= d.getHours()) {
    //     listHours[i] = "" + i;
    //   }
    // }
    // this.setData({
    //   multiArray : listHours
    // })
    // this.data.multiArray[0] = listHours;
    // console.log(listHours);
    // console.log(d.getHours());
    // console.log(d.getMinutes());
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  PickerChange2(e) {
    console.log(e);
    this.setData({
      index2: e.detail.value
    })
  },
  PickerChange3(e) {
    console.log(e);
    this.setData({
      index3: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  MultiColumnChange(e) {
    let data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['00', '10', '20', '30', '40', '50'];
            break;
          case 1:
            data.multiArray[1] = ['00', '10', '20', '30', '40', '50'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    this.setData(data);
    console.log(data.multiArray[1] )
    console.log(data)
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
  sub(){
    wx.navigateTo({
      url: '/pages/qrzf/index',
    })
  }
})