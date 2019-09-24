import { Config } from "config.js";

var app = getApp();

class Base {
  constructor() {
    this.baseRequestUrl = Config.baseUrl;
  }
  //封装好的请求方法
  request(params) {
    var that = this;
    var sessionId = wx.getStorageSync('sessionId');//wx.getStorageSync(key)，获取本地缓存
    if (sessionId != "" && sessionId != null) {
      var header = { 'Content-Type': 'application/x-www-form-urlencoded', 'Cookie':'SESSION='+ sessionId}
    } else {
      var header = { 'content-type': 'application/x-www-form-urlencoded' }
    }
    if (!params.method) {
      params.method = "GET";
    }
    wx.request({
      url: this.baseRequestUrl + params.url,
      data: params.data,
      method: params.method,
      header: header,
      success: function (res) {
        // console.log(res);
        params.sCallBack && params.sCallBack(res);
      },
      fail: function (res) {
        params.eCallBack && params.eCallBack(res);
      },
      complete: function (res) { },
    })
  }
}

export { Base }
