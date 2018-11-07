
var config = require('../../config')
var util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    currentTab:"两性",
    winWidth:0,
    winHeight:0,
    articles:"",
    article_Style:"",
    Style:"两性",
    userInfo:"",
    recommend:false
  },
  onPageScroll: function () {
    scollTop:200;
  },
  getArticles: function () {
    var that = this
    wx.request({
      url: config.service.getArticlesUrl,
      data:{
        Data_Style:that.data.Style
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          articles:res.data.data
        })
      }
    })
  },
  getArticleStyle:function(){
    var that=this
    wx.request({
      url: config.service.getArticleStyleUrl,
      success(res){
        that.setData({
          article_Style: res.data.data
        })
        wx.setStorage({
          key: 'article_Style',
          data: res.data.data,
        })
      }
    })
  },
  getRecommend:function(){
    var that=this
    wx.request({
      url: config.service.getRecommendUrl,
      data:{
        u_id:that.data.userInfo.openId
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("+++")
        console.log(res.data.data)
        that.setData({
          articles:res.data.data,
          recommend:true
        })
      }
    })
  },
  onLoad:function(options){
    var that = this
    that.getArticles()
    wx.getStorage({
      key: 'article_Style',
      success: function(res) {
        that.setData({
          article_Style:res.data
        })
      },
      fail:function(){
        that.getArticleStyle()
      }
    })    
    wx.getSystemInfo({
      success: function(res) {
        that.setData({winWidth:res.windowWidth});
        that.setData({winHeight:res.windowHeight});
      },
    })

  },
  switchNav:function(e){
    console.log(e.target.dataset.current)
    var that = this;
    if(this.data.currentTab == e.target.dataset.current){
      return false;
    }else{
      that.setData({
        currentTab:e.target.dataset.current,
        Style: e.target.dataset.current
      });
    }
    if(that.data.Style=='推荐'){
      that.getRecommend()
    }else{
      that.getArticles()
    }
    
  },
  onPageScroll: function () {
    
  },
  onShow:function(){
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          userInfo: res.data
        })
      }
    })
}

})