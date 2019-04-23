const app = getApp()

Page({
  data: {
    history:[]
  },
  onShow:function() {
    let history = wx.getStorageSync('history')
    let _this = this
    let temp = []
    history.forEach(function(obj) {
      temp = temp.concat({ fromString: obj.fromString, toString: obj.toString })
    })
    _this.setData({
      history: temp
    })
  },
  clearAll:function() {
    wx.setStorageSync('history', [])
    this.setData({
      history:[]
    })
  },
  onTapClear:function(e) {
    if (e.target.dataset.index === undefined) {
      var temp = this.data.history
      temp.splice(e.target.dataset.clearbtn, 1)
      this.setData({
        history: temp
      })
      wx.setStorageSync('history', temp)
    }
  },
  change:function(e) {
    if(e.target.dataset.clearbtn === undefined){
      wx.switchTab({ url: '../index/index' })
      let history = wx.getStorageSync('history')
      app.globalData.changeText =  history[e.target.dataset.index].fromString
    }
  }
})

