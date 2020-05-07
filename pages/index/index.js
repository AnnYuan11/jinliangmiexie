//index.js
//获取应用实例
import { Base } from "../../utils/request/base.js";

var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');

var base = new Base();
var util = require('../../utils/util.js');
var url = 'https://www.jlzn365.com';
// var url = 'https://www.jlzn365.com'
var app = getApp()
var qqmapsdk = new QQMapWX({
  key: 'YQZBZ-C24LS-LTIO2-6HVJV-NCQVK-NPB3T' // 必填
});
Page({
  data: {
    imgUrls: [
    ],
    imgArr: [
    ],
    imgUrl:'',
    inter: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    pinglun:[ ],
    type: 1,
    zixun:false,
    fadeShow:false,//首页浮层显示
    select: false,

  },
 
  onLoad: function () {
    this.locations()
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    this.getOpenId();
    // this.wx_login();
    this.lunbo();
    this.pinglun();
    this.islogin();
    // 效果图
    this.xiaoguo();
    // this.order();
  

  
  },
  onShow: function () {
    this.getOpenId();
    var that = this 
    wx.getSetting({
      success: (res) => {
        console.log(res);
        console.log(res.authSetting['scope.userLocation']);
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
            success: function (res) {
              console.log(res)
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })

              } else if (res.confirm) {
                // debugger
                wx.openSetting({
                  success: function (data) {
                    console.log(data);
                    if (data.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 5000
                      })
                      //再次授权，调用getLocationt的API
                      that.locations();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 5000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {//初始化进入
          that.locations();
        }
      }
    })
    // that.onLoad()
  },
  more:function(){
    wx.navigateTo({
      url:'../details/pllb/pllb'
    })
  },

// 轮播图
  lunbo:function(){
    var that = this;
    var params = {
      url: '/app/findAllBanner',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'GET',
      data: '',
      sCallBack: function (data) {
        console.log(data)
        var array2 = [];
        var obj = data.data.result;
        for (let i in obj) {
          array2.push(obj[i].photo); //属性
        }
        that.setData({
          imgUrls: data.data.result
        })
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  
  // 评论
  pinglun:function(){
    var that = this;
    var params = {
      // url: '/app/order/findAllUserCommentInfoRandom',随机
      url: '/app/order/listUserCommentInfo',
      data: {
        pageIndex:1,
        pageSize:10
      },
      method: 'POST',
      sCallBack: function (data) {
        console.log(data)
        console.log(data)
        var pinglun = data.data.result;
        var imgUrl = that.data.imgUrl;
        for (var i = 0; i < pinglun.length; i++) {
          if (pinglun[i].photo == '') {
            pinglun[i].photo = '[]';
          }
          var img = JSON.parse(pinglun[i].photo);
          pinglun[i].img = img;
          var nickName = pinglun[i].userInfo.nickName.substr(5, 16);
          var nickNames = nickName.replace(nickName.substring(3, 7), "****")
          pinglun[i].userInfo.nickName = nickNames;
          if (pinglun[i].content == "undefined") {
            pinglun[i].content = "无";
          }
          // console.log(pinglun[i].img)
          that.setData({
            pinglun: pinglun,
            imgArr: pinglun[i].img
          })
          wx.hideLoading()
          // console.log(that.data.imgArr)
          var imgUrl = that.data.imgUrl
          var imgArr = that.data.imgArr
          imgArr[i] = (imgUrl + imgArr[i]);

        }
        that.setData({
          imgArr: imgArr
        })
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  // 微信登录
  //获取openID
  getOpenId: function () {
    var that = this;
    wx.login({
      success: function (res) {
        // console.log(res)
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
              that.wx_login();
              // console.log(that.data.openId)
            },
            fail: function (data) {
              console.log(data);
            }
          })
        }
      }
    })
     // console.log(that.data.openId)
  },
  // 微信登录
  wx_login: function () {
    var that = this;
   
    console.log(that.data.openId)
    var params = {
      url: '/app/user/weixinLogin',
      method: 'POST',
      data: {
        'openId': that.data.openId
      },
      sCallBack: function (res) {
        console.log(res)
        wx.removeStorageSync('sessionId');
        wx.setStorage({
          key: 'sessionId',
          data: res.data.result.sessionId
        })
        wx.setStorageSync('userId', res.data.result.id); //将userIdEnc存入本地缓存
        wx.setStorageSync('phone', res.data.result.phone);//将loginDevice存入本地缓存
        // wx.setStorageSync({
        //   key: 'userId',
        //   data: res.data.result.id
        // })
        // wx.setStorageSync({
        //   key: 'phone',
        //   data: res.data.result.phone
        // })
        // if (data.data.errorCode == "0") {
        //   wx.showToast({
        //     title: '删除成功！',
        //     icon: 'none',
        //     duration: 1000,
        //     success: function () {
        //       that.onLoad()
        //     }
        //   })
        // }
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },

  // 后台回复
  huifu: function () {
    var that = this;
    var params = {
      url: '/app/order/listUserCommentInfo',
      data: {
        pageIndex: 1,
        pageSize: 100000
      },
      method: 'POST',
      sCallBack: function (data) {
        console.log(data)
       
        that.setData({
          
        })

      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  dl: function () {
    wx.reLaunch({
      url: '/pages/login/login',
    })
  },
  // 判断是否登录
  islogin: function () {
    var that = this;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    // wx.clearStorageSync()
    console.log(userId)
    console.log(that.data.isshow)
    if (userId == "" || userId == null || userId == undefined) {
      // that.globalData.isshow = true
      that.setData({
        isshow: true
      })
    } else if (userId != "" || userId != null || userId != undefined || that.data.isshow == false) {
      // that.globalData.isshow = false
      that.setData({
        isshow: false
      })
    }
  },
  guan: function () {
    var that = this;
    that.setData({
      isshow: false
    })
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      type: e.detail.value
    })
  },
  
  // 图片预览
  previewImg: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var imgUrl = this.data.imgUrl;
    var lists = e.currentTarget.dataset.list;
    for (var i = 0; i < lists.length; i++) {
      lists[i] = imgUrl + lists[i]
      console.log(lists)
    }
    this.setData({
      lists: lists
    })
    wx.previewImage({
      current: e.currentTarget.dataset.src,//当前图片地址
      urls: e.currentTarget.dataset.list,//所有要预览的图片的地址集合 数组形式
    })
  },

  zx:function(){
    var that = this;
    that.setData({
      zixun:true
    })
  },
  // 客服
  handleContact:function(e){
    var that = this;
    that.setData({
      zixun: false
    })
    console.log(e.path)
    console.log(e.query)
  },
  // 客服电话
  phone: function () {
    var that = this;
    that.setData({
      zixun: false
    })
    wx.makePhoneCall({
      phoneNumber: '029-88222448' //仅为示例，并非真实的电话号码
    })
  },
  close:function(){
    var that = this;
    that.setData({
      zixun: false
    })
  },
  // 效果展示
  xiaoguo:function(){
    var that = this;
    var that = this;
    var params = {
      url: '/app/findAllDesgin',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'GET',
      data: '',
      sCallBack: function (data) {
        console.log(data)
        var array3 = [];
        var obj = data.data.result;
        for (let i in obj) {
          array3.push(obj[i].photo); //属性
        }
        that.setData({
          array3: array3,
          detail:data.data.result
        })
        console.log(that.data.array3)
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  // 关闭遮罩
  clsoe:function(){
    this.setData({
      fadeShow:false
    })
  },
  
 
  // 获取用户地理位置
  locations: function () {
    let vm = this;
    //1、获取当前位置坐标
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res);

        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            console.log(vm.data.city);
           
            wx.setStorage({
              key: 'city',
              data: addressRes.result.ad_info.city,
            })
            wx.setStorage({
              key: 'province',
              data: addressRes.result.ad_info.province
            })
            vm.setData({
              city: addressRes.result.ad_info.city,
              province: addressRes.result.ad_info.province
            })
          },
          fail: function (error) {
            console.error(error);
          },
          complete: function (res) {
            console.log(res);
          }
        })
      }
    })
  },
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  mySelect(e) {
    console.log(e)
    var name = e.currentTarget.dataset.name
    if (name == "韩城市") {
      this.setData({
        city: "渭南市",
        select: false

      })
    }else{
      this.setData({
        city: name,
        select: false
      })
    }
    wx.setStorage({
      key: 'city',
      data: this.data.city,
    })
  },
  // 获取信息
  toVip: function () {
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
      // debugger
      if (res.data.errorCode == '-200') {
        wx.showToast({
          title: res.data.errorMsg,
          icon: 'none',
          duration: 1000,
        })
        setTimeout(function () {
          wx.redirectTo({
            url: '/pages/login/login',
          })
        }, 1500)
      }else{
        wx.navigateTo({
          url: '/pages/MemberVip/Member_vip/member',
        })
      }
      
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },



})
