// pages/details/jzxy/jzxy.js
import { Base } from "../../../utils/request/base.js";
var WxParse = require('../../../utils/wxParse/wxParse.js');
var base = new Base();
var util = require('../../../utils/util.js');
var app = getApp()
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
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    this.content();
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
  content: function () {
    var that = this;
    var id = '2c91cd8266b142820166b143f1590000';
    console.log(id)
    var params = {
      url: '/app/user/findAdviceInfoDetail',
      method: 'GET',
      data: {
        'id': id
      },
      sCallBack: function (data) {
        console.log(data)
        var artice = data.data.result.content;
        WxParse.wxParse('artice', 'html', artice, that, 5);
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  }
})