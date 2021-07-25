import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'
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
    order_moey:'',
    xz_ycrs:0,
    number_name:'暂无桌台信息',
    qtsr:false,
    fromData:{ 
      cart_id:'', //购物车及id
      mer_order_type:'1',
      is_zp:'',
      is_bale:'',
      remark:'',
      number:'',
      subscribe_number:1,
      eat_later:'',
      dining:1,
      first_cash:0,
      rank_cash:0,
      deduct_cash:0,
      total_cash:0,
      mer_order_price:0,
      eat_later:''
    },
    menu_list:[],
    CDNIMG:'',
    checked:null,
    zp:[],
    help:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
      this.setData({
        help:options.help,
        number_name:options.number_name,
        is_bale:options.number_name?0:1
      });
      this.options.number = options.number;
      if(options.subscribe_id){
        this.data.fromData.subscribe_id = options.subscribe_id;
      } 
  },
  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  PickerChange2(e) {
    this.setData({
      index2: e.detail.value
    })
  },
  PickerChange3(e) {
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
      this.getUserCartList()
      this.getCartNumCash()
      this.setData({
        CDNIMG:total.config.cdnHost
      })
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
    console.log(this.data.help)
    ajax(total.config.submitOrder+'&token='+wx.getStorageSync("token"),  'POST',this.data.fromData,res  =>  {
      if(res.success)  {
        if (this.data.help==1){
          wx.navigateTo({
            url: '/pages/waiter/qrcode/qrcode?mer_order_index=' + res.data.order_index,
          })
      
        }else{
          wx.navigateTo({
            url: '/pages/qrzf/index?money=' + res.data.order_total_price + '&order_id=' + res.data.order_index+'&cart_order='+1,
          }) 
        }
   
      }else{
        total.util.showText(res.msg)
      }
    })
  },
  Lose_focus(e){
    this.data.fromData.subscribe_number=e.currentTarget.dataset.index+1;
    this.setData({
      xz_ycrs:e.currentTarget.dataset.index,
      qtsr:false
    })
    this.data.fromData.dining = e.currentTarget.dataset.index+1
  },
  click_qt(){
    this.setData({
      qtsr:true
    })
  },
  //其他人数
  inputContent(e){
    this.data.fromData.dining = e.detail.value
  },
  //获取购物车列表
  getUserCartList(){
    var arr =[];
     ajax(total.config.getUserCartList, 'GET', {
          token: wx.getStorageSync("token")
        }, res => {
          if (res.success) {
           var arr =[];
             this.setData({
              first_cash: res.data.first_cash,
              rank_cash:res.data.rank_cash,
              deduct_cash: res.data.deduct_cash,
              total_cash: res.data.total_cash,
              menu_list:res.data.list,
              real_cash: res.data.real_cash,
              zp:res.data.zp
             });
             res.data.zp.forEach(item=>{
                arr.push(item.dishes_id);
             });
            this.data.fromData.is_zp = arr.join(',')?arr.join(','):0;
            this.data.fromData.first_cash = res.data.first_cash
            this.data.fromData.rank_cash = res.data.rank_cash
            this.data.fromData.deduct_cash = res.data.deduct_cash
            this.data.fromData.total_cash = res.data.total_cash
            this.data.fromData.real_cash = res.data.real_cash
            this.data.fromData.preference_price = res.data.preference_price
            this.data.menu_list.forEach(item=>{
                arr.push(item.cart_id)
             })
             this.data.fromData.cart_id = arr.join(',')
          } else {
            total.util.showText(res.msg)
          }
        })
  },
  //备注信息
  textareaAInput(e){
    this.data.fromData.remark = e.detail.value;
  },
  isCheckbox(e){
    if(e.detail.value.length){
      this.data.fromData.is_bale = 1 
    }else{
      this.data.fromData.is_bale = 0 
    }
  },
  isChuCan(e){
    if (e.detail.value.length) {
      this.data.fromData.eat_later = 1
    } else {
      this.data.fromData.eat_later = 0
    }
  },
  // 获取购物车菜单总金额
  getCartNumCash(){
     ajax(total.config.getCartNumCash, 'GET', {
          token: wx.getStorageSync("token")
        }, res => {
          if (res.success) {
             this.setData({
              order_moey:res.data.total_cash
             })
          } else {
            total.util.showText(res.msg)
          }
       })
  }
})