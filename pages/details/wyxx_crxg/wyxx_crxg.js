// pages/details/wyxx_crxg/wyxx_crxg.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var util = require('../../../utils/util.js');
var app = getApp()
// var url = 'https://www.jlzn365.com'
var url = 'https://www.jlzn365.com'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    show1: false,
    show2: true,
    // money:'请查看是否有可使用红包'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    console.log(options)
    if (options.num != undefined) {
      this.setData({
        num: options.num
      })
    } else {
      this.setData({
        num: 1
      })
    }
    var dizhis = options.dizhi;
    if (dizhis) {
      dizhis = options.dizhi.substring(dizhis.length - 10)
    }
    this.setData({
      zdid: options.zdid,
      dizhi: dizhis,
      adaddress: options.adaddress,
      dzid: options.dzid,
      type1: options.type1,
      userCouponInfoId: options.userCouponInfoId,
    })

    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    // 洗鞋背景图片的调用
    this.bgImg();
    this.getOpenId();
    this.mapViewTap();
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
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    that.setData({
      userId: userId
    });
    var userId = that.data.userId;
    var id = that.data.dzid;
    console.log(id)
    var equipmentInfo = that.data.zdid;
    if (that.data.remark == undefined || that.data.remark == "") {
      that.data.remark = ""
    }
    if (equipmentInfo == undefined || equipmentInfo == "") {
      equipmentInfo = ""
    }
   
    if (id == undefined || id == "") {
      id = ""
    }
    var params = {
      url: '/app/order/addMenuOrderInfo',
      method: 'POST',
      data: {
        'menuType':1,
        'userInfo.id': userId,
        'remark': that.data.remark,
        'equipmentInfo.id': equipmentInfo
      },
      sCallBack: function (data) {
        console.log(data)
        wx.hideLoading()
        if (data.data.errorCode == "0") {
          that.setData({
            //  isShow: true,
            show1: !that.data.show1,
            show2: !that.data.show2,
            id: data.data.result
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
              title: "请完善信息",
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
    var id = that.data.id;
    console.log(id)
    var params = {
      url: '/payment/getOrderStr',
      method: 'POST',
      data: {
        'openId': that.data.openId,
        'type': 3,
        'id':id,
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
  }

})