// pages/details/jx_address/jx_address.js
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
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    this.setData({
      num: options.num,
    })
    this.list();
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
      url: '/app/user/listEquipmentInfo',
      method: 'POST',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
      },
      sCallBack: function (data) {
        console.log(data)

        that.setData({
          list: data.data.result,
        })
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  toxixie: function (e) {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    var that = this;
    console.log(e)
    var num = that.data.num;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    console.log(num)
    var equipmentInfo = e.currentTarget.dataset.id;
    var params = {
      url: '/app/order/addDonateOrderInfo',
      method: 'POST',
      data: {
        'userInfo.id': userId,
        'shoeNumber':num,
        'equipmentInfo.id': equipmentInfo
      },
      sCallBack: function (data) {
        console.log(data)
        wx.hideLoading()
        if (data.data.errorCode==0){
          that.setData({
            isShow: true,
          })
        }else{
          wx.showToast({
            title: "失败",
            icon: 'none',
            duration: 1000
          })
        }
      },
      eCallBack: function () {
      }
    }
    base.request(params);
   
    
  },
  // 关闭浮层
  hideCovew: function () {
    var that = this;
    that.setData({
      isShow: false,
    })
    wx.redirectTo({
      // url: '../../dingdan/order/order'
      url: '../order_jx/order_jx'
    })
    
  },
})