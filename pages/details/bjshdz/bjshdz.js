// pages/details/bjshdz/bjshdz.js
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
    isChecked:false,
    province: '',
    city: '',
    area: '',
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.bianji();
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
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      province: e.detail.value[0],
      city: e.detail.value[1],
      area: e.detail.value[2]
    })
  },
  // 开关
  switch1Change: function (e) {
    this.ischecked();
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
  beizhu: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  // 收货地址回显
  bianji:function(e){
    var that = this;
    var params = {
      url: '/app/user/findUserAddressInfo',
      method: 'POST',
      data: {
        'id':that.data.id
      },
      sCallBack: function (data) {
        console.log(data)
        // var region = [];
        // region.push(data.data.result.province, data.data.result.city, data.data.result.area),
        // console.log(region)
        var province = data.data.result.province;

        if (data.data.result.isDefault=="0"){
          that.setData({
            isChecked: false,
          })
        }else{
          that.setData({
            isChecked: true,
          })
        }
        that.setData({
          name: data.data.result.name,
          phone:data.data.result.phone,
          province: data.data.result.province,
          city: data.data.result.city,
          area: data.data.result.area,
          address: data.data.result.address
        })
    

      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },

  // 添加收货地址
  addShdz: function (e) {
    var that = this;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    that.setData({
      userId: userId
    });
    var userId = that.data.userId;
    var dz = that.data.province;
    var regx = /^1\d{10}$/;
    console.log(that.data.region)
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
    }else{
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
          'id': that.data.id
        },
        sCallBack: function (data) {
          console.log(data)
          if (data.data.errorCode == "0") {
            wx.showToast({
              title: '修改成功！',
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
  // 删除收货地址
  deleteAddress:function(){
    var that = this;
    if (that.data.isChecked == true) {
      wx.showToast({
        title: '默认地址不能删除',
        icon: 'none',
        duration: 1000
      })
    }else{
      var params = {
        url: '/app/user/deleteUserAddressInfo',
        method: 'POST',
        data: {
          'id': that.data.id
        },
        sCallBack: function (data) {
          if (data.data.errorCode == "0") {
            wx.showToast({
              title: '删除成功！',
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
  // 是否为默认地址
  ischecked:function(){
    var that = this;
    var params = {
      url: '/app/user/updateUserAddressInfoDefault',
      method: 'POST',
      data: {
        'id': that.data.id
      },
      sCallBack: function (data) {
        console.log(data)

      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  // 选择地址
  sureSelectAreaListener: function (e) {
    var that = this;
    console.log(e)
    that.setData({
      show: false,
      province: e.detail.currentTarget.dataset.province,
      city: e.detail.currentTarget.dataset.city,
      area: e.detail.currentTarget.dataset.area
    })
  },
  cancleSelectAreaLis: function () {
    this.setData({
      show: false
    })
  },
  chooseAddress: function () {
    console.log("xuanzedizhi")
    var that = this;
    that.setData({
      show: true
    })
  }
})