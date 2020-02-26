// pages/crxg/wyxx_crxg/wyxx_crxg.js
import { Base } from "../../../utils/request/base.js";
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
    console.log(options)
    var that = this;
    that.setData({
      imgUrl: app.globalData.imgUrl,
      equipmentInfoId: options.equipmentInfoId,
      address: options.address,
      equipmentname: options.equipmentname
    })
    console.log(that.data.address)
    that.list();
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
  list: function () {
    var that = this;
    var params = {
      url: '/app/orderV3/listMenuPriceInfo',
      method: 'POST',
      data:{
        'menuType':1
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

  // swidthTo: function () {
  //   wx.switchTab({
  //     url: '/pages/index/index',
  //   })
  // }
})