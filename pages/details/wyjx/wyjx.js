// pages/details/wyjx/wyjx.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var util = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    selected:false
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
  // 增加
  jia: function () {
    // var num = wx.getStorageSync('num');//wx.getStorageSync(key)，获取本地缓存
    // console.log(num)
    var num = this.data.num;
    num++;
    if (num > 3) {
      wx.showToast({
        title: "最多只能选3双",
        icon: 'none',
        duration: 1000
      })
      return;
    }
    this.setData({
      num: num,
    })

    // console.log(this.data.num)
    //  wx.setStorage({
    //   key: 'num',
    //   data: this.data.num
    // })
  },

  // 减
  jian: function () {
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    this.setData({
      num: num,
    })
    // wx.setStorage({
    //   key: 'num',
    //   data: this.data.num
    // })
  },
  juanzneg:function(){
    console.log(this.data.num)
    var num = this.data.num;
    if (this.data.selected==true){
      wx.navigateTo({
        url: '../jx_address/jx_address?num=' + num,
      })
    }else{
      wx.showToast({
        title: "信息填写不完善",
        icon: 'none',
        duration: 1000
      })
    }
    
  },
  // 选择
  selectList: function () {
    var selected = this.data.selected;
   this.setData({
    selected : !selected
   })
  },
})