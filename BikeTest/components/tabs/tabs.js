// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //接收父组件传递过来的属性列表
    tabs:{
       type:Array,
       value:[]
    }
  },
  data: {
   //定义当前点击项的索引值
   currentIndex:0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //定义获取当前点击项索引的方法
    getIndex(e){
      //console.log(e.currentTarget.dataset.index)
      //定义一个变量，接收存进去的点击项的索引
      var index = e.currentTarget.dataset.index
      //使用自定义事件，向父组件传参--- index索引值
      this.triggerEvent("transIndex",index)
      //更新到data里，方便页面数据绑定
      this.setData({
        currentIndex:index
      })
    }
  }
})
