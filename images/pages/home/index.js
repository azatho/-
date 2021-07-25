//index.js
//获取应用实例
import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    cdn: total.config.cdnHost,
    Info: {},
    userInfo: {},
    gginfo: {},
    isRamadhin:'',
    goods_sku_property: {},
    goods_sku_values: {},
    goods_sku_price: {},
    //选中改变属性
    sku_pic: "",
    sku_price: "",
    sku_title: "",
    sku_spec: "",
    number: 1,
    index: 1,
    //定位
    latitude: 0,
    longitude: 0,
    address: "",
    //满减首单优惠
    sdyh: 0,
    mj: "",
    spsl:0,
    CartList:{},
    hasUserInfo: false,
    gradable: false,
    catchtouchmove: false,
    score: "5",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    height: wx.getSystemInfoSync().windowHeight,
    list: ["主营菜单", "评价", "信息"],
    list2: [{
      name: "全部",
      number: "10"
    }, {
      name: "好评",
      number: "11"
    }, {
      name: "中评",
      number: "12"
    }, {
      name: "差评",
      number: "13"
    }, {
      name: "有图",
      number: "14"
    }],
    list3: ['https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
      'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
      'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
      'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'
    ],
    tabcur: 0,
    pjflcur: 0,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    load: true,
    modalName: '',
    modalNamegg: '',
    merchant_id: ''
  },
  //获取信息
  getShopInfo() {
    let that = this;
    ajax(total.config.getShopInfo, 'GET', {
      token: wx.getStorageSync("token"),
    }, res => {
      if (res.success) {
        let mj = ""
        let sdyh = res.data.activityList[1].acticity_detail[0].first_cash / 100;
        for (let index = 0; index < res.data.activityList[0].acticity_detail.length; index++) {
          mj = mj + res.data.activityList[0].acticity_detail[index].msg + " "
        }
        for (let i = 0; i < res.data.categoryList.length; i++) {
          res.data.categoryList[i].id = i;
        }
        that.setData({
          Info: res.data,
          latitude: res.data.merInfo.merchant_latitude,
          longitude: res.data.merInfo.merchant_longitude,
          address: res.data.merInfo.merchant_address,
          sdyh: sdyh,
          mj: mj,
          merchant_id: res.data.merInfo.merchant_id
        });
        if(that.data.Info.number=='暂无桌号'){
            that.setData({
              isRamadhin:'DialogModal'
            })
        }else{
          that.setData({
            isRamadhin:''
          })
        }
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
        console.log(res.data);
        that.setData({
          number: 1,
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
        if (res.data.goods_sku_values.length != 0) {
          that.setData({
            modalNamegg: "Modal"
          })
        } else {
          that.addModifyUserCart(that.data.dishes_id, that.data.sku_info, that.data.number);
          that.setData({
            modalNamegg: ""
          })
        }
       
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  //加入购物车
  addModifyUserCart(dishes_id, sku_info, count) {
    console.log(dishes_id)
    console.log(sku_info)
    console.log(count)
    let that = this;
    ajax(total.config.addModifyUserCart, 'GET', {
      token: wx.getStorageSync("token"),
      dishes_id: dishes_id,
      sku_info: sku_info,
      count: count
    }, res => {
      if (res.success) {
        console.log(res);
        that.setData({
          modalNamegg: "",
        });
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
        console.log(res);
        if (res.data.list.length == 0) {
          that.data.modalName = "";
        } else if (that.data.modalName == 'Modal') {
          that.data.modalName = "";
        } else {
          that.data.modalName = 'Modal';
          that.setData({
            modalName: that.data.modalName,
            CartList: res.data.list
          })
        }
        
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {

  },
  onShow: function () {
    this.getShopInfo();
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
    console.log(lists);
    that.setData({
      goods_sku_values: lists
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    setTimeout(function() {
      wx.stopPullDownRefresh();
      console.log("stop");
    }, 3000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  tabSelect(e) {
    this.setData({
      tabcur: e.currentTarget.dataset.id
    })
  },
  pjflSelect(e) {
    this.setData({
      pjflcur: e.currentTarget.dataset.id
    })
  },
  tabSelectcp(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = that.data.Info.categoryList;
    let tabHeight = 0;
    if (that.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        categoryList: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  dh() {
    let that = this.data;
    wx.openLocation({
      latitude: Number(that.latitude),
      longitude: Number(that.longitude),
      scale: 18,
      address: that.address
    });
  },
  qd(e) {
    this.getUserCartList();
  },
  gm() {
    if(this.data.isRamadhin == 'DialogModal'){
      this.setData({
        modalName: this.data.isRamadhin 
      })
      return    
    }
    wx.navigateTo({
      url: '/pages/tjdd/index',
    })
  },
  //加减器触发事件
  submit(event) {

    this.setData({
      number: event.detail.number
    })
    console.log(event);
  },
  updateCartQuantity(){
    let that = this;
    ajax(total.config.updateCartQuantity, 'GET', {
      token: wx.getStorageSync("token"),
      cart_id:"",
      count:""
    }, res => {
      if (res.success) {
        console.log(res);
        if (res.data.list.length == 0) {
          that.data.modalName = "";
        } else if (that.data.modalName == 'Modal') {
          that.data.modalName = "";
        } else {
          that.data.modalName = 'Modal';
          that.setData({
            modalName: that.data.modalName,
            CartList: res.data.list
          })
        }

      } else {
        total.util.showText(res.msg)
      }
    })
  },
  //加入购物车事件
  addCart(event) {
    let that = this;
    that.addModifyUserCart(that.data.dishes_id, that.data.sku_info, that.data.number);
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: '',
      modalNamegg: ''
    })
  },
  //选择规格加入购物车
  add(e) {
    console.log(e.currentTarget.dataset.dishesid)
    this.getDishesSkuInfo(e.currentTarget.dataset.dishesid);
  },
  setting() {
    wx.navigateTo({
      url: '/pages/setting/index',
    })
  },
  spxq() {
    wx.navigateTo({
      url: '/pages/spxq/index',
    })
  },
  select(e) {
    let that = this;
    console.log(e.target.dataset.id);
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
    console.log(list);
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
    console.log(sku_info);
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
  getScancode() {
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    })
  },
  //扫描桌号
  saoyisao(){
    this.getScancode()
  },
  // 点击预约
  yuyue(){
    if(!wx.getStorageSync("token")){
      total.util.showModal()
      return 
    }
    wx.navigateTo({
      url: '/pages/reservation/index?id=' + this.data.merchant_id,
    })
  }
})