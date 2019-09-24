// pages/details/tuijian/tuijian.js
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
    this.refresh();
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
  // 用户信息
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
        if (res.data.result.cashRole==1){
          that.setData({
            type: '普通用户',
          })
        }else{
          that.setData({
            type: '员工分销商',
          })
        }
        that.setData({
          ljyj: res.data.result.cashMoneyTotal,
          phone: res.data.result.phone,
          wdxj: res.data.result.userCount,
          userPhone: res.data.result.userPhone,
          cashPermission: res.data.result.cashPermission,
          cashMoney: res.data.result.cashMoney,
          cashMoneyTotal: res.data.result.cashMoneyTotal
        })
        console.log(that.data.money)
       
      },
      eCallBack: function () {
      }
    }

    base.request(params);
  },
  ljtx:function(){
    var that = this;
    console.log(that.data.cashMoney)
    var istx = that.data.cashPermission;
    var money = that.data.cashMoney;
    console.log(money)
    if (istx=='0'){
      wx.showToast({
        title: '没有权限',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if(money=='0'){
      wx.showToast({
        title: '可提现金额为0',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    else{
      var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
      var params = {
        url: '/app/order/addCashOrderInfo',
        data: {
          'money': money,
          'userInfo.id': userId
        },
        method: 'POST',
        sCallBack: function (data) {
          console.log(data)
          if (data.data.errorCode=="0"){
            wx.showToast({
              title: data.data.result,
              icon: 'none',
              duration: 1000
            })
          }else{
            wx.showToast({
              title: data.data.errorMsg,
              icon: 'none',
              duration: 1000
            })
          }
        
        

        },
        eCallBack: function () {
        }
      }
      base.request(params);
    }
  }
})