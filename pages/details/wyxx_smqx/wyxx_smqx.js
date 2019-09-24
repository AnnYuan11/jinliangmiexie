// pages/details/wyxx/wyxx.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var util = require('../../../utils/util.js');
var app = getApp()
// var url = 'https://jlmxcs.jlzn365.com'
var url = 'https://www.jlzn365.com'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    if (options.num != undefined) {
      this.setData({
        num: options.num
      })
    }
    if (options.num =='3') {
      this.setData({
        menuType: 2
      })
    } else if (options.num == '4'){
      this.setData({
        menuType: 3
      })
    }else if (options.num == '5') {
      this.setData({
        menuType: 4
      })
    }
    this.setData({
      zdid: options.zdid,
      dizhi: options.dizhi,
      adaddress: options.adaddress,
      dzid: options.dzid
    })
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    // 洗鞋背景图片的调用
    this.bgImg();
    this.getOpenId();
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
  // 获取textarea的值
  bindTextAreaBlur: function (e) {
    this.setData({
      remark: e.detail.value
    })
    console.log(e.detail.value)
  },
  wyxx: function () {
    var that = this;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    that.setData({
      userId: userId
    });
    var userId = that.data.userId;
    var menuType = that.data.menuType;
    var id = that.data.dzid;
    console.log(id)
    if (that.data.remark == undefined || that.data.remark == "") {
      that.data.remark = ""
    }
    if (id == undefined || id == "") {
      wx.showToast({
        title: "请选择地址",
        icon: 'none',
        duration: 1000
      })
      return;
    }
    var params = {
      url: '/app/order/addMenuOrderInfo',
      method: 'POST',
      data: {
        'menuType': menuType,
        'userInfo.id': userId,
        'userAddressInfo.id': id,
        'remark': that.data.remark,
      },
      sCallBack: function (data) {
        console.log(data)
        if (data.data.errorCode == "0") {
          that.setData({
            isShow: true,
            zfid:data.data.result
          })
          that.zxzf();
        } else {
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
          } else {
            wx.showToast({
              title: "提交失败",
              icon: 'none',
              duration: 1000
            })
          }
        }
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
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
              that.setData({
                openId: data.data.result.openId,
              })
            },
            fail: function (data) {
              console.log(data);
            }
          })
        }
      }
    })
  },
  // 在线支付
  zxzf: function () {
    var that = this;
    var id = that.data.zfid;
    console.log(that.data.openId)
    var params = {
      url: '/payment/getOrderStr',
      method: 'POST',
      data: {
        'openId': that.data.openId,
        'type': 3,
        'id': id,
      },
      sCallBack: function (data) {
        console.log(data)
        if (data.data.errorCode == "0") {
          wx.requestPayment({
            appId: 'wxf091110394a41f2d',
            timeStamp: data.data.result['timeStamp'],
            nonceStr: data.data.result['nonceStr'],
            package: data.data.result['packageValue'],
            signType: 'MD5',
            paySign: data.data.result['paySign'],
            'success': function (res) {
              console.log(res)
              that.setData({
                showzf: false,
              })
              wx.showToast({
                title: '已支付成功，请耐心等待您的美鞋！',
                icon: 'none',
                duration: 3000,
                success: function () {
                 
                  setTimeout(function () {
                  wx.switchTab({
                      url: '/pages/index/index'
                    })

                  }, 1500);

                }
              })
            },
            fail: function (e) {
              console.log(e)
            }
          })
        }
      },
      eCallBack: function () {
        console.log("出错了")
      }
    }
    base.request(params);
  },


 
  // 洗鞋背景图片
  bgImg: function () {
    var that = this;
    var params = {
      url: '/app/findAllBannerType',
      method: 'GET',

      sCallBack: function (data) {
        that.setData({
          img_bg: data.data.result.photo
        })

      },
      eCallBack: function () {
      }
    }
    base.request(params);
  }

})