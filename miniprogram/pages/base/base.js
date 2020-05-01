// pages/base/base.js
Page({
  data: {
     msg:"hello",
     img:"",
     count:0
  },
  onTabHandler:function(){
    this.setData({
      count:this.data.count+1
    })
  }
})