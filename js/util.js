// 格式化日期:年-月-日
const formatTime = inputTime => {
  const date = new Date(inputTime);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
};
// 格式化日期:年-月-日  时:分:秒
const formatTime1 = inputTime => {
  const date = new Date(inputTime);
  const year = date.getFullYear()
  const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 格式化日期:年/月/日
const formatTime2 = (inputTime,link) => {
  link?link='-':link='/';
  const date = new Date(inputTime);
  const year = date.getFullYear()
  const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  return [year, month, day].map(formatNumber).join(link)
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 加载提示
const showLoad = title => wx.showLoading({
  title: title
});
// 显示繁忙提示
const showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  mask: true,
  duration: 5000
})
// 只显示文字提示
const showText = text => wx.showToast({
  title: text,
  icon: 'none',
})
// 显示成功提示
const showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})
// 显示失败提示
const showModel = (title, content) => {
  wx.hideToast();
  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}
// 动态加载顶部导航title
const topTitle = (topTitle = '简云科技') => {
  wx.setNavigationBarTitle({
    title: topTitle
  })
}
// 手机号正则验证
const mobile = (mobileNum) => {
  return mobileNum.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)
}
// 父子跳转 url:挑转页面的路径
const navTo = url => {
  wx.navigateTo({
    url: url
  })
}
//防抖函数
let timer ='';
const debounce = function(fn,wait){
   let args = arguments;
   let that = this;
   clearTimeout(timer);
   timer = setTimeout(function(){
         fn.apply(that,args)
     },wait)
};
// 平级跳转
const reTo = url => {
  wx.redirectTo({
    url: url
  })
}

// tabBar导航跳转
const swTo = url => {
  wx.switchTab({
    url: url
  })
}
// 返回n级
const navBack = delta => {
  wx.navigateBack({
    delta: delta
  })
}
//倒计时
function countTime(onTime, timer) {
      var hour = Math.floor((timer - onTime) / 60 / 60 % 24);
      var min = Math.floor((timer - onTime) / 60 % 60);
      var sen = Math.floor((timer - onTime) % 60)
      if(hour<10){
         hour = '0'+hour;
      }
      if(min<10){
         min = '0'+min;
      }
      if(sen<10){
         sen = '0'+sen;
      }
      return {
        hour,
        min,
        sen
      }
}
// token
// const token = wx.getStorageSync('userinfo').token || '';
//执行函数
// const setTime = (funCode, sec = 5000) => {
//   setTimeout(() => {
//     funCode;
//   }, sec);
// }
// 输入框验证null/''
const valNull = (param, fun) => {
  if (param === '' || param === null) {
    fun;
    return;
  }
}
// 预览图片
const previewIMG = (current, urls) => {
  wx.previewImage({
    current: current,
    urls: urls
  })
}
// 检测过滤空格
const filterSpace = str => {
  return str.replace(/ /g, '')
}
//登录模态框提示
const showModal = () => {
  wx.showModal({
    title: '提示',
    content: '检测到你还未登录，请先登录！',
    success(res) {
      if (res.confirm) {
        wx.navigateTo({
          url: '/pages/sqdl/index',
        })
      }
    }
  })
}
function  getDay(day) {
  var  today  =  new  Date();
  var  targetday_milliseconds = today.getTime()  +  1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds); //注意，这行是关键代码
  var  tYear  =  today.getFullYear();
  var  tMonth  =  today.getMonth();
  var  tDate  =  today.getDate();
  tMonth  =  doHandleMonth(tMonth  +  1);
  tDate  =  doHandleMonth(tDate);
  return  getDate(tYear + "-" + tMonth + "-" + tDate);
}
function  doHandleMonth(month) {
  var  m  =  month;
  if (month.toString().length  ==  1) {
    m  =  "0"  +  month;
  }
  return  m;
}
//根据时间戳获取当前的天
function getOnDate(timer) {
  var date = new Date(timer);
  var  year  = date.getFullYear();
  var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var number = year + '' + month + '' + day
  return +number;
};
//将时间转换成时间戳
function  getDate(date) {
  var  date  =  new  Date(date);
  var  time  =  date.getTime()
  return  time
}
// 将时间戳转换成日期格式
function  getForm(timer)  {
  var  date  =  new  Date(timer); //获取当前日期
  // var month = date.getMonth() + 1; //获取当前的日期
  var  month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1; //获取当前的日期
  var  day  =  date.getDate(); //获取某一天
  // var weekday = date.getDay(); //获取星期几
  var  weekday = "周" + "日一二三四五六".charAt(date.getDay()); //获取星期几
  var  obj  =  {
    month:  month,
    day:  day,
    weekday:  weekday
  }
  return  obj
}
//千位分隔符
function getFData1000(source, length = 3) {
  source = String(source).split('.')
  source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), '$1,')
  return source.join('.')
}
module.exports = {
  formatTime: formatTime,
  formatTime1: formatTime1,
  formatTime2: formatTime2,
  showBusy: showBusy,
  showSuccess: showSuccess,
  showModel: showModel,
  topTitle: topTitle,
  mobile: mobile,
  showText: showText,
  navTo: navTo,
  reTo: reTo,
  swTo: swTo,
  valNull: valNull,
  previewIMG: previewIMG,
  navBack: navBack,
  filterSpace: filterSpace,
  showLoad: showLoad,
  showModal: showModal,
  getDay: getDay,
  getForm: getForm,
  getFData1000: getFData1000,
  getOnDate: getOnDate,
  countTime: countTime,
  debounce:debounce,
}
