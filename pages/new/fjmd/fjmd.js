// pages/new/fjmd/fjmd.js
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
      // menuMoney: options.menuMoney,
      // shoeNumber: options.shoeNumber,
      // id:options.id,
      // num:options.num,
      types: options.types

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
    var city = wx.getStorageSync('city');
    var province = wx.getStorageSync('province');
    console.log(city)
    var params = {
      url: '/app/user/listEquipmentInfoByDistance',
      method: 'POST',
      data: {
        'myLng': that.data.longitude,
        'myLat': that.data.latitude,
        'province': province,
        'city': city
      },
      sCallBack: function (data) {
        console.log(data)
        data.data.result.forEach(function (item) {
          item.distance = item.distance.toFixed(2)
        })

        that.setData({
          list: data.data.result
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
    var equipmentname = e.currentTarget.dataset.equipmentname
    var equipmentInfoId = e.currentTarget.id;
    var address = e.currentTarget.dataset.address
    var menuMoney = that.data.menuMoney;
    var shoeNumber = that.data.shoeNumber;
    var id = that.data.id;
    var types = that.data.types;
    var num = that.data.num;
    console.log(equipmentname)
    if (types == 1) {
      wx.redirectTo({
        url: '/pages/details/xiuxie/xiuxie?equipmentInfoId=' + equipmentInfoId + '&address=' + address + '&equipmentname=' + equipmentname
       
      })
    } else if (types == 2){
      wx.navigateTo({
        url: '/pages/details/wyxx_new/wyxx_new?address=' + address + '&equipmentInfoId=' + equipmentInfoId + '&equipmentname=' + equipmentname
        
      })

    }else {
      wx.navigateTo({
        url: '/pages/details/mthx_hx/mthx_hx?equipmentInfoId=' + equipmentInfoId + '&equipmentname=' + equipmentname

      })

    }
  },
})