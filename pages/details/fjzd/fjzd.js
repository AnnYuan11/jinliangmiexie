// pages/details/fjzd/fjzd.js
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
      menuMoney: options.menuMoney,
      shoeNumber: options.shoeNumber,
      id:options.id,
      num:options.num,
      types:options.types
     
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
    var equipmentInfoId = e.currentTarget.id;
    var address = e.currentTarget.dataset.address
    var menuMoney = that.data.menuMoney;
    var shoeNumber = that.data.shoeNumber;
    var id = that.data.id;
    var types = that.data.types;
    var num = that.data.num
    if(types==1){
      wx.redirectTo({
        url: '/pages/crxg/xiuxie/xiuxie?equipmentInfoId=' + equipmentInfoId + '&address=' + address + '&num=' + num
      })
    }else{
      wx.redirectTo({
        url: '/pages/crxg/wyxx/wyxx?equipmentInfoId=' + equipmentInfoId + '&address=' + address + '&menuMoney=' + menuMoney + '&shoeNumber=' + shoeNumber+'&id='+id
      })

    }
  },
  // 获取input的值
  searchInput:function(e){
    this.setData({
      address: e.detail.value
    })

  },
  search:function(){
    var that = this;
    var address = that.data.address;
    var params = {
      url: '/app/user/listEquipmentInfo',
      method: 'POST',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
        'address':address
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