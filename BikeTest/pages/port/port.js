// pages/port/port.js
//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers:[],
    ports:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getLocation({
      //altitude: 'altitude',
      type:'gcj02',
      isHighAccuracy:true,
      success: function(res){
        console.log(res)
        that.setData({
          markers:[
            {
              id:0,
              latitude:res.latitude,
              longitude:res.longitude,
              iconPath:"../../icon/wo.png",
              width:40,
              height:40
            }
          ]
        })
        console.log(that.data.ports)
        for(var x=0;x<that.data.ports.length;x++){
          var t=that.data.ports[x].needBikeCount
          var s="当前车辆数为："+that.data.ports[x].bikeCount+"\n"
          s+=t>0?"需要调入车辆数为：":"需要调出车辆数为:"
          s+=Math.abs(t)
          console.log(s);
          that.data.markers.push({
            id:x+1,
            latitude:that.data.ports[x].weidu,
            longitude:that.data.ports[x].jindu,
             // iconPath:"../../icon/port.png",
             iconPath:"http://mms0.baidu.com/it/u=2461746827,2675886199&fm=253&app=138&f=PNG&fmt=auto&q=75?w=500&h=621",
            width:25,
            height:35,
            callout:{
              content:s,
              // fontSize:13,
              // color:"red",
              borderColor:"#0000ff",
              borderWidth:1,
              borderRadius:5,
              padding:2,
              display:"BYCLICK",
            }
            })
        } 
        
        console.log(that.data.markers)
        that.setData({
          markers:that.data.markers
        })
      }
    })
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
    var that=this;
    wx.request({
      url: app.globalData.globalReqUrl +'/getAllPort',
      // header:{
      //   'content-type': 'application/x-www-form-urlencoded'
      // },
      success:function(res){
        console.log(res)
        that.setData({
          ports:res.data
        })
      }
    })
    
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

  }
})