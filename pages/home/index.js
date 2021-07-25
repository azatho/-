//index.js
//获取应用实例
import total from '../../js/total.js'
import {
  ajax
} from '../../js/ajax.js'
const app = getApp()

Page({
  data: {
    help:"",
    showModel2:false,
    shopClose:false,
    loding: true,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    cdn: total.config.cdnHost,
    Info: {},
    userInfo: {},
    gginfo: {},
    isRamadhin: '',
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
    spsl: 0,
    CartList: {},
    hasUserInfo: false,
    gradable: false,
    catchtouchmove: false,
    score: "4",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    height: wx.getSystemInfoSync().windowHeight,
    list: ["主营商品", "评价", "信息"],
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
    merchant_id: '',
    imgList: [],
    order_number: '',
    order_money: '',
    CarList: [], //存储购物车数据
    total_count: 0,
    total_cash: 0,
    fromDate: [],
    subscribe_id: '',
    login_info: '',
    is_server:0
  },
  // onLoad(e){
  //   console.log(e)
    
  // },
  //获取信息
  getShopInfo() {
    let that = this;
    ajax(total.config.getShopInfo, 'GET', {
      token: wx.getStorageSync("token"),
      appid:wx.getAccountInfoSync().miniProgram.appId,
      subscribe_id: this.data.subscribe_id || '',
      login_info: this.data.login_info || ''
    }, res => {
      if (res.success) {
         that.setData({
           loding: false,
         })
        let mj = "";
      if(res.data.activityList.length){
        this.setData({
          sdyh:res.data.activityList[1] && res.data.activityList[1].acticity_detail[0].first_cash / 100
        })
        for (let index = 0; index < res.data.activityList[0].acticity_detail.length; index++) {
          mj = mj + (res.data.activityList[0] && res.data.activityList[0].acticity_detail[index].msg ||'') + " "
        }
        for (let i = 0; i < res.data.categoryList.length; i++) {
          res.data.categoryList[i].id = i;
        }
      }
      let shopCloseStatus ='';
      res.data.merInfo.is_work_time=='0'?shopCloseStatus=false:shopCloseStatus=true;
        this.allMenu(res.data.categoryList)
        that.setData({
          Info: res.data,
          shopClose:shopCloseStatus,
          latitude: res.data.merInfo.merchant_latitude,
          longitude: res.data.merInfo.merchant_longitude,
          address: res.data.merInfo.merchant_address,
          mj: mj,
          merchant_id: res.data.merInfo.merchant_id
        });
        //将门店id存储本地
        wx.setStorage({
          key:"merchant_id",
          data:that.data.merchant_id
        })
        wx.setStorage({
          key:"merchant_name",
          data:that.data.Info.merInfo.merchant_name
        })
        wx.setStorage({
          key:"merchant_logo",
          data:that.data.Info.merInfo.logo
        })
        if (that.data.Info.number=='') {
          that.setData({
            isRamadhin: 'DialogModal'
          })
        } else {
          that.setData({
            isRamadhin: ''
          })
        }
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  //将所有的菜品数据的数据统一放到一个数组里边存入本地
  allMenu(Info) {

  },
  // 关闭店铺打烊弹窗
  closeMask(){
    let mask1=!this.shopClose
    this.setData({
      shopClose:mask1
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
       
        if (res.data.goods_sku_values.length != 0) {
          that.setData({
            modalNamegg: "Modal"
          });
        }
      } else {
        // total.util.showText(res.msg)
      }
    })
  },
  //加入购物车
  addModifyUserCart(fromDate) {
    let that = this;
      ajax(total.config.addModifyUserCart + '&token=' + wx.getStorageSync('token'), 'POST', {
        data: JSON.stringify(fromDate)
      }, res => {
        if (res.success) {
          // that.getShopInfo();
          that.getCartNumCash();
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
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    console.log(options)
    if(options.help){
      this.data.help=options.help
    }
    this.data.subscribe_id = options.subscribe_id || '';
    this.data.login_info = options.scene  || '';
  },
  onShow: function () {
    this.setData({
      is_server:parseInt(wx.getStorageSync('is_server'))
    });
    this.firstGetUserCartList();
    this.getCartNumCash();
    this.overdueClear();
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
  //从本地读取数据，过期清除本地菜单缓存，发起新的请求
  overdueClear() {
    this.getShopInfo();
  },
  // 获取评价
  tabSelect(e) {
    this.setData({
      tabcur: e.currentTarget.dataset.id
    })
    this.setData({
      pjflcur: 0
    })
    if (this.data.tabcur == 1) {
      this.pjflSelect(0)
    }
  },
  // 评价分类
  pjflSelect(e) {
    if (e == 0) {
      this.data.pjflcur = 0
    } else {
      this.setData({
        pjflcur: e.currentTarget.dataset.id
      })
    }
    ajax(total.config.getCommonList, 'GET', {
      token: wx.getStorageSync("token"),
      type: this.data.pjflcur
    }, res => {
      if (res.success) {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].comment_time = total.util.formatTime2((res.data[i].comment_time) * 1000)
        }
        this.setData({
          list3: res.data
        })
      } else {
        // total.util.showText(res.msg)
      }
    })
  },
  getImgs(e) {
    var list = e.currentTarget.dataset.id
    this.data.imgList = []
    for (let i = 0; i < list.length; i++) {
      this.data.imgList.push(total.config.cdnHost + list[i])
    }
  },
  // 点击预览图片
  imgSelect(e) {
    var current = e.currentTarget.dataset.img
    var a = total.config.cdnHost + e.currentTarget.dataset.img
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.imgList, // 需要预览的图片http链接列表
      // success:function(){
      //   wx.saveImageToPhotosAlbum({
      //     filePath: 'filePath',
      //   })
      // }
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
    } else {
      that.setData({
        load: true,
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
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
    if (this.data.total_count === 0) {
      return total.util.showText('请先选择商品')
    }
    this.getUserCartList();
  },
  gm() {
    if (!wx.getStorageSync("token")) {
      total.util.showModal()
      return
    }
    if (this.data.total_count === 0) {
      return total.util.showText('请先选择商品')
    }
    console.log(this.data.isRamadhin)
    if (this.data.isRamadhin == 'DialogModal') {
      this.setData({
        modalName: this.data.isRamadhin
      })
      return
    }
    if (this.shopClose){
      total.util.showText('店铺已打烊，暂不接受新的订单');
      return
    }
    if(this.data.Info instanceof Object){
      wx.navigateTo({
        url: '/pages/tjdd/index?subscribe_id='+ this.data.subscribe_id+'&number_name='+this.data.Info.number_name+'&number='+this.data.login_info+'&help='+this.data.help
      })
    }else{
      wx.navigateTo({
        url: '/pages/tjdd/index?subscribe_id='+ this.data.subscribe_id ||''
      })
    }
  },
  //购物车加减器触发事件
  add_cartList(event) {
    var dishes_id = event.currentTarget.dataset.item.dishes_id;
    var sku_id = event.currentTarget.dataset.item.sku_id;
    var cart_id = event.currentTarget.dataset.item.cart_id;
    var attributes_id = event.currentTarget.dataset.item.attributes_id;
    var sku_info = sku_id + "," + attributes_id;
    var count = '';
    for (var i = 0; i < this.data.CartList.length; i++) {
      if (this.data.CartList[i].dishes_id === dishes_id) {
        if (this.data.CartList[i].sku_id==sku_id){
          if (this.data.CartList[i].dishes_limit==1){
            if(parseInt(this.data.CartList[i].count) >=parseInt(this.data.CartList[i].left_count) ){
              total.util.showText("该商品超出限购数量，请重新选择")
              return
            }else{
                this.data.CartList[i].count++;
                count = this.data.CartList[i].count;
            }
          }else{
              this.data.CartList[i].count++;
              count = this.data.CartList[i].count;
          }
        break;
        }

      }
    }
    this.setData({
      CartList: this.data.CartList
    })
    //单规格商品
    if (sku_id === '0') {
      this.addModifyUserCart([{ dishes_id: dishes_id, sku_info: '', count: count }]);
    } else { // 多规格商品
      this.addModifyUserCart([{ dishes_id: dishes_id, sku_info: sku_info, count: count }]);
    }
  },
  //购物车删除商品按钮
  delet_cartList(event) {
    var sku_id = event.currentTarget.dataset.item.sku_id;
    var dishes_id = event.currentTarget.dataset.item.dishes_id;
    var attributes_id = event.currentTarget.dataset.item.attributes_id;
    var sku_info = sku_id + "," + attributes_id;
    var count = '';
    for (var i = 0; i < this.data.CartList.length; i++) {
      if (this.data.CartList[i].dishes_id === dishes_id) {
        if(this.data.CartList[i].sku_id==sku_id){
          this.data.CartList[i].count--;
          count = this.data.CartList[i].count
          if (this.data.CartList[i].count == 0) {
            this.data.CartList.splice(i, 1)
          }
          break;
        }

      }
    }
    this.setData({
      CartList: this.data.CartList,
    })
    //单规格商品
    if (sku_id === '0') {
      this.addModifyUserCart([{ dishes_id: dishes_id, sku_info: '', count: count }]);
    } else { // 多规格商品
      this.addModifyUserCart([{ dishes_id: dishes_id, sku_info: sku_info, count: count }]);
    }
    
  },
  updateCartQuantity() {
    let that = this;
    ajax(total.config.updateCartQuantity, 'GET', {
      token: wx.getStorageSync("token"),
      cart_id: "",
      count: ""
    }, res => {
      if (res.success) {
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
        // total.util.showText(res.msg)
      }
    })
  },
  //加入购物车事件
  confirm(event) {
    let that = this;
    let count = 1;
    for (var i = 0; i < this.data.Info.categoryList.length; i++) {
      for (var j = 0; j < this.data.Info.categoryList[i].dishes.length; j++) {
        if (this.data.Info.categoryList[i].dishes[j].dishes_id === that.data.dishes_id) {
          count = ++this.data.Info.categoryList[i].dishes[j].cart_count;
          this.setData({
            Info: this.data.Info
          })
        }
      }
    }
    let skuCount =1;
    for (let a of this.data.CartList){
      if (a.dishes_id==that.data.dishes_id){
         if (a.sku_id==that.data.sku_info){
           skuCount=parseInt(a.count)+1
           break
         } 
      }
     }
    this.addModifyUserCart([{ dishes_id: that.data.dishes_id, sku_info: that.data.sku_info, count: skuCount }]);
    wx.setStorage({
      data: this.data.Info,
      key: 'Info',
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.getShopInfo();
    this.setData({
      modalName: '',
      modalNamegg: ''
    })
  },
  //选择规格加入购物车
  add(e) {
    console.log(e)
    total.util.debounce.call(this,function(){
      var id = e.currentTarget.dataset.dishesid //菜品id
      if (!wx.getStorageSync("token")) {
        total.util.showModal()
        return
      }
      if (e.currentTarget.dishes_limit=='1' && e.currentTarget.dataset.count == '0') {
        total.util.showText('库存不足')
        return
      }
      let a=parseInt(e.currentTarget.dataset.dishes_count)
      if (e.currentTarget.dishes_limit=='0'&& parseInt(e.currentTarget.dataset.count)>=a) {
        total.util.showText('超出限购数量，请重新选择')
        return
      }
      this.addCart(true, id, this.data.Info.categoryList)
    },100);
  },
  //删除商品
  delet(e) {
    var id = e.currentTarget.dataset.dishesid //菜品id
    this.addCart(false, id, this.data.Info.categoryList)
  },
  // 首页菜单加减选择
  addCart(IsAdd, id, arr) {
    // CartList
    var that = this;
    if (IsAdd) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].dishes.length; j++) {
          if (this.data.Info.categoryList[i].dishes[j].dishes_id == id) {
            // 判断是否是多规格属性
            if (+this.data.Info.categoryList[i].dishes[j].sku_id > 0) {
              ajax(total.config.getUserCartList, 'GET', {
                token: wx.getStorageSync("token")
              }, res => {
                if (res.success) {
                  that.setData({
                    CartList: res.data.list
                  })
                }
              })
             this.getDishesSkuInfo(id);
              //如果是多规格属性请求套餐规格
            } else {
              this.data.Info.categoryList[i].dishes[j].cart_count++;
              this.allMenu(this.data.Info.categoryList)
              // 单规格的发起请求
              this.addModifyUserCart([{ dishes_id: this.data.Info.categoryList[i].dishes[j].dishes_id, sku_info: '', count: this.data.Info.categoryList[i].dishes[j].cart_count }])
            }
          }
        }
      }
    } else {
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].dishes.length; j++) {
          if (this.data.Info.categoryList[i].dishes[j].dishes_id == id) {
            // 判断是否是多规格属性
            if (this.data.Info.categoryList[i].dishes[j].sku_id > 0) {
              return total.util.showText('多规格商品请在购物车中取消')
            } else {
              this.data.Info.categoryList[i].dishes[j].cart_count--;
              this.addModifyUserCart([{ dishes_id: this.data.Info.categoryList[i].dishes[j].dishes_id, sku_info: '', count: this.data.Info.categoryList[i].dishes[j].cart_count }])
            }
          }
        }
      }
    }
    //将数量存储在本地
    wx.setStorage({
      data: that.data.Info,
      key: 'Info',
      success() {
        that.setData({
          Info: wx.getStorageSync('Info')
        })
      }
    })
  },
  //点击加减计算购物车数量和金额
  calculate(count, allMoney, id) {

  },
  setting() {
    wx.navigateTo({
      url: '/pages/setting/index',
    })
  },
  spxq(e) {
    wx.navigateTo({
      url: '/pages/spxq/index?dishes_id=' + e.currentTarget.dataset.item.dishes_id,
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
  getScancode() {
    wx.scanCode({
      success:(res)=> {
        console.log(res);
        this.data.subscribe_id = this.getQueryString('subscribe_id',res.path);
        this.data.login_info = this.getQueryString('scene',res.path);
        this.getShopInfo();
      }
    })
  },
 getQueryString(name,path){
   console.log(name,path);
    var arr = path.split('?')[1].split('&');
    var result = '';
    for(var i =0;i<arr.length;i++){
      if(name==arr[i].split('=')[0]){
           result = arr[i].split('=')[1]
           break;
      }
    }
    return result;
},
  //购物车列表数据
  getUserCartListData() {
    let that = this;
    ajax(total.config.getUserCartList, 'GET', {
      token: wx.getStorageSync("token")
    }, res => {
      if (res.success) {
        that.setData({
          CartList: res.data.list
        })
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  //扫描桌号
  saoyisao() {
    this.getScancode()
  },
  // 点击预约
  yuyue() {
    if (!wx.getStorageSync("token")) {
      total.util.showModal()
      return
    }
    wx.navigateTo({
      url: '/pages/reservation/index?id=' + this.data.merchant_id + '&merchant_name=' + this.data.Info.merInfo.merchant_name + '&logo=' + this.data.Info.merInfo.logo,
    })
  },
  //我要打包
  hideModaodal() {
    this.setData({
      modalName: ''
    })
    wx.navigateTo({
      url: '/pages/tjdd/index?number=' + this.data.Info.number,
    })
  },
  //清空商品
  clearGoods() {
    var cart_id = ''
    var arr = []
    for (let i = 0; i < this.data.CartList.length; i++) {
      arr.push(this.data.CartList[i].cart_id)
    }
    this.data.CartList = ''
    cart_id = arr.join(",");
    this.deleteCart(cart_id);
  },
  //删除购物车方法
  deleteCart(id) {
    ajax(total.config.deleteCart, 'GET', {
      token: wx.getStorageSync("token"),
      cart_id: id,
    }, res => {
      if (res.success) {
        this.getShopInfo();
        this.getCartNumCash();
        this.setData({
          modalName: ''
        })
      } else {
        total.util.showText(res.msg)
      }
    })
  },
  // 首次进来获取购物车列表
  firstGetUserCartList() {
    ajax(total.config.getUserCartList, 'GET', {
      token: wx.getStorageSync("token")
    }, res => {
      if (res.success) {
        this.data.CartList = res.data.list
      } else {
        // total.util.showText(res.msg)
      }
    })
  },
  //获取购物车数量和金额
  getCartNumCash() {
    ajax(total.config.getCartNumCash, 'GET', {
      token: wx.getStorageSync("token")
    }, res => {
      if (res.success) {
        this.setData({
          total_count: res.data.total_count,
          total_cash: res.data.total_cash
        })
      } else {
        // total.util.showText(res.msg)
      }
    })
  }
})