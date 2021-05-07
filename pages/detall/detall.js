// pages/detall/detall.js
Page({
  data:{
    id: undefined
  },
  onLoad(options){
    this.setData({
      id: options.id
    })
  }
})