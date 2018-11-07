// pages/tiwen/tiwen.js
var config = require('../../config')
var Util = require('../../utils/util.js')

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:"",
    questionInfo:{},
    questionInfotemp:"",
    disabled:true,
    doctor_id:0
  },
  
  bindText:function(e){
      this.setData({
        questionInfo: e.detail.value
      })
      if (e.detail.value.length>10){
        this.setData({
          disabled:false
        })
      }else{
        this.setData({
          disabled: true
        })
      }
  },
  yincan:function(e){
    wx.hideToast()
  },
  formReset:function (e) {
      var that=this
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      wx.request({
        url: config.service.addquestionUrl,
        data: {
          u_id: that.data.userInfo.openId,
          d_id: that.data.doctor_id,
          question: that.data.questionInfo,
        },
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log("emm")
          Util.showSuccess('提交成功')
          setTimeout(function () {
            wx.navigateBack({
            })
          }, 1000)
          
        }
      })

  },

  onLoad: function (options) {
    var that =this
    if(options.d_id){
      this.setData({
        doctor_id: options.d_id
      })
    }
    console.log(this.data.doctor_id)
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          userInfo: res.data
        })
      },
      fail:function(){
        Util.bingLogin("")
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