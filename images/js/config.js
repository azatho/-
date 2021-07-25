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
  getHelpList: `${projectName}/api/mall.php?c=getHelpList`,//帮助中心
  getChoiceList: `${projectName}/api/mall.php?c=subscribe/choiceList`, //预约时间列表
  getChoiceTCList: `${projectName}/api/mall.php?c=subscribe/getChoiceTCList`, //获取预约选项套餐信息
};
module.exports = config;

