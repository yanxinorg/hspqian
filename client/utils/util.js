const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
var showerror = text => wx.showToast({
  title: text,
  image:'../../images/jinggao.png',
  duration: 10000
})
// function postRequest(url, data ){
//   wx.request({
//     url: url,
//     data: data,
//     method: "POST",
//     header: {
//       "Content-Type": "application/x-www-form-urlencoded"
//     },
//     success:function(res){

//     }
//   })
// }
// var getRequest = url => wx.request({
//   url: url
// })
var bingLogin = text=> wx.showModal({
  title: '亲！',
  content: '您还未登录~',
  confirmText: "去登录",
  cancelText: "返回",
  success: function (res) {
    if (res.confirm) {
      wx.switchTab({
        url: '../mine/mine',
      })
    } else if (res.cancel) {
      wx.switchTab({
        url: '../index/index',
      })
    }
  }
})


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success',
    duration: 1000
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

module.exports = { formatTime, showBusy, showSuccess, showModel, showerror, bingLogin}
