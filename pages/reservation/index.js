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
      nowDate:{},// 系统当前时间 , 用于判断可选的预约时间
      CDN_IMG:'',
      cdn: total.config.cdnHost,
      index:0,
      currentDate:'',
      currentTime:'',
      selectDate:false,
      timeSelect: false,
      SelectPackage:false,
      qtsr:false,
      zuo_tai:false,
      boxList: [],
      setmealList: [],
      select: 0,
      select_time:0,
      xz_ycrs:0,
      select_icon:'',
      choice_list: '',
      merchant_id: '',
      MerCash:'',
      merchant_name:'',
      logo:'',
      menu_list:[],
      zhuo_tai_xinxi:[],
      select_son:0,
      unwind:"",
      select_area:0,
      selectPay:0,
      oneButton: [{text: '确定',extClass:'comfirme'}],
      formDate: {
        token:'',
        merchant_id: '',
        subscribe_datetime: '',
        subscribe_time: '',
        subscribe_seat: '',
        subscribe_number: 1,
        subscribe_name: '',
        subscribe_sex: '女士',
        subscribe_phone: '',
        subscribe_chose: '',
        subscribe_remark: '',
        subscribe_type:108
      },
      area_list:[],
      flag:false,
      sekectPackage:'请选择套餐',
      zuo_tai_xinxi:'',
      zuo_tai_qx:'请选择桌台信息',
      classify_name:'',
      gender:['女士','男士'],
      genderIndex:0,
      dialogShow:false,
      isTaoCan:false,
      checked1:false,
      checked2:false,
      isSelectTao:true,//是否选择了套餐,
      tao_can_price:'',
      
  },
  checkedbz(){
    this.setData({
      checked1:!this.data.checked1,
      checked2:!this.data.checked1
    })
  },
  checkedtc(){
    this.setData({
      checked1:!this.data.checked1,
      checked2:!this.data.checked1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      merchant_id: options.id,
      merchant_name:options.merchant_name,
      logo:options.logo
    })
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
    this.getCurrentDate();
     this.originTime();
     this.getSeatClassifyList();
     this.data.formDate.token = wx.getStorageSync("token");
     this.getMerCash();
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
    this.data.formDate.subscribe_datetime = total.util.getDay(0)/1000
  },
  //预约日期弹窗
  yuyueDate(){
     this.setData({
      selectDate:true,
     }) 
    var arr = [];
    var arr1 = [];
    for(var i=0;i<7;i++) {
      arr.push(total.util.getDay(i))
      arr1.push(total.util.getForm(arr[i]))
    }
    this.setData({
      boxList: arr1
    })
  },
  Shut_down(){
    this.setData({
      selectDate:false,
      timeSelect:false,
      SelectPackage:false,
      Booking_meal:false,
      zuo_tai:false
     }) 
  },
  slelectedBox(e){
    var index =e.currentTarget.dataset.index;
    var obj = total.util.getForm(total.util.getDay(index));
    this.data.formDate.subscribe_datetime = total.util.getDay(index)/1000;
    this.setData({
      select: e.currentTarget.dataset.index,
      currentDate: obj.month + '-' + obj.day,
    })
  },
  setmeal(e){
    var obj = e.currentTarget.dataset
    console.log(obj)
    this.data.formDate.choice_id=obj.choice_time.choice_id
    this.data.formDate.subscribe_time = obj.choice_time.choice_text + ' ' + obj.choice_time.start_time + '-' + obj.choice_time.end_time;
    this.getChoiceTCList(obj.choice_time.choice_chose);
    this.setData({
      select_time: obj.index,
      currentTime:obj.choice_time.choice_text+' '+obj.choice_time.start_time+'-'+obj.choice_time.end_time
    })
  },
  fix(){
    this.setData({
      selectDate:false,
     })
  },
  originTime(){
     ajax(total.config.getChoiceList, 'GET', {
        token: wx.getStorageSync("token"),
        merchant_id: this.data.merchant_id,
        date:""
      }, res => {
        if (res.success) {
          let time =this.getNowHouse()
          console.log(time)
          let i=0;
          res.data.list.map(el=>{
            el.end_time_num=parseInt(el.end_time.substring(0,2))
            el.start_time_num=parseInt(el.start_time.substring(0,2))
            time<el.end_time_num?el.status=1:el.status=0
            return el
          })
          console.log(res.data.list)
          for(i;i<res.data.list.length;i++){
            if(res.data.list[i].status==1){
              this.data.select_time=i;
              break
            }
          }
          console.log(i)
           // 获取套餐列表
          this.getChoiceTCList(res.data.list[0].choice_chose);
          this.setData({
            currentTime :res.data.list[i].choice_text+' '+res.data.list[i].start_time+'-'+res.data.list[i].end_time,
            nowDate:time,
            choice_list:res.data.list,
            select_time:this.data.select_time
          })
          console.log(res.data.list)
          this.data.formDate.choice_id = res.data.list[i].choice_id;
          this.data.formDate.subscribe_time = res.data.list[i].choice_text + ' ' + res.data.list[i].start_time + '-' + res.data.list[i].end_time;
        } else {
          total.util.showText(res.msg)
        }
      })
  },
  // 获取套餐列表
  getChoiceTCList(id){
     ajax(total.config.getChoiceTCList, 'GET', {
        token: wx.getStorageSync("token"),
        merchant_id: this.data.merchant_id,
        choice_chose: id,
      }, res => {
        if (res.success) {
          this.setData({
            setmealList: res.data.list
          })
        } else {
          total.util.showText(res.msg)
        }
      })
  },
  // 获取当前时间
  getNowHouse(){
    let myDate=new Date();
    let nowHouseTime=parseInt(myDate.getHours());
    return nowHouseTime
  },
  originDate(){
      this.setData({
      SelectPackage: true,
    })
  },
  sureBtn(){
    this.setData({
      SelectPackage: false,
      zuo_tai:false,
      Booking_meal:false
    })
  },
  originPackage(){
    this.setData({
      SelectPackage: true
    })
  },
  appointment(){
    this.setData({
      Booking_meal:true
    })
  },
  isSelectIcon(e){
    var index = e.currentTarget.dataset.index;
    var tao_can_id =  e.currentTarget.dataset.tao_can_id;
    var tao_can_content = e.currentTarget.dataset.tao_can_content;
    var tao_can_name = e.currentTarget.dataset.tao_can_name;
    var price = e.currentTarget.dataset.price;
    if(this.data.flag){
      this.setData({
        select_icon:index,
        sekectPackage:tao_can_name,
        flag:false,
        isSelectTao:false,
        tao_can_price:price,
       })
      this.getTCList(tao_can_content)
      this.data.formDate.subscribe_type=106
      this.data.formDate.subscribe_chose = tao_can_id
    }else if(index!==this.data.select_icon){
      this.setData({
        select_icon:index,
        sekectPackage:tao_can_name,
        flag:false,
        isSelectTao:false,
        tao_can_price:price
       })
      this.getTCList(tao_can_content)
      this.data.formDate.subscribe_type=106 
      this.data.formDate.subscribe_chose = tao_can_id
    }else{
      this.setData({
        select_icon:"",
        sekectPackage:"请选择套餐",
        flag:true,
        isSelectTao:true,
        tao_can_price:''
       })
       if(this.data.MerCash==0){
         this.data.formDate.subscribe_type = 0
       }
       this.data.formDate.subscribe_chose = ''
    }
  },
  //获取菜品详情
  getTCList(id){
    this.setData({
      CDN_IMG:total.config.cdnHost
    })
    ajax(total.config.getTCList, 'GET', {
        token: wx.getStorageSync("token"),
        tao_can_content: id,
      }, res => {
        if (res.success) {
          this.setData({
            menu_list:res.data.list
          })
         } else {
          total.util.showText(res.msg)
        }
      })
  },
  //桌台信息
  Information_desk(){
    this.setData({
      zuo_tai:true
    })
  },
  //获取桌台信息
  getSeatClassifyList(){
    ajax(total.config.getSeatClassifyList, 'GET', {
          token: wx.getStorageSync("token"),
          merchant_id:this.data.merchant_id
        }, res => {
          if (res.success) {
            this.setData({
              area_list:res.data.list,
              zhuo_tai_xinxi:res.data.list[0].son,
              zuo_tai_xinxi: res.data.list[0].son[0].region_name+" "+res.data.list[0].son[0].min_people+'-'+res.data.list[0].son[0].max_people+'人'+' '+'方桌',
              zuo_tai_qy:res.data.list[0].classify_name,
            })
            this.data.formDate.subscribe_seat=res.data.list[0].son[0].region_id;
           } else {
            total.util.showText(res.msg);
          }
        })
  },
  click_qt(){
    this.setData({
      qtsr:true
    })
  },
  Lose_focus(e){
    var index = e.currentTarget.dataset.index;
    this.data.formDate.subscribe_number = index+1;
    this.setData({
      qtsr:false,
      xz_ycrs:index
    })
  },
  inputContent(e){
     this.setData({
      xz_ycrs:''
    })
    this.data.formDate.subscribe_number = e.detail.value
  },
  xz_area(e){
    var index = e.currentTarget.dataset.index; 
    var sonArry = e.currentTarget.dataset.son;
    this.data.classify_name = e.currentTarget.dataset.classify_name;
    this.setData({
      select_area:index,
      zhuo_tai_xinxi:sonArry,
      zuo_tai_qy:this.data.classify_name,
      zuo_tai_xinxi:sonArry.length!==0?sonArry[0].region_name+' '+sonArry[0].min_people+'-'+sonArry[0].max_people+"人 "+"方桌":''
    })
  },
  is_select_son(e){
     var index = e.currentTarget.dataset.index; 
     var region_id = e.currentTarget.dataset.region_id;
     var zuo_tai_list = e.currentTarget.dataset.zuo_tai_list;
     this.data.formDate.subscribe_seat = region_id;
     this.setData({
      select_son:index,
      zuo_tai_xinxi:zuo_tai_list
    })
  },
  checkGender(e){
    var index = e.currentTarget.dataset.index;
    var item  = e.currentTarget.dataset.item;
    this.data.formDate.subscribe_sex = item;
    this.setData({
      genderIndex:index
    }) 
  },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
  // 姓名
  oninput_name(e){
    var name = e.detail.value
    this.data.formDate.subscribe_name =name
  },
  // 联系电话
  oninput_phone(e){
    var phone = e.detail.value
    this.data.formDate.subscribe_phone =phone
  },
  // 其他信息
  input_qtxinxi(e){
    var remark = e.detail.value
    this.data.formDate.subscribe_remark =remark
  },
  //立即预约
  submitSub(){
    if(!this.data.formDate.subscribe_name)return total.util.showText('请输入您的姓名');
    if(!this.data.formDate.subscribe_phone)return total.util.showText('请输入您的联系电话');
    var obj =  this.data.formDate;
    // wx.navigateTo({
    //   url: '/pages/qrzf/index',
    // })
     ajax(total.config.submitSub,'GET',obj,res => {
            if (res.success) {
                 if(res.data.type=='0'){//没有付保证金
                  total.util.showText(res.msg);
                  // 跳转至我的预约页面
                  setTimeout(() => {
                    wx.navigateTo({
                      url: '/pages/yuyue/index',
                    })
                  }, 1000);
                }else{
                   wx.navigateTo({
                     url: '/pages/qrzf/index?money='+res.data.money+'&order_id='+res.data.order_id+'&type='+res.data.type,
                   })
                }
             } else {
              total.util.showText(res.msg);
            }
          })
  },
  zfbzj(){
    this.data.formDate.subscribe_type =108;
  },
  zftcfy(){
    this.data.formDate.subscribe_type =106;
  },
  //获取商家设置的保证金
  getMerCash(){
    var that = this;
    ajax(total.config.getMerCash,'GET',{
      token: wx.getStorageSync("token"),
      merchant_id: this.data.merchant_id, 
    },res => {
          if (res.success) {
            that.setData({
              MerCash:res.data/100
            })
            if(that.data.MerCash==0){
              that.data.formDate.subscribe_type = 0
            }
           } else {
            total.util.showText(res.msg);
          }
    })
  }
})