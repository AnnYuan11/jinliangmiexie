// pages/details/mthx/mthx.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var util = require('../../../utils/util.js');
var url = 'https://www.jlzn365.com'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isYes:false,
    imgUrl:'',
    isNo:false
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
  hx:function(e){
    console.log(e)
    var that = this;
    var receiptCode = e.detail.value.receiptCode
    if (receiptCode){
      var params = {
        url: '/app/getMtQuan',
        method: 'POST',
        data: {
          'receiptCode': receiptCode
        },
        sCallBack: function (data) {
          console.log(data)
          if (data.data.errorCode == "0") {
            // that.success();
            that.setData({
              isYes: true,
              name: data.data.result.name,
              receiptCode: data.data.result.receiptCode
            })

          } else {
            that.setData({
              isNo: true
            })
            // wx.showToast({
            //   icon: 'none',
            //   title: data.data.errorMsg,
            // })
          }
        },
        eCallBack: function () {
        }
      }
      base.request(params);
    }else{
      wx.showToast({
        icon: 'none',
        title: '请输入您的核销码'
      })
    }
   
  },
  sure:function(){
    var that = this;
    setTimeout(function () {
      wx.navigateTo({
        url: '/pages/details/mthx_hx/mthx_hx?name=' + that.data.name + '&receiptCode=' + that.data.receiptCode,
      })
    }, 1000);
  },
  sure2: function () {
    var that = this;
    that.setData({
      isNo:false
    })
  }
})