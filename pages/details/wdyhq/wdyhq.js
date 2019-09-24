// pages/details/wdyhq/wdyhq.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var util = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    if (options.num) {
      this.setData({
        num: options.num
      })
    } else {
      this.setData({
        num: 1
      })
    }
    this.setData({
      // num: options.num,
      dizhi: options.dizhi,
      dzid: options.dzid,
      type1: options.type1,
      adaddress: options.adaddress,
      zdid: options.zdid

    })
    this.yhqlist();
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

  yhqlist:function(){
    var that = this;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    that.setData({
      userId: userId
    });
    var userId = that.data.userId;
    var params = {
      url: '/app/user/listUserCouponInfo',
      method: 'POST',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
        'userInfo.id': userId
      },
      sCallBack: function (data) {
        console.log(data)
        if(data.data.result.length==0){
          that.setData({
            isshow:true
          })
        }else{
          var list = data.data.result;
          for (var i = 0; i < list.length; i++) {
            var types = list[i].couponInfo.type;
            var startTime = list[i].startTime.substring(0, 10);
            var endTime = list[i].endTime.substring(0, 10);
            if (types == "1") {
              types = "金额优惠券"
            } else {
              types = "擦鞋优惠券"
            }
            list[i].type = types;
            list[i].startTime = startTime;
            list[i].endTime = endTime;
          }
          that.setData({
            list: list
          })
        }
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  toxixie: function (e) {
    console.log(e)
    var that = this;
    var userCouponInfoId = e.currentTarget.dataset.id;
    var money = e.currentTarget.dataset.money+"元优惠券";
    
    var num = that.data.num;
    var dizhi = that.data.dizhi;
    var dzid = that.data.dzid
    var type1 = that.data.type1;
    var adaddress = that.data.adaddress;
    var zdid = that.data.zdid;
    // wx.setStorage({
    //   key: 'userId',
    //   data: res.data.result.id
    // })
    // wx.setStorage({
    //   key: "yhq",
    //   data: { id: id, money: money}
    // })
    wx.navigateTo({
      url: '../wyxx/wyxx?num=' + num + '&dizhi=' + dizhi + '&dzid=' + dzid + '&type1=' + type1 + '&userCouponInfoId=' + userCouponInfoId + '&zdid=' + zdid + '&adaddress=' + adaddress+'&money='+money,
    })
  }
})