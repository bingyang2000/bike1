//index.js
//获取应用实例
const app = getApp()
 
Page({
  data: {
    username: '',
    password: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    //wx.hideTabBar({})
  },
  onLoad: function () {
   
  },
 
 
  // 获取输入账号 
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
 
  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
 
  // 登录处理
  login: function () {
    var that = this;
    if (this.data.username.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: app.globalData.globalReqUrl +'/wxlogin', 
        //method: 'post',
        data: {
          jobNum: that.data.username,
          password: that.data.password
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          console.log(res)
          if (res.data != null) {
            /*var unitName = res.data.data.User.unitName;
            var unitId = res.data.data.User.unitId;
            wx.setStorageSync('unitId', unitId);
            wx.setStorageSync('unitName', unitName);
            */
           app.globalData.userInfo=res.data;
            wx.switchTab({
              url: '../profile/profile',
            })
          } else {
            wx.showToast({
              title: "账号或密码错误",
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  }
})
 