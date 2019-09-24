// pages/details/select/select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    var that = this;
    that.setData({
      userCouponInfoId: options.userCouponInfoId,
      money: options.money
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

  },
  tz:function(){
    var that = this;
    var userCouponInfoId = that.data.userCouponInfoId;
    var money = that.data.money;
    wx.redirectTo({
      url: "../wyxx/wyxx?type1=2&money=" + money + "&userCouponInfoId=" + userCouponInfoId,
    })
  },
  tz2: function () {
    var that = this;
    var userCouponInfoId = that.data.userCouponInfoId;
    var money = that.data.money;
    wx.redirectTo({
      url: "../wyxx/wyxx?type1=1&money=" + money + "&userCouponInfoId=" + userCouponInfoId,
    })
  }
})