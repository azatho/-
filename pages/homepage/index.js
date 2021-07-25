//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: 'Hi 开发者！',
    userInfo: {},
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
    list_cd: [],
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    load: true,
    modalName: '',
    modalNamegg: '',
    goods_sku_price: [{
        "change_time": "1570872520",
        "is_del": "0",
        "sku_code_image": "",
        "sku_cost_price": "1899800",
        "sku_goods": "46",
        "sku_index": "174",
        "sku_info": "22:25,23:30",
        "sku_inventory": "3",
        "sku_market_price": "2000000",
        "sku_name": "规格 三十年窖藏53度白酒10L装 套装 优惠套装二",
        "sku_pic": "/wineadmin/images/20191012/2019101217283329921_1570872513.png",
        "sku_retail_price": "1500100"
      },
      {
        "change_time": "1570872520",
        "is_del": "0",
        "sku_code_image": "/wine/traceability/20191011/2019101117244455110_http://test.jianyunkeji.net/wineadmin/qurey.php?sing=232722.png",
        "sku_cost_price": "1899900",
        "sku_goods": "46",
        "sku_index": "117",
        "sku_info": "22:24,23:30",
        "sku_inventory": "9",
        "sku_market_price": "2000000",
        "sku_name": "规格 三十年窖藏53度 整箱 套装 优惠套装二",
        "sku_pic": "/wineadmin/images/20190928/2019092811053280898_1569639932.jpg",
        "sku_retail_price": "1500000"
      }
    ],
    goods_sku_property: [{
        "sku_index": "22",
        "sku_name": "规格"
      },
      {
        "sku_index": "23",
        "sku_name": "套装"
      },
      {
        "sku_index": "24",
        "sku_name": "颜色"
      }
    ],
    goods_sku_values: [{
        "sku_index": "25",
        "sku_name": "三十年窖藏53度白酒10L装",
        "sku_parent": "22",
      },
      {
        "sku_index": "24",
        "sku_name": "三十年窖藏53度 整箱",
        "sku_parent": "22",
      },
      {
        "sku_index": "11",
        "sku_name": "优惠套装二",
        "sku_parent": "23",
      },
      {
        "sku_index": "12",
        "sku_name": "优惠套装一",
        "sku_parent": "23",
      },
      {
        "sku_index": "35",
        "sku_name": "黑色",
        "sku_parent": "24",
      },
      {
        "sku_index": "36",
        "sku_name": "白色",
        "sku_parent": "24",
      }
    ],

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    let list = [{}];
    for (let i = 0; i < 6; i++) {
      list[i] = {};
      list[i].name = String.fromCharCode(65 + i);
      list[i].id = i;
    }
    this.setData({
      list_cd: list,
      listCur: list[0]
    })
    this.setData({
      modalName: 'DialogModal'
    })
  },
  moren(){
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
    let list = this.data.list_cd;
    let tabHeight = 0;
    if (this.data.load) {
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
        list_cd: list
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
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        const address = "嘉亿东方大厦"
        wx.openLocation({
          latitude,
          longitude,
          scale: 18,
          address: address
        })
      }
    })
  },
  qd(e) {
    let that = this.data;
    if (that.modalName == '') {
      that.modalName = "Modal";
    } else {
      that.modalName = '';
    }
    this.setData({
      modalName: that.modalName
    })

  },
  gm() {
    wx.navigateTo({
      url: '/pages/tjdd/index',
    })
  },
  submit(event) {

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
  add(e) {
    this.setData({
      modalNamegg: "Modal"
    })
    this.moren();
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
          list[i].isSelect=1;
        }else{
          list[i].isSelect = 0;
        }     
      }
    }
    console.log(list);
    that.setData({
      goods_sku_values: list
    })
  },
  getScancode(){
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    })
  }
})