// pages/reservation/index.js
import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      index:0,
      currentDate:'',
      selectDate:false,
      timeSelect: false,
      boxList: [],
      setmealList: [],
      select: 0,
      choice_list: '',
      merchant_id: '',
      formDate: {
        merchant_id: '',
        subcribe_datetime: '',
        subscribe_time: '',
        subscribe_seat: '',
        subscribe_number: '',
        subscribe_name: '',
        subscribe_sex: '',
        subscribe_phone: '',
        subscribe_chose: '',
        subscribe_remark: '',
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      merchant_id: options.id
    })
    console.log(this.data.merchant_id)
    this.data.formDate.merchant_id = this.data.merchant_id
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
    this.getCurrentDate()
     this.originTime()
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
  // 获取当前的日期
  getCurrentDate(){
    var obj = total.util.getForm(total.util.getDay(0))
    this.setData({
     currentDate: obj.month + '-' + obj.day
    })
    this.data.formDate.subcribe_datetime = total.util.getDay(0)
  },
  //预约日期弹窗
  yuyueDate(){
     this.setData({
      selectDate:true,
     }) 
    this.data.index +=1
    var arr = []
    for(var i=0;i<7;i++) {
      arr.push(total.util.getDay(i))
    }
    console.log(arr)
    var arr1 = []
    for(var i=0;i<arr.length;i++){
      arr1.push(total.util.getForm(arr[i]))
    }
    this.setData({
      boxList: arr1
    })
    console.log(this.data.boxList)
    console.log(this.data.index)
    console.log(total.util.getDay(this.data.index))
  },
  Shut_down(){
    this.setData({
      selectDate:false,
      timeSelect:false
     }) 
  },
  slelectedBox(e){
    this.data.formDate.subcribe_datetime = total.util.getDay(e.currentTarget.dataset.index)
    console.log(this.data.formDate)
    this.setData({
      select: e.currentTarget.dataset.index
    })
  },
  setmeal(e){
    this.data.formDate.subscribe_time = e._relatedInfo.anchorTargetText
    console.log(this.data.choice_list);
    console.log(e.currentTarget.dataset.id);
    this.getChoiceTCList(e.currentTarget.dataset.id);
    this.setData({
      select: e.currentTarget.dataset.index
    })
  },
  fix(){
    console.log('确定预约到哪天并把数据提交')
  },
  originTime(){
     ajax(total.config.getChoiceList, 'GET', {
        token: wx.getStorageSync("token"),
        merchant_id: this.data.merchant_id,
        date:""
      }, res => {
        if (res.success) {
          // console.log(wx.getStorageSync("token"))
          console.log(res.data.list);
          this.getChoiceTCList( res.data.list[0].choice_chose);
          this.setData({
            choice_list : res.data.list
          })
          console.log(this.data.choice_list)
        } else {
          total.util.showText(res.msg)
        }
      })
  },
  getChoiceTCList(id){
     ajax(total.config.getChoiceTCList, 'GET', {
        token: wx.getStorageSync("token"),
        merchant_id: this.data.merchant_id,
        choice_list: id,
      }, res => {
        if (res.success) {
          console.log(res.data);
          this.setData({
            setmealList: res.data.list
          })
          console.log(this.data.setmealList)
        } else {
          total.util.showText(res.msg)
        }
      })
  },
  originDate(){
    this.setData({
      timeSelect: true
    })
  }
})