//app.js
import { Base } from "utils/request/base.js";
var base = new Base();
// var url = 'https://www.jlzn365.com'
var url = 'https://www.jlzn365.com'
var util = require('utils/util.js');
App({
  
  globalData: {
    userInfo: null,
    imgUrl: "http://www.jlzn365.com:8585"
  },
  //  refresh: function () {
  //   var that = this;
  //   var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
  //   console.log(userId)
  //   var params = {
  //     url: '/app/user/findById',
  //     method: 'POST',
  //     data: {
  //       'id': userId
  //     },
  //     sCallBack: function (res) {
  //    console.log(res)
  //       wx.setStorage({
  //         key: 'money',
  //         data: res.data.result.money
  //       })
  //     },
  //     eCallBack: function () {
  //     }
  //   }
  //   base.request(params);
  // }
  //获取openID
  getOpenId: function () {
    var that = this;
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: url + '/app/getOpenId?code=' + res.code,
            // header:{'content-type': 'application/x-www-form-urlencoded' },
            success: function (data) {
              console.log(data);
              wx.setStorage({
                key: 'openId',
                data: data.data.result.openId,
              })
            },
            fail: function (data) {
              // console.log(data);
            }
          })
        }
      }
    })
  }

})