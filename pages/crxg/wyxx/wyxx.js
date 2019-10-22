// pages/crxg/wyxx/wyxx.js
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
    showzf: false,
    type: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    console.log(options)
    var dizhis = options.dizhi;
    if (dizhis) {
      dizhis = options.dizhi.substring(dizhis.length - 9)
    }
    this.setData({
      options: options,
      id: options.id,
      menuMoney: options.menuMoney,
      dizhi: options.address,
      shoeNumber: options.shoeNumber,
      equipmentInfoId: options.equipmentInfoId,

    })

    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    this.mapViewTap();
    // 账户余额
    this.refresh();
    // 获取openid
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
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log(res.data)
       
      }
    })
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
    var that = this;

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
  //备注
  bindTextAreaBlur: function (e) {
    this.setData({
      remark: e.detail.value
    })
    console.log(e.detail.value)
  },


  // 附近站点
  mapViewTap: function () {
    var that = this;
    setTimeout(() => {
      wx.getLocation({
        type: 'gcj02',
        success(res) {
          console.log(res)
          const latitude = res.latitude
          const longitude = res.longitude
          const speed = res.speed
          const accuracy = res.accuracy
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude
          })
          that.list();
        },
        fail(er) {
          var params = {
            url: '/app/user/listEquipmentInfoByDistance',
            method: 'POST',
            data: {

            },
            sCallBack: function (data) {
              console.log(data)
              that.setData({
                list: data.data.result,
              })
            },
            eCallBack: function () { }
          }
          base.request(params);
        }
      })
    }, 1000)

  },
  list: function () {
    var that = this;
    var params = {
      url: '/app/user/listEquipmentInfoByDistance',
      method: 'POST',
      data: {
        'myLng': that.data.longitude,
        'myLat': that.data.latitude,
      },
      sCallBack: function (data) {
        console.log(data)
        that.setData({
          list: data.data.result,
          fjzd: data.data.result[0].address
        })
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  fjzd: function () {
    wx.navigateTo({
      url: '/pages/details/fjzd3/fjzd3',
    })
  },

  // 支付方式选择
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      type: e.detail.value
    })
  },
  surePay: function () {
    var that = this;
    var type = that.data.type;
    console.log(type);
    if (type == "1") {
      that.zhkk();
    } else {
      that.zxzf();
    }
  },
  // 账户扣款
  zhkk: function () {
    var that = this;
    var orderNumber = that.data.orderNumber;
    that.setData({
      showzf: false,
    })
    console.log(orderNumber)
    var params = {
      url: '/app/orderV3/updateMenuPaymentStatusYe',
      method: 'POST',
      data: {
        'orderNumber': orderNumber,
      },
      sCallBack: function (data) {
        console.log(data)
        that.setData({
          showzf: false,
        })
        if (data.data.errorCode == "0") {
          // that.success();
          wx.showToast({
            title: '已支付成功，请耐心等待您的美鞋！',
            icon: 'none',
            duration: 3000,
            success: function () {
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/details/dingdan_new/dingdan_new',
                })
              }, 3000);

            }
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: data.data.errorMsg,
          })
        }
      },
      eCallBack: function () {
      }
    }
    base.request(params);

  },
  // 在线支付
  zxzf: function () {
    var that = this;
    var orderNumber = that.data.orderNumber;
    console.log(orderNumber)
    var openId = that.data.openId;
    console.log(openId)
    var params = {
      url: '/payment/getOrderStr',
      method: 'POST',
      data: {
        'openId': openId,
        'type': 3,
        'orderNumber': orderNumber,
        'price': that.data.menuMoney
        // 'price': 0.01
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
                      url: '/pages/details/dingdan_new/dingdan_new',
                    })
                  }, 3000);

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
  guan: function () {
    var that = this;
    that.setData({
      showzf: false,

    })
  },
  // 获取账户余额
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
        that.setData({
          money: res.data.result.money
        })
        // console.log(that.data.money)
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  // 提交
  submit: function (e) {
    console.log(e)
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
 
    var that = this;
    var regx = /^1(3|4|5|7|8|9)\d{9}$/;
    var phone = e.detail.value.phone;
    if (phone == "" || phone == null || phone == undefined) {
      wx.showToast({
        title: '请输入您的手机号码',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    else if (phone.length < 11 || !regx.test(phone) || phone.length > 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      })
      return;
    }else{
      if (that.data.equipmentInfoId) {       
        console.log(userId)
        if (userId == undefined || userId == "") {
          wx.showToast({
            title:'用户未登录，请登录',
            icon: 'none',
            duration: 1000,
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/login/login',
            })
          }, 1500)
          return;
        }
        if (that.data.remark == undefined || that.data.remark == "") {
          that.data.remark = ""
        }
        var params = {
          url: '/app/orderV3/addMenuOrderInfo',
          method: 'POST',
          data: {
            'menuPriceInfo.id': that.data.id,
            'equipmentInfo.id': that.data.equipmentInfoId,
            'userInfo.id': userId,
            'remark': that.data.remark,
            'orderType': 1,
            'userPhone': phone
          },
          sCallBack: function (res) {
            console.log(res)
            that.setData({
              orderNumber: res.data.result
            })
            that.setData({
              showzf: true
            })
          },
          eCallBack: function () {
          }
        }
        base.request(params);
      } else {
        wx.showToast({
          title: '请选择鞋柜地址',
          icon: 'none'
        })
      }
    }
   

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
              wx.setStorage({
                key: 'openId',
                data: data.data.result.openId,
              })
              that.setData({
                openId: data.data.result.openId,
                sessionKey: data.data.result.sessionKey
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