// pages/article/article.js
var WxParse = require('../../wxParse/wxParse.js');
var config = require('../../config')

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Data_Id:"",
    article:"",
    Data_Headline:"",
    u_id:""
  },
  userOffarticle:function(){
    var that=this
    wx.request({
      url: config.service.UserOffArticleUrl,
      data:{
        u_id:that.data.u_id,
        Data_Headline:that.data.Data_Headline
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res){
        console.log("ds")
        console.log(res.data)
      }
    })
  },
  getArticle: function () {
    var that = this
    wx.request({
      url: config.service.getArticleInfoUrl,
      data:{
        Data_Id: that.data.Data_Id
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data.data)
        var article = res.data.data[0].Data_Txt
        WxParse.wxParse('article', 'html', article, that);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.setData({
      Data_Id: options.Data_Id
    })
    if(options.u_id && options.Data_Headline){
      console.log(options.u_id)
      console.log(options.Data_Headline)
      that.setData({
        u_id: options.u_id,
        Data_Headline:options.Data_Headline
      })
      that.userOffarticle()
    }
   
   this.getArticle()
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