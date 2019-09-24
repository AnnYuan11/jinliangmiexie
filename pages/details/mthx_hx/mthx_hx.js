// pages/details/mthx_hx/mthx_hx.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var util = require('../../../utils/util.js');
var url = 'https://jlmxcs.jlzn365.com'
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
    console.log(options)
    this.setData({
      options:options,
      tqmc:options.name,
      receiptCode: options.receiptCode,
      dizhi: options.dizhi,
      dzid: options.dzid,
      names: options.names,
      phone:options.phone
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
  addShdz:function(e){
    console.log(e)
    var that = this;
    var userId = wx.getStorageSync('userId');
    // if (e.detail.value.shoesNumber){
      var params = {
        url: '/app/orderV3/addMenuOrderInfoMt',
        method: 'POST',
        data: {
          'paymentOrderNumber': that.data.receiptCode,
          'userAddressInfo.id': that.data.dzid,
          'userInfo.id': userId,
          'orderType': 1,
          // 'shoesNumber': e.detail.value.shoesNumber,
          'remark': e.detail.value.remark
        },
        sCallBack: function (data) {
          console.log(data)
          if (data.data.errorCode==0){
            wx.showToast({
              title: data.data.result,
              icon: 'none',
              mask: true,
              duration: 3000,
              success: function () {
                setTimeout(function () {
                  wx.switchTab({
                    url: '/pages/details/dingdan_new/dingdan_new',
                  })
                }, 1000);

              }
            })
          }
        
        },
        eCallBack: function () {
        }
      }
      base.request(params);
    // }else{
    //   wx.showToast({
    //     title: '请输入鞋的数量',
    //     icon: 'none',
    //     mask: true,
    //   })
    // }
   
  }
})