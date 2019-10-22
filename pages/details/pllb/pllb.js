// pages/details/pllb/pllb.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var util = require('../../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgArr:[
     
    ],
    page: 1, //页码
    size: 10, //每页多少条数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.pinglun();
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
  pinglun: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var params = {
      url: '/app/order/listUserCommentInfo',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        pageIndex: that.data.page,
        pageSize: that.data.size
      },
      method: 'GET',
      sCallBack: function (data) {
        console.log(data)
        var pinglun = data.data.result;
        var imgUrl = that.data.imgUrl;
        for (var i = 0; i < pinglun.length; i++) {
          // if (pinglun[i].photo==''){
          //   pinglun[i].photo = '[]';
          // }
          if (pinglun[i].photo != '[]') {
            var img = JSON.parse(pinglun[i].photo);
            pinglun[i].img = img;
          }
          var nickName = pinglun[i].userInfo.nickName.substr(5, 16);
          var nickNames = nickName.replace(nickName.substring(3, 7), "****")
          pinglun[i].userInfo.nickName = nickNames;
          if (pinglun[i].content == "undefined") {
            pinglun[i].content = "无";
          }
          // console.log(pinglun[i].img)
          that.setData({
            pinglun: pinglun,
            imgArr: pinglun[i].img
          })
           wx.hideLoading()
          // console.log(that.data.imgArr)
          var imgUrl = that.data.imgUrl
          var imgArr = that.data.imgArr
          imgArr[i] = (imgUrl + imgArr[i]);
            
        }
        that.setData({
          imgArr: imgArr
        })
        // console.log(that.data.imgArr)
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },

// 下拉加载
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    // 页数+1
    var page = ++that.data.page;
    var params = {
      url: '/app/order/listUserCommentInfo',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        pageIndex: page,
        pageSize: that.data.size
      },
      method: 'GET',
      sCallBack: function (data) {
        console.log(data)
        var pinglun2 = data.data.result;
        var pinglun = that.data.pinglun;
        // console.log(pinglun)
        for (var i = 0; i < data.data.result.length; i++) {
          pinglun.push(data.data.result[i]);
        }
        var imgUrl = that.data.imgUrl;
        for (var i = 0; i < pinglun2.length; i++) {
          if (pinglun2[i].photo == '') {
            pinglun2[i].photo = '[]';
          }
          var img = JSON.parse(pinglun2[i].photo);
          pinglun2[i].img = img;
          var nickName = pinglun2[i].userInfo.nickName.substr(5, 16);
          console.log(nickName)
          var nickNames = nickName.replace(nickName.substring(3, 7), "****")
          console.log(nickNames)
          // var nickNames = pinglun[i].userInfo.nickName
          pinglun2[i].userInfo.nickName = nickNames;
          if (pinglun2[i].content == "undefined") {
            pinglun2[i].content = "无";
          }
          // console.log(pinglun[i].img)
          that.setData({
            pinglun: pinglun,
            imgArr: pinglun[i].img
          })
          wx.hideLoading()
          // console.log(that.data.imgArr)
          var imgUrl = that.data.imgUrl
          var imgArr = that.data.imgArr
          imgArr[i] = (imgUrl + imgArr[i]);

        }
        that.setData({
          imgArr: imgArr
        })
        // console.log(that.data.imgArr)
      },
      eCallBack: function () {
      }
    }
    base.request(params);

  },




















  // 图片预览
  previewImg: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var imgUrl = this.data.imgUrl;
    var lists = e.currentTarget.dataset.list;
    for(var i = 0;i<lists.length;i++){
      lists[i] = imgUrl + '/'+lists[i]
      console.log(lists)
    }
    this.setData({
      lists:lists
    })
    wx.previewImage({
      current: e.currentTarget.dataset.src,//当前图片地址
      urls: e.currentTarget.dataset.list,//所有要预览的图片的地址集合 数组形式
    })
  }

})