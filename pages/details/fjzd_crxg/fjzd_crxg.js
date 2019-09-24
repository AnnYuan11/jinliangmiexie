// pages/details/fjzd_crxg/fjzd_crxg.js
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
      dizhi: options.dizhi,
      dzid: options.dzid,
      type1: options.type1,
      userCouponInfoId: options.userCouponInfoId,
      money: options.money
    })
    this.mapViewTap();
    // this.list();

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
  // 获取当前经纬度
  mapViewTap: function () {
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
            sCallBack: function (data) {
              console.log(data)
              that.setData({
                list: data.data.result,
              })
            },
            eCallBack: function () { }
          }
          base.request(params);
        }
      })
    }, 1000)

  },
  list: function () {
    var that = this;
    var params = {
      url: '/app/user/listEquipmentInfoByDistance',
      method: 'POST',
      data: {
        'myLng': that.data.longitude,
        'myLat': that.data.latitude,
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
    var that = this;
    console.log(e)
    var zdid = e.currentTarget.id;
    var adaddress = e.currentTarget.dataset.address;
    var num = that.data.num;
    var dizhi = that.data.dizhi;
    var dzid = that.data.dzid;
    var type1 = that.data.type1;
    var userCouponInfoId = that.data.userCouponInfoId;
    var money = that.data.money;
    console.log(num)
    wx.redirectTo({
      url: '../wyxx_crxg/wyxx_crxg?zdid=' + zdid + '&num=' + num + '&adaddress=' + adaddress + '&dizhi=' + dizhi + '&dzid=' + dzid + '&type1=' + type1 + '&userCouponInfoId=' + userCouponInfoId + '&money=' + money,
    })
  },
  // 获取input的值
  searchInput: function (e) {
    this.setData({
      address: e.detail.value
    })

  },
  search: function () {
    var that = this;
    var address = that.data.address;
    var params = {
      url: '/app/user/listEquipmentInfo',
      method: 'POST',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
        'address': address
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
  }
})