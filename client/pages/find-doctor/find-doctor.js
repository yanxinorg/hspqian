var config = require('../../config')
var util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 81,
    winWidth: 0,
    winHeight: 0,
    subjects:"",
    doctors:{}

  },
 
  get_Doctor:function(){
    var that=this
    wx.request({
      url: config.service.getDoctorUrl,
      data:{},
      header: {
        'content-type': 'json' // 默认值
      },
      success(res){
        console.log(res.data)
        that.setData({
          doctors: res.data.data
        })
      }
    })
  },
  getSubject:function(){
    var that = this
    wx.request({
      url: config.service.getSubjectUrl,
      success(res) {
        that.setData({
          subjects: res.data.data
        })
        console.log(res.data.data)
      }
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ winWidth: res.windowWidth });
        that.setData({ winHeight: res.windowHeight });
      }
    })
    this.getSubject()
    this.get_Doctor()
  },
  switchNav: function (e) {
    var that = this;
    if (this.data.currentTab == e.target.dataset.current) {
      return false;
    } else {
      that.setData({ 
        currentTab: e.target.dataset.current,
      });
    }
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