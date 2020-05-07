// pages/MemberVip/Xfrenew/xf.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
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
    var that=this;
    that.list()
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
   // 套餐列表
   list(){
    var that = this;
    var userId = wx.getStorageSync('userId');
    var params = {
      url: '/app/user/listWashPackageInfo',
      method: 'POST',
      data: {
        'pageIndex':1,
        'pageSize':10,
        'userId':userId
      },
      sCallBack: function (res) {
        console.log(res)
        that.setData({
          list:res.data.result
        })
      
       
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  // 立即购
  pay(){
    var that = this;
    var openId = wx.getStorageSync('openId');
    console.log(openId)
    var params = {
      url: '/payment/getOrderStr',
      method: 'POST',
      data: {
        'openId':openId,
        'type': 5,
        'orderNumber': that.data.orderNumber,
        'price': that.data.paymentMoney       
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
                title: '已支付成功',
                icon: 'none',
                duration: 3000,
                success: function () {
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
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
  // 立即购添加订单
  add(e){
    console.log(e)
    var that=this;
    var phone='';
    var userId = wx.getStorageSync('userId');
    var params = {
      url: '/app/orderV31/addUserWashPackageOrderInfo',
      method: 'POST',
      data: {
        'washPackageInfo.id':e.currentTarget.dataset.id,
        'userInfo.id':userId,
        'referrerUserInfo.id':phone,
      },
      sCallBack: function (data) {
        console.log(data)
        if (data.data.errorCode == "0") {
         that.setData({
          orderNumber:data.data.result.orderNumber,
          paymentMoney:data.data.result.paymentMoney
         })
         that.pay()
        }
      },
      eCallBack: function () {
        console.log("出错了")
      }
    }
    base.request(params);
  },
})