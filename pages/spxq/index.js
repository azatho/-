// pages/spxq/index.js
//index.js
//获取应用实例
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
    modal: '',
    menu:null,
    cdn: total.config.cdnHost,
    number:1,
    goods_sku_property: {},
    goods_sku_values: {},
    goods_sku_price: {},
    //选中改变属性
    sku_pic: "",
    sku_price: "",
    sku_title: "",
    sku_spec: "",
    CartList: {},
    dishes_id:"",
    sku_info:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.gettDishesDetail(options.dishes_id)
      this.setData({
        dishes_id:options.dishes_id
      })
      this.getUserCartList()
      this.getDishesSkuInfo(options.dishes_id)
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
  add(event) {
    this.setData({
      modal: "Modal",
    })
  },
  showModal(e) {
    this.setData({
      modal: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modal: null,
    })
  },
  //获取菜品详情
  gettDishesDetail(dishes_id){
    let that = this;
    ajax(total.config.getDishesDetail, 'GET', {
      token: wx.getStorageSync("token"),
      dishes_id: dishes_id,
    }, res => {
      if (res.success) {
        that.setData({
          menu:res.data
        })
        
        
      } else {
        total.util.showText(res.msg)
      }
    })
    that.getUserCartList()
  },
  submit(e){
    
    console.log(e)
    if (this.data.menu.dishes_limit=='1' && this.data.number == '0') {
      total.util.showText('库存不足')
      return
    }
    if (this.data.menu.dishes_limit=='0'&& e.detail.number>=this.data.menu.left_count) {
      total.util.showText('超出限购数量，请重新选择')
      return
    }
      this.data.number = e.detail.number;
    if(this.data.menu.sku_id>0){
      var sku_id = this.data.menu.dishes_id;
      // console.log(sku_id)
      var attributes_id = this.data.menu.attributes_id;
      // console.log(attributes_id)
      this.data.sku_info=sku_id + "," + attributes_id
      // console.log(this.data.sku_info)
    }
    
  },
  //确认
  xhl(){
    //  console.log(this.data.menu.dishes_id);
    //  console.log(this.data.number);
    //  console.log(this.data.menu)
     if(this.data.menu.sku_id>0){
      //  console.log(111)
      this.addModifyUserCart([{ dishes_id: this.data.menu.dishes_id, sku_info:this.data.sku_info, count: this.data.number }])
     }else{
      this.addModifyUserCart([{ dishes_id: this.data.menu.dishes_id, sku_info: '', count: this.data.number }])
     }
     
    
    
  },
  //加入购物车
  addModifyUserCart(fromDate) {
    let that = this;
      ajax(total.config.addModifyUserCart + '&token=' + wx.getStorageSync('token'), 'POST', {
        data: JSON.stringify(fromDate)
      }, res => {
        if (res.success) {
          // that.getShopInfo();
          // that.getCartNumCash();
          that.setData({
            modal: "",
          });
          wx.navigateBack({
            delta: 1
          })
        } else {
          total.util.showText(res.msg)
        }
      })
  },
   //购物车列表
   getUserCartList() {
    let that = this;
    ajax(total.config.getUserCartList, 'GET', {
      token: wx.getStorageSync("token")
    }, res => {
      if (res.success) {
          that.setData({
            CartList: res.data.list
          })
         for(let i=0;i<res.data.list.length;i++){
           if(res.data.list[i].dishes_id==that.data.menu.dishes_id){
             that.setData({
              number:res.data.list[i].count
             })
            
           }
         }   
          console.log(that.data.number)
      } else {
        total.util.showText(res.msg)
      }
    })
  },
   //获取商品规格信息
   getDishesSkuInfo(dishes_id) {
    let that = this;
    ajax(total.config.getDishesSkuInfo, 'GET', {
      token: wx.getStorageSync("token"),
      dishes_id: dishes_id
    }, res => {
      if (res.success) {
        that.setData({
          gginfo: res.data,
          goods_sku_price: res.data.goods_sku_price,
          goods_sku_property: res.data.goods_sku_property,
          goods_sku_values: res.data.goods_sku_values,
          sku_pic: res.data.goods_sku_price[0].sku_pic,
          sku_price: res.data.goods_sku_price[0].sku_price,
          sku_info: res.data.goods_sku_price[0].sku_info,
          sku_spec: res.data.goods_sku_price[0].sku_spec,
          sku_title: res.data.goods_sku_price[0].sku_title,
          dishes_id: res.data.dishes_id,
        });
        that.moren();
       
        // if (res.data.goods_sku_values.length != 0) {
        //   that.setData({
        //     modalNamegg: "Modal"
        //   });
        // }
      } else {
        // total.util.showText(res.msg)
      }
    })
  },
  moren() {
    //默认选中第一个
    let that = this;
    let listProperty = that.data.goods_sku_property;
    let listValues = that.data.goods_sku_values;
    let lists = new Array();
    for (var i = 0; i < listProperty.length; i++) {
      let arraylist = new Array();
      for (var j = 0; j < listValues.length; j++) {
        if (listProperty[i].sku_index == listValues[j].sku_parent) {
          arraylist.push(listValues[j]);
          if (arraylist.length == 1) {
            arraylist[0].isSelect = 1;
          } else {
            arraylist[arraylist.length - 1].isSelect = 0;
          }
        }
      }
      lists = lists.concat(arraylist);
    }
    that.setData({
      goods_sku_values: lists
    })
  },
  select(e) {
    let that = this;
    let list = that.data.goods_sku_values;
    for (var i = 0; i < list.length; i++) {
      if (list[i].sku_parent == e.target.dataset.id.sku_parent) {
        if (list[i].sku_index == e.target.dataset.id.sku_index) {
          list[i].isSelect = 1;
        } else {
          list[i].isSelect = 0;
        }
      }
    }
    that.setData({
      goods_sku_values: list
    })
    let sku_info = ""
    let sku_spec = ""
    for (let index = 0; index < list.length; index++) {
      if (list[index].isSelect == 1) {
        sku_info = sku_info + list[index].sku_index + ",";
        sku_spec = sku_spec + list[index].sku_name + "/";
      }
    }
    sku_info = sku_info.substring(0, sku_info.length - 1);
    sku_spec = sku_spec.substring(0, sku_spec.length - 1);
    for (let j = 0; j < that.data.goods_sku_price.length; j++) {
      if (that.data.goods_sku_price[j].sku_info == sku_info) {
        that.setData({
          sku_pic: that.data.goods_sku_price[j].sku_pic,
          sku_price: that.data.goods_sku_price[j].sku_price,
          sku_info: that.data.goods_sku_price[j].sku_info,
          sku_spec: that.data.goods_sku_price[j].sku_spec
        })
      }
    }
  },
})