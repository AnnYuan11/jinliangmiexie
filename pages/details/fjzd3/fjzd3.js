// pages/details/fjzd3/fjzd3.js
import {
  Base
} from "../../../utils/request/base.js";
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
  onLoad: function(options) {
    console.log(options)
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    this.mapViewTap();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 获取当前经纬度
  mapViewTap: function() {
    var that = this;
    setTimeout(() => {
      wx.getLocation({
        type: 'gcj02',
        success(res) {
          console.log(res)
          const latitude = res.latitude
          const longitude = res.longitude
          const speed = res.speed
          const accuracy = res.accuracy
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude
          })
          that.list();
        },
        fail(er) {
          var params = {
            url: '/app/user/listEquipmentInfoByDistance',
            method: 'POST',
            data: {

            },
            sCallBack: function(data) {
              console.log(data)
              that.setData({
                list: data.data.result,
              })
            },
            eCallBack: function() {}
          }
          base.request(params);
        }
      })
    }, 1000)
  },
  list: function() {
    var that = this;
    var params = {
      url: '/app/user/listEquipmentInfoByDistance',
      method: 'POST',
      data: {
        'myLng': that.data.longitude,
        'myLat': that.data.latitude
      },
      sCallBack: function(data) {
        console.log(data)
        that.setData({
          list: data.data.result,
        })
      },
      eCallBack: function() {}
    }
    base.request(params);
  },
  // list: function () {
  //   var that = this;
  //   var params = {
  //     url: '/app/user/listEquipmentInfo',
  //     method: 'POST',
  //     data: {
  //       'pageIndex': 1,
  //       'pageSize': 1000000,
  //     },
  //     sCallBack: function (data) {
  //       console.log(data)

  //       that.setData({
  //         list: data.data.result
  //       })
  //     },
  //     eCallBack: function () {
  //     }
  //   }
  //   base.request(params);
  // },
  toxixie: function(e) {
    var that = this;
    console.log(e)
    var longitude = e.currentTarget.dataset.longitude;
    var latitude = e.currentTarget.dataset.latitude;
    var address = e.currentTarget.dataset.address;
    // wx.navigateTo({
    //   url: '/pages/details/map2/map2?longitude=' + longitude + '&latitude=' + latitude + '&address=' + address
    // })
    var latitude = latitude;
    var longitude = longitude;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        console.log(res)
        wx.openLocation({
          latitude: Number('' + latitude + ''),
          longitude: Number('' + longitude + ''),
          scale: 16,
          name: address,
          address: address
        })
      }
    })
  }
})