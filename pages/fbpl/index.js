// pages/fbpl/index.js
import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cdn: total.config.cdnHost,//图片链接头
    merchat_img:"",//店铺封面图片
    merchat_name:"",//店铺名称
    score:5,
    count:9,
    gradable:true,
    imgList: [],
    cdn:total.config.cdnHost,
    formData:{
      token:wx.getStorageSync('token'),
      mer_order_index:'', //订单id
      comment_score:5,//满意度
      comment_taste:5,//口味
      omment_huanjing:5, //环境 
      comment_content:'',//评论内容
      comment_content_length:'0',//评论内容长度
      comment_images:[] // 评论图片
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.formData.mer_order_index = options.mer_order_index;
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
      merchat_img:wx.getStorageSync('merchant_logo'),
      merchant_name:wx.getStorageSync('merchant_name')
    })
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
  ChooseImage() {
    let self = this,
      header = {
        "Content-Type": "multipart/form-data"
      };
    header.token = wx.getStorageSync('token')|| ''
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function ({ tempFilePaths }) {
        total.util.showLoad('图片上传中')
        wx.getImageInfo({
          src: tempFilePaths.join(''),
          success: function (res) {
            let _type = res.type;
            if (_type == 'png' || _type == 'jpg' || _type == 'jpeg' || _type == 'bmp') {
              // 进行上传图片
              wx.uploadFile({
                url: total.config.uploadCheckImage,
                filePath: tempFilePaths.join(''),
                name: 'file',
                formData: {
                  token: wx.getStorageSync('token') || '',
                  device: ''
                },
                header: header,
                success: function (res) {
                  let data = JSON.parse(res.data)
                  console.log(res)
                  if (data.success) {
                      console.log(data)
                    self.data.imgList.push(data.data);
                    self.setData({
                      imgList: self.data.imgList
                    })
                    if (res.msg) {
                      total.util.showText(res.msg)
                    } else if (res.message) {
                      total.util.showText(res.message)
                    }
                  } else {
                    if (res.msg) {
                      total.util.showText(res.msg)
                    } else if (res.message) {
                      total.util.showText(res.message)
                    } else {
                      total.util.showText('上传图片错误,请联系管理人员进行反馈')
                    };
                  }
                },
                fail: function (err) {
                  total.util.showText('上传图片失败,请联系管理人员进行反馈')
                },
                complete() {
                  wx.hideLoading();
                }
              })
            } else {
              total.util.showText('请重新上传图片，请上传png、jpg、jpeg或bmp格式的图片')
            }
          },
          fail: function (err) {
            total.util.showText('获取图片信息失败')
          }
        })
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '图片',
      content: '确定要删除这张图片吗？',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            count: 9 - this.data.imgList.length,
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  //发表评论
  published(){
    this.data.formData.comment_images = this.data.imgList.join(',')
    console.log(this.data.formData.token);
    ajax(total.config.addComment, 'GET',this.data.formData, res => {
      if (res.success) {
        total.util.showText(res.msg)
        setTimeout(function(){
          wx.reLaunch({
            url: '/pages/home/index',
          })
        },1000)
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  //满意程度
  getscoreI(e){
    let a=e.detail.score 
    this.data.formData.comment_score = e.detail.score 
    this.setData({
      'formData.comment_score':a
    })
  },
  //口味
  comment_taste(e){
    let a=e.detail.score 
    this.data.formData.comment_taste = e.detail.score 
    this.setData({
      'formData.comment_taste':a
    })
  },
  //环境
  comment_huanjing(e){
    let a=e.detail.score 
    this.data.formData.omment_huanjing = e.detail.score 
    this.setData({
      'formData.omment_huanjing':a
    })
  },
  //发表评论
  textareaAInput(e){
    let a=e.detail.value
    this.data.formData.comment_content = e.detail.value;
    this.setData({
      'formData.comment_content_length':a.length
    })
  }
})