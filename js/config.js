// 开发环境
const host = 'https://test.jianyunkeji.net/';
const cdnHost = 'https://cdn.jianyunkeji.net/';
// 生产环境
// const host = 'https://h5.jianyunkeji.cn/';
// const cdnHost = 'https://cdn.jianyunkeji.cn/';
const projectName = 'store';
const config = {
  host,
  projectName,
  cdnHost,
  register: `${projectName}/api/mall.php?c=register`,//用户授权登录
  getWechatPhone: `${projectName}/api/mall.php?c=getWechatPhone`,//获取用户手机号
  loginOut: `${projectName}/api/mall.php?c=loginOut`,//用户退出登录
  getUserInfo: `${projectName}/api/mall.php?c=getUserInfo`,//获取用户信息
  getMyBalance: `${projectName}/api/mall.php?c=getMyBalance`,//获取用户信息
  getShopInfo: `${projectName}/api/mall.php?c=getShopInfo`,//获取首页信息
  getDishesSkuInfo: `${projectName}/api/mall.php?c=getDishesSkuInfo`,//获取商品规格信息
  addModifyUserCart: `${projectName}/api/mall.php?c=addModifyUserCart`,//加入购物车
  getUserCartList: `${projectName}/api/mall.php?c=getUserCartList`,//购物车列表
  updateCartQuantity: `${projectName}/api/mall.php?c=new/updateCartQuantity`,//修改购物车数量
  deleteCart: `${projectName}/api/mall.php?c=deleteCart`,//删除购物车商品
  getMyOrderList: `${projectName}/api/mall.php?c=getMyOrderList`,//订单列表
  getOrderInfo: `${projectName}/api/mall.php?c=getOrderInfo`,//订单详情
  editEatLater: `${projectName}/api/mall.php?c=editEatLater`,//立即出餐
  addComment: `${projectName}/api/mall.php?c=addComment`,//发表评论
  getMyCommonList: `${projectName}/api/mall.php?c=getMyCommonList`,//获取评论
  feedback: `${projectName}/api/mall.php?c=feedback`,//意见反馈
  getHelpList: 'OffStoreMapi/api.php?c=help/getHelpListV2',//帮助中心
  getChoiceList: `${projectName}/api/mall.php?c=subscribe/choiceList`, //预约时间列表
  getChoiceTCList: `${projectName}/api/mall.php?c=subscribe/getChoiceTCList`, //获取预约选项套餐信息
  getTCList: `${projectName}/api/mall.php?c=subscribe/getTCList`, //获菜品详情
  getSeatClassifyList: `${projectName}/api/mall.php?c=subscribe/seatClassifyList`, //获取桌台信息
  submitSub: `${projectName}/api/mall.php?c=subscribe/submitSub`, //立即预约
  getSubscribePayInfo: `${projectName}/api/mall.php?c=subscribe/getSubscribePayInfo`, //获取支付金额
  paySubscribe: `${projectName}/api/mall.php?c=subscribe/paySubscribe`, //余额支付预约订单
  deleteCart: `${projectName}/api/mall.php?c=deleteCart`, //支付预约订单
  getCommonList: `${projectName}/api/mall.php?c=getCommonList`, //评论列表
  getNewsList: `${projectName}/api/mall.php?c=account/getNewsList`, //帮助中心，常见问题
  invitation: `${projectName}/api/mall.php?c=subscribe/subInfo`, //好友扫码详情
  getDishesDetail: `${projectName}/api/mall.php?c=getDishesDetail`, //获取菜单详情
  getUserCash: `${projectName}/api/mall.php?c=subscribe/getUserCash`, //获取余额
  getMerCash: `${projectName}/api/mall.php?c=subscribe/getMerCash`, //获取商家设置的保证金
  subList: `${projectName}/api/mall.php?c=subscribe/subList`, //获取我的预约列表
  subInfo: `${projectName}/api/mall.php?c=subscribe/subInfo`, //获取预约详情
  getRechargeList: `${projectName}/api/mall.php?c=account/getRechargeList`,//获取充值金额列表
  rechargeOrder: `${projectName}/api/mall.php?c=rechargeOrder`, //微信充值接口
  getCartNumCash: `${projectName}/api/mall.php?c=cart/getCartNumCash`, //获取购物车菜品的数量和金额
  submitOrder: `${projectName}/api/mall.php?c=submitOrder`, //购物车提交订单
  payOrder: `${projectName}/api/mall.php?c=payOrder`, //支付订单
  addUserCash: `${projectName}/api/mall.php?c=addUserCash`, //收下红包
  sharePayOrder: `${projectName}/api/mall.php?c=sharePayOrder`, //待支付订单
  otherPayOrder: `${projectName}/api/mall.php?c=otherPayOrder`, //待支付订单id
  uploadCheckImage: `${host}${projectName}/api/mall.php?c=uploadCheckImage`,//上传图片
  cancelSubscribe: `${projectName}/api/mall.php?c=subscribe/cancelSubscribe`,//取消预约
  delSubscribe: `${projectName}/api/mall.php?c=subscribe/delSubscribe`,//删除预定
  getMoney: `${projectName}/api/mall.php?c=order/getMoney`,//收款码接口
  readyPaya: `${projectName}/api/mall.php?c=pay/readyPaya`,//付款界面的接口
  submitRechargeOrder: `${projectName}/api/mall.php?c=order/submitRechargeOrder`,//付款界面的接口
  getActive: `${projectName}/api/mall.php?c=mer/getActive`,//获取红包
  getMyBalanceInfo:`${projectName}/api/mall.php?c=account/getMyBalanceInfo`,//获取余额变更详情
  getFeedbackList:`${projectName}/api/mall.php?c=account/getFeedbackList`,//获取反馈记录列表
  getCashList:`${projectName}/api/mall.php?c=getMyRechargeList`,//获取充值记录
};
module.exports = config;

