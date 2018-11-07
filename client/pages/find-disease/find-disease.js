var api1 = "https://route.showapi.com/546-1?showapi_appid=50997&showapi_sign=f8053ec44d484ecca71e31ae105dfcb5"
var api2_1 = "https://route.showapi.com/546-2?showapi_appid=50997&showapi_sign=f8053ec44d484ecca71e31ae105dfcb5"
var api2_2 = "https://route.showapi.com/546-2?showapi_appid=50997&showapi_sign=f8053ec44d484ecca71e31ae105dfcb5&key="
var api3 = "https://route.showapi.com/546-3?showapi_appid=50997&showapi_sign=f8053ec44d484ecca71e31ae105dfcb5"
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    contentlist:[],
    flag:true
  },
  search:function(e){
    if (!e.detail.value) {
      return;
    }
    this.setData({
      flag:false
    })
    var that=this
    wx.request({
      url: api2_2 + e.detail.value,
      success(res){
        that.setData({
          contentlist: res.data.showapi_res_body.pagebean.contentlist
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: api2_1,
      success(res) {
        console.log(res.data.showapi_res_body.pagebean.contentlist)
        that.setData({
          contentlist:res.data.showapi_res_body.pagebean.contentlist
        })
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