//index.js
const app = getApp()
var api = require('../../utils/api.js')


Page({
  data: {
    fromArray: ["自动检测", "中文", "英语", "粤语", "文言文", "日语", "韩语", "法语", "西班牙语", "泰语", "阿拉伯语", "俄语", "葡萄牙语", "德语", "意大利语", "希腊语", "荷兰语", "波兰语", "保加利亚语", "爱沙尼亚语", "丹麦语", "芬兰语", "捷克语", "罗马尼亚语", "斯洛文尼亚语", "瑞典语", "匈牙利语", "繁体中文", "越南语"],
    toArray: ["中文", "英语", "粤语", "文言文", "日语", "韩语", "法语", "西班牙语", "泰语", "阿拉伯语", "俄语", "葡萄牙语", "德语", "意大利语", "希腊语", "荷兰语", "波兰语", "保加利亚语", "爱沙尼亚语", "丹麦语", "芬兰语", "捷克语", "罗马尼亚语", "斯洛文尼亚语", "瑞典语", "匈牙利语", "繁体中文", "越南语"],
    objectArray: [
      {
        id: "auto",
        name: "自动检测"
      },
      {
        id: "zh",
        name: "中文"
      },
      {
        id: "en",
        name: "英语"
      },
      {
        id: "yue",
        name: "粤语"
      },
      {
        id: "wyw",
        name: "文言文"
      },
      {
        id: "jp",
        name: "日语"
      },
      {
        id: "kor",
        name: "韩语"
      },
      {
        id: "fra",
        name: "法语"
      },
      {
        id: "spa",
        name: "西班牙语"
      },
      {
        id: "th",
        name: "泰语"
      },
      {
        id: "ara",
        name: "阿拉伯语"
      },
      {
        id: "ru",
        name: "俄语"
      },
      {
        id: "pt",
        name: "葡萄牙语"
      },
      {
        id: "de",
        name: "德语"
      },
      {
        id: "it",
        name: "意大利语"
      },
      {
        id: "el",
        name: "希腊语"
      },
      {
        id: "nl",
        name: "荷兰语"
      },
      {
        id: "pl",
        name: "波兰语"
      },
      {
        id: "bul",
        name: "保加利亚语"
      },
      {
        id: "est",
        name: "爱沙尼亚语"
      },
      {
        id: "dan",
        name: "丹麦语"
      },
      {
        id: "fin",
        name: "芬兰语"
      },
      {
        id: "cs",
        name: "捷克语"
      },
      {
        id: "rom",
        name: "罗马尼亚语"
      },
      {
        id: "slo",
        name: "斯洛文尼亚语"
      },
      {
        id: "swe",
        name: "瑞典语"
      },
      {
        id: "hu",
        name: "匈牙利语"
      },
      {
        id: "cht",
        name: "繁体中文"
      },
      {
        id: "vie",
        name: "越南语"
      }
    ],
    fromArrayIndex: 0,  
    toArrayIndex: 0,
    query:'',
    clearButtonHidden: true,
    output:'',
    outputHidden:true
    },
  //事件处理函数
  bindFromChange: function (e) {
    this.setData({
      fromArrayIndex: e.detail.value
    })
  },
  bindToChange: function (e) {
    this.setData({
      toArrayIndex: e.detail.value
    })
  },
  onInput:function(e) {
    this.setData({
      query: e.detail.value
    })
    if (this.data.query.length>0) {
      this.setData({
        clearButtonHidden: false
      })
    } else {
      this.setData({
        clearButtonHidden: true
      })
    }
  },
  onTapClear:function() {
    this.setData({
      query: '',
      clearButtonHidden: true,
      output:'',
      outputHidden: true
    })
  },
  onConfirm: function() {
    if (this.data.query === '') {
      this.setData({
        outputHidden:true
      })
      return
    }
    var result = api.fetch(this.data.query, this.data.objectArray[this.data.fromArrayIndex].id, this.data.objectArray[parseInt(this.data.toArrayIndex)+1].id, this.render)
  },
  render:function(res) {
    this.setData({
      output:res,
      outputHidden:false
    })
    let history = wx.getStorageSync('history')||[]
    
    history.unshift({fromString:this.data.query, toString:res})
    if (history.length > 50) {
      history.pop()
    }
    wx.setStorageSync('history', history)
  },
  copyButton: function (e) {
    wx.setClipboardData({
      data: e.target.dataset.text
    })
  },
  onShow:function() {
    if (app.globalData.changeText) {
      this.setData({
        query: app.globalData.changeText,
        clearButtonHidden: false
      })
      this.onConfirm()
      app.globalData.changeText = ''
    }
  }
})
