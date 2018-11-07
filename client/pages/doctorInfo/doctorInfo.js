// pages/doctorInfo/doctorInfo.js
var config = require('../../config')
var util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      doctor_id:0,
      isdoctor:false,
      questions:"",
      userInfo:""
  },
  delQuestion:function(e){
    console.log(e)
    util.showBusy('正在删除')
    var that=this
    wx.request({
      url: config.service.delQuestionUrl,
      data:{
        q_id: e.target.dataset.q_id
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        util.showSuccess('删除成功')
        setTimeout(function(){
          that.getQuestionByDoctorId()
        },1000)
       
      }
    })
  },
  getQuestionByDoctorId: function () {
    var that = this
    wx.request({
      url: config.service.getquestionUrl,
      data: {
        d_id: that.data.doctor_id
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        for (var index in res.data.data) {
          var timetmp = util.formatTime(new Date(res.data.data[index].q_time))
          res.data.data[index].q_time = timetmp
        }
        that.setData({
          questions: res.data.data,
        })
        console.log(res.data.data)
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          userInfo: res.data
        })
      }
    })
    if (app.globalData.doctorInfo){
      this.setData({
        isdoctor: !this.data.isdoctor
      })
    }
    if(options.isdoctor){
      this.setData({
        isdoctor: options.isdoctor
      })
    }
    this.setData({
      doctor_id: options.d_id
    })
    console.log(this.data.doctor_id)
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getQuestionByDoctorId()
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