import md5 from "../utils/md5.min.js"
var getTime = require('../utils/util.js')

function fetch(query, fromL, to, callback) {
  var url = 'https://fanyi-api.baidu.com/api/trans/vip/translate'
  var appid = '20190421000290139'
  var password = '5B47OMnhzPeKrdN9selg'
  var salt = getTime.formatTime(new Date())
  var sign = md5(appid + query + salt + password)
  wx.request({
    url: url,
    data: { 'q': query, 'from': fromL, 'to': to, 'appid': appid, 'salt': salt, 'sign': sign },
    success: function (res) {
      callback(res.data.trans_result[0].dst)
    },
    fail:function() {
      console.log('错误')
    }
  })
}

module.exports = {
  fetch: fetch
}


