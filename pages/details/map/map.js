// pages/details/map/map.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var util = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // markers: [{

    //   // id: 0,
    //   latitude: 34.267,
    //   longitude: 108.9,
    //   // width: 50,
    //   // height: 50
    // }],
    markers: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: latitude,
          longitude: longitude
        })
      },
    })
   that.list();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap')
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
  list(item) {
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
        let markers = [];
        for (let item of data.data.result) {
          let marker = that.createMarker(item);
          // console.log(marker)
          markers.push(marker)
          // console.log(markers)
        }
        // return markers;
        that.setData({
          markers: markers
        })
        console.log(that.data.markers)
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
 
  getHospitalMarkers() {
         
    
  },
  createMarker(point) {
    let longitude = point.lng;
    let latitude = point.lat;
    let marker = {
      iconPath: "../../../image/details/map.png",
      //  id: 1,
      //  name:"1111",
      longitude: longitude,
      latitude: latitude,
      width: 30,
      height: 30

};
    return marker;
    
  }
})