// pages/answerInfo/answerInfo.js
var config = require('../../config')
var util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    d_answers:"",
    u_answers:"",
    doctorInfo:null,
    userInfo:"",
    q_id:"",
    answerInfotemp:"",
    question:"",
    ingAnswer: false,
    answerText:""
  },
  answerText:function(e){
    this.setData({
      answerText: e.detail.value
    })
  },
  cancel:function(){
    this.setData({
      ingAnswer: !this.data.ingAnswer
    })
  },
  toAnswer:function(){
    var that=this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          userInfo:res.data,
          ingAnswer: !that.data.ingAnswer
        })
      },
      fail:function(){
        util.bingLogin()
      }
    })
  },
  d_sendAnswer: function () {
    var that = this
    wx.request({
      url: config.service.sendAnswerUrl,
      data: {
        d_id: that.data.doctorInfo.d_id,
        q_id: that.data.q_id,
        answer: that.data.answerText
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        util.showSuccess("回复成功")
        that.setData({
          answerText:""
        })
        that.cancel()
        that.getAnswers()
      }
    })
  },
  u_sendAnswer:function(){
    var that=this
    wx.request({
      url: config.service.sendAnswerUrl,
      data:{
       u_id: that.data.userInfo.openId,
       q_id: that.data.q_id,
       answer:that.data.answerText
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        util.showSuccess("回复成功")
        that.setData({
          answerText: ""
        })
        that.cancel()
        that.getAnswers()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      q_id:options.q_id,
      question:options.question
    })
    if (app.globalData.doctorInfo) {
      this.setData({
        doctorInfo:app.globalData.doctorInfo
      })
      console.log("ddd")
      console.log(this.data.doctorInfo)
    }
   
    
  },
  getAnswers:function(){
    var that=this
    wx.request({
      url: config.service.getAnswersUrl,
      data:{
        q_id: that.data.q_id
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data)
        for (var index in res.data.data.u_answers) {
          var timetmp = util.formatTime(new Date(res.data.data.u_answers[index].a_time))
          res.data.data.u_answers[index].a_time = timetmp
        }
        for (var index in res.data.data.d_answers) {
          var timetmp = util.formatTime(new Date(res.data.data.d_answers[index].a_time))
          res.data.data.d_answers[index].a_time = timetmp
        }
        that.setData({
          d_answers: res.data.data.d_answers,
          u_answers: res.data.data.u_answers
        })
        // console.log(that.data.answers)
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
    this.getAnswers()
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