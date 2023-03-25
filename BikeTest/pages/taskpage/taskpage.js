// pages/taskpage/taskpage.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data:{
    //定义标题数组
    tasks:[],
    titles:[
      {
        id:0,
        text:"正在进行"
      },
      {
        id:1,
        text:"待完成"
      },
      {
        id:2,
        text:"完成失败"
      },
      {
        id:3,
        text:"已完成"
      }
    ],
    //接收子组件传递过来的index索引
    activeIndex:0,
    list:[],
    goMarkers:[],
    goPorts:[]
  },
  //定义事件接收子组件传递过来的index索引值
  changeIndex(e){
    //console.log(e.detail)
    //更新到data里，方便页面数据绑定
     this.setData({
      activeIndex:e.detail
     })
     var x=e.detail
     if(x==0){
       this.getTasksByState("正在进行")
       this.getLocationAndPorts()
     }
     else if(x==1){
       this.getTasksByState("待完成")
     }
     else if(x==2){
       this.getTasksByState("完成失败")
     }
     else if(x==3){
       this.getTasksByState("已完成")
     }
    console.log("任务数据是否获取：")
    console.log(this.data.tasks)
  },
  
  getLocationAndPorts(){
    //想办法移到onload中去
    var that = this;
    if(app.globalData.userInfo){
       wx.request({
      url: app.globalData.globalReqUrl +'/getTaskPort',
      // header:{
      //   'content-type': 'application/x-www-form-urlencoded'
      // },
      data:{
        dist:app.globalData.userInfo.dist
      },
      success:function(res){
        console.log(res)
        that.setData({
          goPorts:res.data
        })
      }
    })
    }
   
    wx.getLocation({
      //altitude: 'altitude',
      type:'gcj02',
      isHighAccuracy:true,
      success: function(res){
        console.log(res)
        that.setData({
          goMarkers:[
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
        // that.data.goMarkers.push({
        //   id:0,
        //   latitude:res.latitude,
        //   longitude:res.longitude,
        //   iconPath:"../../icon/wo.png",
        //   width:40,
        //   height:40
        //   })
        console.log(that.data.goPorts)
        for(var x=0;x<that.data.goPorts.length;x++){
          var t=that.data.goPorts[x].needBikeCount
          var s="当前车辆数为："+that.data.goPorts[x].bikeCount+"\n"
          s+=t>0?"需要调入车辆数为：":"需要调出车辆数为:"
          s+=Math.abs(t)
          console.log(s);
          that.data.goMarkers.push({
            id:x+1,
            latitude:that.data.goPorts[x].weidu,
            longitude:that.data.goPorts[x].jindu,
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
            
            console.log(that.data.goMarkers);
        } 
        that.setData({
          goMarkers:that.data.goMarkers
        })
        
      }
    })
  },
  setCurrentTask:function(e){
    //设置当前要查看详情的任务
    console.log("查看参数："+e.currentTarget.dataset.index)
    var index=e.currentTarget.dataset.index
    console.log(this.data.tasks[index])
    app.globalData.currentTask=this.data.tasks[index]
    console.log(app.globalData.currentTask)
    wx.navigateTo({
      url: '/pages/taskdetail/taskdetail',
    })
  },
  startTask:function(e){
    var that=this;

      wx.request({
        url: app.globalData.globalReqUrl +'/startTask',
        data:{
          taskid:that.data.tasks[0].id,
          dispatcherId:app.globalData.userInfo.id
        },
        success:function(res){
          console.log(res)
          that.setData({
            tasks:[]
          })
        }
      })

  },
  getTasksByState(state){
    //加上参数人的id!!!
    var that=this;
    if(app.globalData.userInfo){
      console.log("用户："+app.globalData.userInfo.id)
      console.log("用户："+app.globalData.userInfo)
      wx.request({
        url: app.globalData.globalReqUrl +'/getTaskByJobNumber',
        data:{
          jobNumber:app.globalData.userInfo.jobNumber,
          state:state
        },
        // header:{
        //   'content-type': 'application/x-www-form-urlencoded'
        // },
        success:function(res){
          console.log("任务数据")
          console.log(res)
          that.setData({
            tasks:res.data
          })
          // console.log("任务数据是否获取：")
          // console.log(that.data.tasks)
        }
      })
      return "已登录，成功访问数据"
    }
    else{
      return "未登录，请先登录"
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTasksByState("正在进行")
    this.getLocationAndPorts()
    
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