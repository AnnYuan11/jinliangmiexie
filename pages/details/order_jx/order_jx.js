// pages/details/order_jx/order_jx.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var util = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res)
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    that.list();
    that.complete();
    that.setData({
      imgUrl: app.globalData.imgUrl
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
  /**
    * 滑动切换tab
    */
  bindChange: util.throttle(function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });

  }, 500),
  /**
   * 点击tab切换
   */
  swichNav: util.throttle(function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }, 500),
  // 待取货
  list:function(){
    var that = this;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    var params = {
      url: '/app/order/listDonateOrderInfo',
      method: 'POST',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
        'userInfo.id': userId,
        'orderStatus':1
      },
      sCallBack: function (data) {
        console.log(data)
        var list = data.data.result;
        // 订单状态
        for (var i = 0; i < list.length; i++) {
          var orderStatus = list[i].orderStatus;
          if (orderStatus == "1") {
            orderStatus = "待取货"
          }else{
            orderStatus = "已完成"
          }
          list[i].orderStatus = orderStatus;
        }
        that.setData({
          list: list,
        })
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  // 已完成
  complete: function () {
    var that = this;
    // 获取userID
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    var params = {
      url: '/app/order/listDonateOrderInfo',
      method: 'POST',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
        'userInfo.id': userId,
        'orderStatus': 2
      },
      sCallBack: function (data) {
        console.log(data)
        var list2 = data.data.result;
        console.log(list2)
        var imgArr5 = [];
        // 订单状态
        for (var i = 0; i < list2.length; i++) {
          var img = JSON.parse(list2[i].photo);
          list2[i].img = img;
          var orderStatus = list2[i].orderStatus;
          if (orderStatus == "2") {
            orderStatus = "已完成"
          }       
          list2[i].orderStatus = orderStatus;
          var imgUrl = that.data.imgUrl
          imgArr5[i] = (imgUrl + list2[i].photo);
        }
        that.setData({
          list2: list2,
          imgArr5: imgArr5
        })
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  // 图片预览
  previewImg: function (e) {
    var that = this;
    var imgUrl = that.data.imgUrl;
    var lists = e.currentTarget.dataset.list;
    for (var i = 0; i < lists.length; i++) {
      lists[i] = imgUrl +'/'+ lists[i]
      console.log(lists)
    }
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: lists // 需要预览的图片http链接列表
    })
  },
})