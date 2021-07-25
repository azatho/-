import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    emptyType: 0,
    loadingTransparent: true,
    datainfo: []

  },
  initdata() {
    // let that = this;
    // ajax(total.config.getMyBalance, 'GET', {
    //   token: wx.getStorageSync("token"),
    //   date:""
    // }, res => {
    //   if (res.success) {
    //     console.log(res.data);
    //     if (res.data.lenght==0){
    //       that.setData({
    //         emptyType: 0,
    //       });
    //     }else{
   
    //       that.setData({
    //         datainfo: that.data.datainfo.concat(res.data)
    //       });
    //     }


    //   } else {
    //     total.util.showText(res.msg)
    //   }
    // })
    var list = new Array();
    for (var i = 0; i < 10; i++) {
      var person = {
        amount: "100" + i,
        type: "104",
        time: "1559112466",
        msg: "商家提现扣减" + i
      };
      list[i] = person;
    }
    for (var i = 0; i < list.lenght; i++) {
      list[i].time = total.util.formatTime1(Number(list[0].time) * 1000);
    }
    this.setData({
      datainfo: this.data.datainfo.concat(list)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initdata();
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
    let that = this;
    setTimeout(function() {
      that.initdata();
      wx.stopPullDownRefresh();
    }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.initdata();
  },

  emptyCallback() {
    this.setData({
      emptyType: 2
    })
  },
})