98007// pages/login/login.js
import { Base } from "../../utils/request/base.js";
var base = new Base();
// var url = 'https://www.jlzn365.com'
var url = 'https://www.jlzn365.com'
var util = require('../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:"获取验证码",
    time:60,
    flag:false,
    selected:false,
    imgUrl:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // app.refresh();
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    this.getOpenId();
    console.log(options)
 
    if (options.q) {
      console.log(options);
      var scene = decodeURIComponent(options.q);
      console.log("scene is ", scene);
      var arrPara = scene.split("&");
      var arr = [];
      for (var i in arrPara) {
        arr = arrPara[i].split("=");
        wx.setStorageSync(arr[0], arr[1]);
        console.log("setStorageSync:", arr[0], "=", arr[1]);
        console.log(arr[1]);
      }
      this.setData({
        userId2: arr[1]
      })

    } else {
      console.log("no scene");
    }


    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
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
  // 手机号
  bindinput:function(e){
    this.setData({
      phone:e.detail.value
    })
  },
  // 验证码
  bindinput2: function (e) {
    this.setData({
      yzm: e.detail.value
    })
  },
  // 获取验证码
  yzm:function(){
    var that = this;
    var regx = /^1(3|4|5|7|8|9)\d{9}$/;
    // var regx = /^1[0-9]{10}$/;
    var phone = that.data.phone;
    console.log(phone)
    if (phone == "" || phone == null || phone == undefined) {
      wx.showToast({
        title: '请输入您的手机号码',
        icon: 'none',
        duration: 2000
      })
    }
    else if (phone.length < 11 || !regx.test(phone) || phone.length > 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      })
    }
    else{
      that.setData({
        flag: true
      })
      this.countDown();
    }
    var params = {
      url: '/app/user/sendMsg?phone='+phone,
      method: 'GET',
      data: '',
      sCallBack: function (data) {
        console.log(data)
      },
      eCallBack: function () {
      
      }
    }
    base.request(params);
  },
 
  // 倒计时
  countDown: function () {
    let that = this;
    let time = that.data.time;
    // let countDownNum = ountDownNum;
    that.setData({
    timer: setInterval(function () {
      time--;        
          that.setData({  
            num: time 
           }) 
          if (time <= 0) {    
            clearInterval(that.data.timer);  
            that.setData({
              num:" 重新获取",
              time:60,
              flag:false
            })
          }   
          }, 1000)    
        })  
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

  
  // 登录
  bindGetUserInfo(e) {
    var that = this;
    console.log(e.detail.userInfo)
    that.setData({
      photo: e.detail.userInfo.avatarUrl
    })
    that.login();
  },
  login:function(e){
    var that = this;
    var regx = /^1\d{10}$/;
    var userId = that.data.userId2;
    console.log(userId)
    console.log(that.data.phone)
    if (userId==undefined){
      userId = "";
    }
    var phone = that.data.phone;
    var yzm = that.data.yzm;
    console.log(phone)
    if (phone == "" ||phone == null || phone ==undefined) {
      wx.showToast({
        title: '请输入您的手机号码',
        icon: 'none',
        duration: 2000
      })
      return;
    }
     if (phone.length < 11 || !regx.test(phone) || phone.length > 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      })
       return;
    }
    if (that.data.selected==true){
      wx.request({
        url: url + '/app/user/login',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },

        data: {
          'phone': phone,
          'codeRandom': parseInt(yzm),
          'openId': that.data.openId,
          'userId': userId,
          'photo': that.data.photo
        },
        method: 'POST',
        success: function (res) {
          console.log(res);
          wx.setStorage({
            key: 'userId',
            data: res.data.result.id
          })
          wx.setStorage({
            key: 'sessionId',
            data: res.data.result.sessionId
          })
          wx.setStorage({
            key: 'phone',
            data:phone
          })
          // wx.setStorage({
          //   key: 'integral',
          //   data: res.data.result.integral
          // })
          if (res.data.errorCode == 0) {
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })
            wx.switchTab({
              url: '/pages/index/index'
            })
          } else {
            wx.showToast({
              title: res.data.errorMsg,
              icon: 'none',
              duration: 1000
            })
            return false;
          }
        }
      })
    }else{
      wx.showToast({
        title: "信息填写不完善",
        icon: 'none',
        duration: 1000
      })
    }
  },
  // 选择
  selectList: function () {
    var selected = this.data.selected;
    this.setData({
      selected: !selected
    })
  },
 
})