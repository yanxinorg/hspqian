var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    userInfo:"",
    logged: false,
    doctorInfo:"",
    d_flag:true,
    u_flag:false,
    no_doctor:false
  },
 
  onLoad: function (options){
    var that=this
    console.log("9++")
    if (options.be_doctor) {
      console.log("---")
      that.setData({
        no_doctor: false
      })
    }
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          logged:true,
          userInfo:res.data,
          u_flag:true
        })
      },
    })
  },
  update_pic:function(){
    var that = this
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        util.showBusy('正在上传')
        var filePath = res.tempFilePaths[0]

        // 上传图片
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: filePath,
          name: 'file',

          success: function (res) {
            util.showSuccess('上传图片成功')
            console.log(res)
            res = JSON.parse(res.data)
            console.log(res.data.imgUrl)
            wx.request({
              url: config.service.update_picUrl,
              data:{
                d_picUrl:res.data.imgUrl,
                d_id:that.data.doctorInfo.d_id
              },
              method: "POST",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success:function(res){
                console.log(res.data.data)
                that.d_login()
              }
            })
          },

          fail: function (e) {
            util.showModel('上传图片失败')
          }
        })

      },
      fail: function (e) {
        console.error(e)
      }
    })
  },
  
  d_login:function(){
    var that = this
    wx.request({
      url: config.service.LogindoctorUrl,
      data:{
        d_id: that.data.userInfo.openId
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:function(res){
          if(res.data.data.code==0){
            wx.showToast({
              title: '你是医生',
            })
            that.setData({
              doctorInfo: res.data.data.msg[0],
              d_flag: false
            })
            console.log(res.data.data.msg[0])
            app.globalData.doctorInfo=res.data.data.msg[0]
          }else{
            wx.showModal({
              title: '提示',
              content: res.data.data.msg,
            })
            that.setData({
              no_doctor:true
            })
          }
          
          
      }
    })
  },
  back:function(){
    this.setData({
      d_flag:true
    })
    app.globalData.doctorInfo=null
  },
  // 用户登录示例
  login: function () {
    var that = this
    if (this.data.logged) 
      return
    util.showBusy('正在登录')
   
    qcloud.request({
      url: config.service.requestUrl,
      login: true,
      success(result) {
        console.log("d=======")
        console.log(result)
        util.showSuccess('登录成功')
        that.setData({
          userInfo: result.data.data,
          logged: true,
          u_flag: true
        })
        wx.setStorage({
          key: 'userInfo',
          data: result.data.data
        })
        // wx.setStorage({
        //   key: 'islogin',
        //   data: true,
        // })
        app.globalData.userInfo = result.data.data
        //提交用户
        wx.request({
          url: config.service.postUsertUrl,
          data: {
            u_id: that.data.userInfo.openId,
            u_name: that.data.userInfo.nickName,
            u_picUrl: that.data.userInfo.avatarUrl
          },
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {

          }
        })         
      },
      fail(error) {
        util.showModel('请求失败', error)
        console.log('request fail', error)
      }
    })
  }
})