import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex:"",//一共多少页
    page:'1',//当前多少页
    emptyType: 1,
    loadingTransparent: true,
    datainfo: []
  },
  yejl(options){
    wx.navigateTo({
      url: '/pages/yejlxq/index?id='+options.currentTarget.dataset.id,
    })
  },
  initdata() {
    // let that = this;
    // for(let i=0; i < this.data.datainfo.length;i++){
    //   that.data.datainfo[i].time=total.util.formatTime1(Number(that.data.datainfo[i].time) * 1000);
    // }
    // this.setData({
    //   datainfo:that.data.datainfo
    //   })
    let that = this;
    ajax(total.config.getMyBalance, 'GET', {
      token: wx.getStorageSync("token"),
      date:"",
      limit:20,
      page:that.data.page
    }, res => {
      if (res.success) {
        if (res.data.length==0){
          that.setData({
            emptyType: 0,
          });
        }else{
          for(let i=0; i < res.data.length;i++){
            res.data[i].time=total.util.formatTime1(Number(res.data[i].time)*1000)
          }
          that.data.datainfo.length>0?that.data.datainfo=[...that.data.datainfo,...res.data]:that.data.datainfo=res.data
          that.setData({
            datainfo:that.data.datainfo,
            pageIndex:res.cmd,
          });
        }
      } else {
        total.util.showText(res.msg)
      }
    })
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
    this.pageIndex='';
    this.page='1';
    this.initdata();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      datainfo:[]//展示前清空数据
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.setData({
      datainfo:[]//展示前清空数据
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // let that = this;
    // setTimeout(function() {
    //   that.initdata();
    //   wx.stopPullDownRefresh();
    // }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.page<this.data.pageIndex){
      this.data.page++
      this.initdata();
    }else{

    }
  },

  // emptyCallback() {
  //   this.setData({
  //     emptyType: 2
  //   })
  // },
})