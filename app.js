//app.js
import { Base } from "utils/request/base.js";
var base = new Base();
// var url = 'https://www.jlzn365.com'
var url = 'https://www.jlzn365.com'
var util = require('utils/util.js');
App({
  
  globalData: {
    userInfo: null,
    // imgUrl:"https://www.jlzn365.com:8585"
    imgUrl: "https://www.jlzn365.com:8585"
  }
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

})