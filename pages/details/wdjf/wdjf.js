// pages/details/wdjf/wdjf.js
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
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    // this.wdjf();
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
    this.refresh();
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
  // 我的积分
  wdjf: function () {
    var that = this;
    // 获取userID
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    that.setData({
      userId: userId
    });
    var userId = that.data.userId;
    var params = {
      url: '/app/order/listIntegralOrderInfo',
      method: 'POST',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
        'userInfo.id': userId
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
  refresh: function () {
    var that = this;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    console.log(userId)
    var params = {
      url: '/app/user/findById',
      method: 'POST',
      data: {
        'id': userId
      },
      sCallBack: function (res) {
        console.log(res)
        that.setData({
          integral: res.data.result.integral
        })
        that.wdjf();
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  dh:function(){
    var that = this;
    var userId = wx.getStorageSync('userId');
    var params = {
      url: '/app/order/addIntegralOrderInfoCash',
      method: 'POST',
      data: {
        'userInfo.id': userId
      },
      sCallBack: function (data) {
        if (data.data.errorCode==0){
          wx.showToast({
            title: "兑换成功",
            icon: 'none',
            duration: 2000
          })
          
        }else{
          wx.showToast({
            title: data.data.errorMsg,
            icon: 'none',
            duration: 2000
          })
        }
        that.refresh();
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  }
})