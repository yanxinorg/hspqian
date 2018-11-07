// pages/diseaseInfo/diseaseInfo.js
var WxParse = require('../../wxParse/wxParse.js');
var api3 = "https://route.showapi.com/546-3?showapi_appid=50997&showapi_sign=f8053ec44d484ecca71e31ae105dfcb5&id="
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "",
    diseaseInfo:[],
    item_id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    this.setData({
      item_id:params.id
    })
    this.getdiseaseByItem()
  },
  getdiseaseByItem:function(){
    var that = this;
    wx.request({
      url: api3 + that.data.item_id,
      data: {},
      header: {
        "Content-Type": "json" // 默认值
      },
      success: function (res) {
        console.log(res.data)
        var article = res.data.showapi_res_body.item.summary;
        WxParse.wxParse('article', 'html', article, that);
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