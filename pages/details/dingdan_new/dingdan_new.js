// pages/details/dingdan_new/dingdan_new.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var util = require('../../../utils/util.js');
var app = getApp();
var url = 'https://jlmxcs.jlzn365.com'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showzf:false,
    type:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    that.list();
    that.getOpenId();
    that.refresh();
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
    this.list();
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
  // 列表
  list:function(){
    var that = this;
    // 获取userID
    var userId = wx.getStorageSync('userId');
    var params = {
      url: '/app/orderV3/listWashOrderInfoV3',
      method: 'POST',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
        'userInfo.id': userId
      },
      sCallBack: function (data) {
        console.log(data)
        var list = data.data.result;
        for (var i = 0; i < list.length; i++) {
          var orderType = list[i].orderType;
          var authStatus = list[i].authStatus;
          var paymentStatus = list[i].paymentStatus;
          var orderStatusTotal = list[i].orderStatusTotal;
         
          if (orderType == "1") {
            orderType = "洗鞋订单"
          } else if (orderType == "2"){
            if (orderStatusTotal == 1 && authStatus == 1 && paymentStatus == 0 ) {
              orderStatusTotal = "待支付"
            } else if (orderStatusTotal == 1 && authStatus == 1 && paymentStatus == 1 ) {
              orderStatusTotal = "已支付"
            } else if (orderStatusTotal == 1 && authStatus == 0 && paymentStatus == 0 ) {
              orderStatusTotal = "待审核"
            }
            orderType = "修鞋订单"
          } else if (orderType == "3"){
            orderType = "增补订单"
          }
        
          var takeShoeType = list[i].takeShoeType;
          if (takeShoeType == "1") {
            takeShoeType = "存入鞋柜"
          } else {
            takeShoeType = "上门取鞋"
          }
        
         
          if (orderStatusTotal == "1") {
            orderStatusTotal = "待取货"
          } else if (orderStatusTotal == "2") {
            orderStatusTotal = "已取货"
          } else if (orderStatusTotal == "3") {
            orderStatusTotal = "清洗中"
          }else if (orderStatusTotal == "4") {
            orderStatusTotal = "配送中"
          } else if (orderStatusTotal == "5") {
            orderStatusTotal = "已送达"
          }  
          else if (orderStatusTotal == "6"){
            orderStatusTotal = "已完成"
          } else if (orderStatusTotal == "7") {
            orderStatusTotal = "已评价"
          } else if (orderStatusTotal == "0") {
            orderStatusTotal = "已失效"
          }
          
          list[i].orderStatusTotal = orderStatusTotal;
          list[i].takeShoeType = takeShoeType;
          list[i].orderType = orderType;
        }
        that.setData({
          list: list
          
        })
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  // 支付
  surePay:function(e){
    var that = this;
    console.log(e)
    that.setData({
      showzf:true,
      id:e.currentTarget.dataset.id,
      menuMoney: e.currentTarget.dataset.money,
      orderNumber: e.currentTarget.dataset.ordernumber
    })
  },
  surePay2: function () {
    var that = this;
    var type = that.data.type;
    console.log(type);
    if (type == "1") {
      that.zhkk();
    } else {
      that.zxzf();
    }
  },
  // 支付方式选择
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      type: e.detail.value
    })
  },

  // 账户扣款
  zhkk: function () {
    var that = this;
    that.setData({
      showzf: false,
    })
    console.log( that.data.id)
    var params = {
      url: '/app/orderV3/updateWashOrderInfoStatusPay',
      method: 'POST',
      data: {
        'connectNumber': that.data.id,
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
                that.onLoad();
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
        'type': 2,
        'orderNumber': that.data.orderNumber,
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
                    that.onLoad();
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
  },
  // 确认收货
  sureGoods: function (e) {
    var that = this;
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var params = {
      url: '/app/orderV3/updateWashOrderInfoV3Status',
      method: 'POST',
      data: {
        'id': id,
        'orderStatus': 6,
      },
      sCallBack: function (data) {
        console.log(data)
        if (data.data.errorCode == 0) {
          that.onLoad();
          wx.navigateTo({
            url: '/pages/details/pingjia/pingjia?id=' + id,
          })
        } else {
          wx.showToast({
            title: data.data.errorMsg,
            icon: 'none',
            duration: 3000
          });
        }
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  
})