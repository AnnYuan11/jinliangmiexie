// pages/details/wdcf/wdcf.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var util = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    
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
       money:res.data.result.money
     })
     console.log(that.data.money)
        // wx.setStorage({
        //   key: 'money',
        //   data: res.data.result.money
        // })
        that.wdcf();
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  // 我的财富
  wdcf: function () {
    var that = this;
    // 获取userID
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    // var money = wx.getStorageSync('money');//wx.getStorageSync(key)，获取本地缓存
    var money = that.data.money;
    console.log(money)
    that.setData({
      userId: userId,
      money:money
    });
    var userId = that.data.userId;
    var money = that.data.money;
    var params = {
      url: '/app/user/listMoneyOrderInfo',
      method: 'POST',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
        'userInfo.id': userId
      },
      sCallBack: function (data) {
        console.log(data)
        
        if (data.data.errorCode == -200) {
          wx.showToast({
            title: data.data.errorMsg,
            icon: 'none',
            duration: 1000,
            success: function () {
              setTimeout(function () {
                //要延时执行的代码
                wx.redirectTo({
                  url: '../../login/login'
                })
              }, 2000) //延迟时间
            }
          })
        }else{
          var list1 = data.data;
          that.setData({
            list1: list1,
          })
        }
       
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  // 提现
  // tixian:function(){
  //   var that = this;
  //   var params = {
  //     url: 'https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers',
  //     method: 'POST',
  //     data: {
  //       mch_appid: 1512861461,
  //       mchid: wxf091110394a41f2d,

  //     },
  //     sCallBack: function (data) {
  //       console.log(data)
  //       if (data.data.errorCode == -200) {
  //         wx.showToast({
  //           title: data.data.errorMsg,
  //           icon: 'none',
  //           duration: 1000,
  //           success: function () {
  //             setTimeout(function () {
  //               //要延时执行的代码
  //               wx.redirectTo({
  //                 url: '../../login/login'
  //               })
  //             }, 2000) //延迟时间
  //           }
  //         })
  //       } else {
  //         var list1 = data.data;
  //         that.setData({
  //           list1: list1,
  //         })
  //       }

  //     },
  //     eCallBack: function () {
  //     }
  //   }
  //   base.request(params);
  // }
})