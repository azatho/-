// pages/yuyue/index.js
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
    subList:[],
    pageIndex:'',
    page:1
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
    this.data.pageIndex='',
    this.data.Page=1,
    this.getSubList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      subList:[]
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      subList:[]
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
    if(this.data.page<this.data.pageIndex){
      this.data.page++
      this.getSubList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    console.log(options.target.dataset.id)
    return {
      title: '好友邀请',
      path: 'pages/InviteFriends/index?id=' + options.target.dataset.id,
    }
  },
  qqyy(e) {
    var self = this;
    wx.showModal({
      title: '提示',
      content: '确认要取消预约吗？',
      success(res) {
        if (res.confirm) {
          ajax(total.config.cancelSubscribe, 'GET', {
            token: wx.getStorageSync("token"),
            subscribe_id: e.currentTarget.dataset.item.subscribe_id
          }, res => {
            if (res.success) {
              total.util.showText(res.msg)
            } else {
              total.util.showText(res.msg)
            }
          })
        }
      }
    })
  },
  yuyueDetail(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/yyxq/index?id=' + e.currentTarget.dataset.id+'&status='+e.currentTarget.dataset.status+'&money='+e.currentTarget.dataset.money+'&orderId='+e.currentTarget.dataset.orderid+'&subscribe_id='+e.currentTarget.dataset.subscribe_id,
    })
  },
  // 获取预约列表
  getSubList() {
    let that = this;
    ajax(total.config.subList, 'GET', {
      token: wx.getStorageSync("token"),
      mer_id:wx.getStorageSync('merchant_id'),
      limit :20,
      page:1
    }, res => {
      if (res.success) {
        res.data.forEach((item, index) => {
          res.data[index].subscribe_datetime = total.util.formatTime2(parseInt(item.subscribe_datetime) * 1000)
          res.data[index].subscribe_submit = total.util.formatTime2(parseInt(item.subscribe_submit) * 1000)
          switch (item.subscribe_status) {
            case '0':
              res.data[index].subscribe_status = '待支付';
              break;
            case '1':
              res.data[index].subscribe_status = '待赴约';
              break;
            case '2':
              res.data[index].subscribe_status = '已取消';
              break;
            case '3':
              res.data[index].subscribe_status = '已赴约';
              break;
            case '4':
              res.data[index].subscribe_status = '待出餐';
              break;
            case '5':
              res.data[index].subscribe_status = '已出餐';
              break;
          }
          switch (item.subscribe_info.type) {
            case '1':
              res.data[index].subscribe_info.type = '圆形'
              break;
            case '2':
              res.data[index].subscribe_info.type = '方形'
              break;
            case '3':
              res.data[index].subscribe_info.type = '包间'
              break;
            case '4':
              res.data[index].subscribe_info.type = '卡座'
              break;
          }
          switch (+item.status) {
            case 0:
              res.data[index].status = '立即点餐'
              break;
            case 1:
              res.data[index].status = '立即出餐'
              break;
            case 2:
              res.data[index].status = '立即支付'
              break;
          }
        })
        that.data.subList.length>0?that.data.subList=[...that.data.subList,...res.data]:that.data.subList=res.data
        that.setData({
          pageIndex:res.cmd,
          subList: that.data.subList,
        })
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  yjdd(e) {
    var obj = e.currentTarget.dataset.item;
    if (obj.status === "立即点餐") {
      wx.navigateTo({
        url: '/pages/home/index?subscribe_id=' + obj.subscribe_id,
      })
    } else if (obj.status === "立即出餐") {
      let that = this;
      ajax(total.config.editEatLater, 'GET', {
        token: wx.getStorageSync("token"),
        order_id: obj.chu_order_id,
        type:2,
        number: obj.subscribe_info.region_name + " " + obj.subscribe_info.region_number
      }, res => {
        if (res.success) {
          this.data.subList=[];
          this.data.page=1;
          this.data.pageIndex='';
          that.getSubList();
          total.util.showText(res.msg);
          // that.getMyOrderList();
        } else {
          total.util.showText(res.msg)
        }
      })
    } else if (obj.status === "立即支付") {
      wx.navigateTo({
        url: '/pages/payYuYue/index?subscribe_type=' + obj.subscribe_type + '&order_id=' + obj.order_id+'&money='+obj.money
      })
    }
  },
  delYuDing(e){
    var self = this;
    wx.showModal({
      title: '提示',
      content: '确认要删除预约订单吗？',
      success(res) {
        if (res.confirm) {
          ajax(total.config.delSubscribe, 'GET', {
            token: wx.getStorageSync("token"),
            subscribe_id: e.currentTarget.dataset.item.subscribe_id
          }, res => {
            if (res.success) {
              self.data.subList=[];
              self.data.page=1;
              self.data.pageIndex='';
              self.getSubList();
              total.util.showText(res.msg)
            } else {
              total.util.showText(res.msg)
            }
          })
        }
      }
    })
  }
})