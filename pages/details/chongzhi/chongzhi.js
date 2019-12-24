// pages/details/chongzhi/chongzhi.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var url = 'https://jlmxcs.jlzn365.com'
// var url = 'https://jlmxcs.jlzn365.com'
var util = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
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
    this.list();
    this.getOpenId();
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
  menuClick: function (e) {
    var that = this;
    that.setData({
      _num: e.target.dataset.num,
      // id: e.target.dataset.id,
      rechargemoney: e.target.dataset.rechargemoney,
      givemoney: e.target.dataset.givemoney,
      inputVal: ''
    })
    // console.log(that.data)
  },
  // 添加充值订单
  addcz: function () {
    var that = this;
    // 获取userID
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    that.setData({
      userId: userId
    });

    // var userId = that.data.userId;
    var rechargeMoney1 = that.data.rechargemoney;
    console.log(rechargeMoney1)
    var giveMoney = that.data.givemoney;
    var paymentMoney = rechargeMoney1;
    var rechargeMoney = parseInt(rechargeMoney1) + parseInt(giveMoney);
    console.log(giveMoney)
    console.log(rechargeMoney)
    var params = {
      url: '/app/order/addRechargeOrderInfo',
      method: 'POST',
      data: {
        'userInfo.id': that.data.userId,
        'rechargeMoney': rechargeMoney,
        'giveMoney': giveMoney,
        'paymentMoney': paymentMoney
      },

      sCallBack: function (data) {
        console.log(data)
        that.setData({
          id: data.data.result.id
        })
        if (data.data.errorCode == "0") {
          that.ljcz();
        }


      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  list: function () {
    var that = this;
    var params = {
      url: '/app/order/listRechargeGiveInfo',
      method: 'POST',
      data: {
        'pageSize': 1000000,
        'pageIndex': 1,
      },
      sCallBack: function (data) {
        console.log(data)
        var list = data.data.result;
        that.setData({
          list: list
        })
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
  // checkboxChange: function (e) {
  //   console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  // },
  // bindCheckbox:function(){
  //   wx.showToast({
  //     title: '啊啊啊',
  //     icon:none,
  //   })
  // },
  // 充值
  ljcz: function () {
    var that = this;
    console.log(that.data.id)
    var params = {
      url: '/payment/getOrderStr',
      method: 'POST',
      data: {
        'id': that.data.id,
        'openId': that.data.openId,
        'type': 1
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
              wx.showToast({
                title: '支付成功！',
                icon: 'none',
                duration: 1000,
                success: function () {
                  wx.switchTab({
                    url: '../../wode/my/my'
                  })
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
      }
    }
    base.request(params);
  },
  // 自定义输入值
  input: function (e) {
    var inputVal = e.detail.value;
    console.log(inputVal)
    if (e.detail.value < 1 || e.detail.value > 100) {
      wx.showToast({
        icon: 'none',
        title: '请输入1-100的金额',
      })
      this.setData({
        inputVal: ''
      })
      return;

    }
    this.setData({
      inputVal: e.detail.value,
      givemoney: 0,
      _num: -1
    })
    this.setData({
      rechargemoney: this.data.inputVal,
    })

    console.log(this.data.rechargemoney)
  }

})