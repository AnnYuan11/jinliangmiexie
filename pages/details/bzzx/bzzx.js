// pages/details/bzzx/bzzx.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var util = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        imgUrl: app.globalData.imgUrl
      })
    this.liebiao();
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
  liebiao:function(){
    var that = this;
    var params = {
      url: '/app/user/listAdviceInfo',
      method: 'POST',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
      },
      sCallBack: function (data) {
        console.log(data)
        var list = data.data.result;
        that.setData({
          list: list,
        })
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  phonecallevent: function (e) {
    wx.makePhoneCall({
      phoneNumber: '029-88222448'
    })
  }
})