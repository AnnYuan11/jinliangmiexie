// pages/details/selectdz/selectdz.js
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
    var that = this;
    
    console.log(options)
    if (options.types=='3'||options.types=='4'){
      that.address();
    }else{
      that.address_xg();
    }
    that.setData({
      menuMoney: options.menuMoney,
      shoeNumber: options.shoeNumber,
      id:options.id,
      types:options.types,
      num:options.num,
      name:options.name,
      receiptCode: options.receiptCode,
      equipmentInfoId: options.equipmentInfoId,
      address_dizhi: options.address,
      equipmentname: options.equipmentname
    })
    // console.log(that.data.num)
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
    // this.onLoad()
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
  // 我的地址
  address: function () {
    var that = this;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    that.setData({
      userId: userId
    });
    var userId = that.data.userId;
    var params = {
      url: '/app/user/listUserAddressInfo',
      method: 'POST',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
        'userInfo.id': userId
      },
      sCallBack: function (data) {
        console.log(data)
        var list = data.data.result;
        if(data.data.errorCode== -200){
         
          wx.showToast({
            title: data.data.errorMsg,
            icon: 'none',
            duration: 1000,
          })
          setTimeout(function(){
            wx.redirectTo({
              url: '../../login/login',
            })
          },1500)
         
        }else{
           if(list.length == 0){
            wx.redirectTo({
              url: '../dzgl/dzgl',
            })
          }else{
            that.setData({
              list: list
            })
          }
        }
      
      
       
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  address_xg: function () {
    var that = this;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    that.setData({
      userId: userId
    });
    var userId = that.data.userId;
    var params = {
      url: '/app/user/listUserAddressInfoFilter',
      method: 'POST',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
        'userInfo.id': userId
      },
      sCallBack: function (data) {
        console.log(data)
        var list = data.data.result;
        if (data.data.errorCode == -200) {

          wx.showToast({
            title: data.data.errorMsg,
            icon: 'none',
            duration: 1000,
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../../login/login',
            })
          }, 1500)

        } else {
          if (list.length == 0) {
            wx.redirectTo({
              url: '../dzgl/dzgl',
            })
          } else {
            that.setData({
              list: list
            })
          }
        }



      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  toxixie: function (e) {
    var that = this;
    console.log(e)
    var province = e.currentTarget.dataset.province;
    var city = e.currentTarget.dataset.city;
    var area = e.currentTarget.dataset.area;
    var address = e.currentTarget.dataset.address;
    var street = e.currentTarget.dataset.street;
    var dizhi = province + city + area + street+ address;
    var dzid = e.currentTarget.dataset.id;
    var menuMoney = that.data.menuMoney;
    var shoeNumber = that.data.shoeNumber;
    var phone = e.currentTarget.dataset.phone
    var id = that.data.id;
    var types = that.data.types;
    var num = that.data.num;
    var names = e.currentTarget.dataset.name;
    var receiptCode = that.data.receiptCode;
    var name = that.data.name;
    var equipmentInfoId = that.data.equipmentInfoId
    var address_dizhi = that.data.address_dizhi
    var equipmentname = that.data.equipmentname
    console.log(equipmentname)
    if(types==1){
      wx.redirectTo({
        url: '/pages/details/xiuxie/xiuxie?&dizhi=' + dizhi + '&num=' + num + '&phone=' + phone + '&dzid=' + dzid,
      })
    } else if (types == 2){
      wx.redirectTo({
        url: '/pages/details/mthx_hx/mthx_hx?&dizhi=' + dizhi + '&names=' + names + '&phone=' + phone + '&dzid=' + dzid + '&name=' + name + '&receiptCode=' + receiptCode,
      })
    } else if (types == 3) {
      wx.redirectTo({
        url: '/pages/crxg/wyxx/wyxx?&dizhi=' + dizhi + '&menuMoney=' + menuMoney + '&shoeNumber=' + shoeNumber + '&phone=' + phone + '&equipmentInfoId=' + equipmentInfoId + '&address=' + address_dizhi + '&dzid=' + dzid + '&id=' + id + '&equipmentname=' + equipmentname
      })
    } else if (types == 4) {
      wx.redirectTo({
        url: '/pages/crxg/xiuxie/xiuxie?&dizhi=' + dizhi + '&num=' + num + '&phone=' + phone + '&dzid=' + dzid + '&equipmentInfoId=' + equipmentInfoId + '&address=' + address_dizhi + '&equipmentname=' + equipmentname
      })
    }
    else{
      wx.redirectTo({
        // url: '../wyxx/wyxx?num=' + num + '&dizhi=' + dizhi + '&adaddress=' + adaddress + '&dzid=' + dzid + '&zdid=' + zdid + '&type1=' + type1 + '&userCouponInfoId=' + userCouponInfoId+'&money='+money+'&wlf='+wlf ,
        url: '../wyxx/wyxx?&dizhi=' + dizhi + '&menuMoney=' + menuMoney + '&shoeNumber=' + shoeNumber + '&phone=' + phone + '&dzid=' + dzid + '&id=' + id,
      })
    }
   
  },
  // 删除地址
  deleteAddress: function (e) {
    var that = this;
    console.log(e)
    if (e.currentTarget.dataset.default == 1) {
      wx.showToast({
        title: '默认地址不能删除',
        icon: 'none',
        duration: 1000
      })
    } else {
      var params = {
        url: '/app/user/deleteUserAddressInfo',
        method: 'POST',
        data: {
          'id': e.currentTarget.dataset.id
        },
        sCallBack: function (data) {
          console.log(data)
          if (data.data.errorCode == "0") {
            wx.showToast({
              title: '删除成功！',
              icon: 'none',
              duration: 1000,
              success: function () {
                that.onLoad()
              }
            })
          }
        },
        eCallBack: function () {
        }
      }
    }
    base.request(params);
  }
})