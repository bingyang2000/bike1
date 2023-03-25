//index.js
//获取应用实例
const app = getApp()
var openid = wx.getStorageSync("openid");
console.log(app.globalData.userInfo)
Page({
  data: {
    hasUserInfo: openid == "",
    isLogin:false,
    user:app.globalData.userInfo
  },

  // 事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  loadInfo: function() {
    var that = this;
    if (app.globalData.userInfo != null) {
      that.setData({
        isLogin:true,
        user:app.globalData.userInfo
      })
      console.log("okle");
    }
     
  },
  onShow: function() {
    var that = this;
    console.log("openid:", openid);
    console.log("isLogin:", this.data.isLogin);
    console.log("user:", this.data.user);
    that.loadInfo();
  }
})