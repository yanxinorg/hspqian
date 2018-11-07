// pages/regist/regist.js
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjects:"",
    index:0,
    d_id:"",
    d_picUrl:""
  },
  up_pic: function () {
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
            that.setData({
              d_picUrl:res.data.imgUrl
            })
            console.log("++++")
            console.log(that.data.d_picUrl)
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
  formSubmit:function(e){
    var that = this
    console.log(e.detail.value)
    if (e.detail.value.d_name && that.data.d_picUrl && e.detail.value.introduce){
      wx.request({
        url: config.service.registdoctorUrl,
        data: {
          d_id: that.data.d_id,
          d_name: e.detail.value.d_name,
          d_picUrl: that.data.d_picUrl,
          s_id: that.data.subjects[e.detail.value.s_index].s_id,
          introduce: e.detail.value.introduce,
          hospital: e.detail.value.hospital,
        },
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log("res")
          wx.reLaunch({
            url:"../mine/mine?be_doctor=true"
          })
        }
      })
    }else{
      util.showerror('请填写完整')
    }
    
   
  },
  bindCasPickerChange:function(e){
    console.log(this.data.subjects[e.detail.value].s_id)
    console.log(this.data.subjects[e.detail.value])
    this.setData({
      index: e.detail.value
    })

  },
  getSubject: function () {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSubject()
    this.setData({
      d_id:options.d_id
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