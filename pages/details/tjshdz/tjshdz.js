// pages/details/tjshdz/tjshdz.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var util = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    province: '',
    city: '',
    area: '',
    village: '',
    show: false,
    showAddress: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.addShdz();
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
  // 地址选择
  // bindRegionChange: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     region: e.detail.value,
  //     province: e.detail.value[0],
  //     city: e.detail.value[1],
  //     area: e.detail.value[2]

  //   })
  // },
  beizhu: function (e) {
    this.setData({
      address: e.detail.value
    })
  },

  // 开关
  switch1Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
  // 添加收货地址
  addShdz: function (e) {
    console.log(e)
    var that = this;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    that.setData({
      userId: userId
    });
    var userId = that.data.userId;
    console.log(that.data.province)
    var regx = /^1\d{10}$/;
    var dz = that.data.province
    console.log(dz)
    if (e.detail.value.xm == "") {
      wx.showToast({
        title: '请输入收货人姓名',
        icon: 'none',
        duration: 1000,
      })
    }
    else if (e.detail.value.phone == "" || e.detail.value.phone == null || e.detail.value.phone == undefined) {
      wx.showToast({
        title: '请输入您的手机号码',
        icon: 'none',
        duration: 1000
      })
    }
    else if (e.detail.value.phone.length < 11 || !regx.test(e.detail.value.phone) || e.detail.value.phone.length > 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
    }
    else if (dz == undefined || dz == "") {
      wx.showToast({
        title: '请选择您的地址',
        icon: 'none',
        duration: 1000,
      })
    }
    else {
      var params = {
        url: '/app/user/addUserAddressInfo',
        method: 'POST',
        data: {
          'phone': e.detail.value.phone,
          'name': e.detail.value.xm,
          'address': e.detail.value.address,
          'userInfo.id': userId,
          'province': that.data.province,
          'city': that.data.city,
          'area': that.data.area,
          'street': that.data.village
        },
        sCallBack: function (data) {
          console.log(data)
          if (data.data.errorCode == "0") {
            wx.showToast({
              title: '添加成功！',
              icon: 'none',
              duration: 1000,
              success: function () {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          }
        },
        eCallBack: function () {
        }
      }
    }
    base.request(params);
  },
  // 选择地址
  sureSelectAreaListener: function (e) {
    var that = this;
    console.log(e)
    if (e.detail.currentTarget.dataset.village == "" || e.detail.currentTarget.dataset.village=="暂不选择"){
      that.setData({
        village: '',
      
      })
    }else{
      that.setData({
        village: e.detail.currentTarget.dataset.village

      })
    }
    that.setData({
      show: false,
      province: e.detail.currentTarget.dataset.province,
      city: e.detail.currentTarget.dataset.city,
      area: e.detail.currentTarget.dataset.area,
      // village: e.detail.currentTarget.dataset.village,
      showAddress: true
    })
  },
  cancleSelectAreaLis: function () {
    this.setData({
      show: false
    })
  },
  chooseAddress: function () {
    var that = this;
    console.log(that.data.address)
    that.setData({
      show: true,
      showAddress: false
    })
  }
})