// pages/details/jbdh/jbdh.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var url = 'https://www.jlzn365.com'
// var url = 'https://jlmxcs.jlzn365.com'
var util = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ydh:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    // that.goto_logs();
    that.getOpenId();
   
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    if (userId == "" || userId == null) {
      wx.showToast({
        title: "用户未登录",
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
    }else{
      that.jbdh();
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
              that.setData({
                openId: data.data.result.openId,
                sessionKey: data.data.result.sessionKey
              })
              wx.getWeRunData({
                success(res) {
                  const encryptedData = res.encryptedData;
                  const iv = res.iv;
                  that.setData({
                    encryptedData: encryptedData,
                    iv: iv,
                  })
                  var params = {
                    url: '/app/user/getRunData',
                    method: 'POST',
                    data: {
                      'viStr': that.data.iv,
                      'encryptedDataStr': that.data.encryptedData,
                      'sessionKey': that.data.sessionKey
                    },
                    sCallBack: function (data) {
                      var list = JSON.parse(data.data.result);
                      that.setData({
                        suiji: list.stepInfoList[30].step
                        // suiji:20000
                      })
                    },
                    eCallBack: function () {
                    }
                  }
                  base.request(params);
                }
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
  ljdh:function(e){
    var that = this;
    console.log(e)
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    // wx.clearStorageSync()
    console.log(userId)
    if (userId == "" || userId == null) {
      wx.showToast({
        title:"用户未登录",
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
      var suiji = that.data.suiji;
      // var suiji = 6000;
        console.log(suiji);
      var start = e.currentTarget.dataset.start;
      var end = e.currentTarget.dataset.end;
      var id = e.currentTarget.dataset.id;
      var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
      if(suiji>start&&suiji<end){
        var params = {
          url: '/app/user/addUserCouponInfo',
          method: 'POST',
          data: {
            'couponInfo.id': id,
            'userInfo.id': userId,
            'couponType':1
          },
          sCallBack: function (data) {
            console.log(data)
            if (data.data.errorCode==0){
              that.setData({
                isShow: true,
                ydh:false
              })
            }else{
              wx.showToast({
                title: data.data.errorMsg,
                icon: 'none',
                duration: 1000,
              })
            }
          },
          eCallBack: function () {
          }
        }
        base.request(params);

      }else{
        wx.showToast({
          title: "不符合兑换标准",
          icon: 'none',
          duration: 2000
        })
      }
      
    }
  },

  // 关闭浮层
  hideCovew: function () {
    var that = this;
    that.setData({
      isShow: false,
      show: true,
    })
    wx.switchTab({
      url: '../../index/index'
    })
  },

  // 计步列表
  jbdh:function(){
    var that = this;
    // 获取userID
    var userId = that.data.userId;
    var params = {
      url: '/app/user/listJbCouponInfo',
      method: 'POST',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000
      },
      sCallBack: function (data) {
        console.log(data)
        var list = data.data.result;
        that.setData({
          list: list,
        })
        // for(var i = 0;i<list.lenght;i++){
        //   that.setData({
        //     start: list[i].startStep,
        //     end: list[i].endStep
        //   })
        // }
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  }
})