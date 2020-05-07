// pages/MemberVip/login_vip/loginVip.js
import {
  Base
} from "../../../utils/request/base.js";
var base = new Base();
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: '获取验证码',
    time: 60,
    flag: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.list()//套餐列表
    app.getOpenId()
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
  // 获取手机号
  bindinput: function (e) {
    console.log(e)
    this.setData({
      phone: e.detail.value
    })
  },
  // 验证手机号
  phoneYz() {
    var that = this;
    if (that.data.flag == true) {
      var regx = /^1(3|4|5|7|8|9)\d{9}$/;
      var phone = that.data.phone;
      console.log(phone)
      if (phone == "" || phone == null || phone == undefined) {
        wx.showToast({
          title: '请输入您的手机号码',
          icon: 'none',
          duration: 2000
        })
      } else if (phone.length < 11 || !regx.test(phone) || phone.length > 11) {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none',
          duration: 2000
        })
      } else {
        // that.getYzm()
        var params = {
          url: '/app/user/findByPhone',
          method: 'GET',
          data: {
            'phone': that.data.phone
          },
          sCallBack: function (data) {
            console.log(data)
            if (data.data.errorCode == '-1') {
              wx.showToast({
                title: '已是会员',
                icon: 'none',
                duration: 3000,
                success: function () {
                  setTimeout(function () {
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                  }, 3000);

                },
            
              })
              
            } else if(data.data.errorCode == '0'){
              that.getYzm()
            }
          },
          eCallBack: function () {}
        }
        base.request(params);
      }
    }
  },
  // 获取验证码
  getYzm() {
    var that = this;
    that.setData({
      flag:false
    })
    var phone = that.data.phone
    that.countDown()

    var params = {
      url: '/app/user/sendMsg?phone=' + phone,
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
    that.setData({
      timer: setInterval(function () {
        time--;
        that.setData({
          num: time
        })
        if (time <= 0) {
          clearInterval(that.data.timer);
          that.setData({
            num: " 重新获取",
            time: 60,
            flag: true
          })
        }
      }, 1000)
    })
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
        'pageSize':10000,
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
  // 选择套餐
  Recharges(e){
    var that = this;
    console.log(e)
    that.setData({
      id:e.currentTarget.dataset.id
    })
  },
  // 立即购买
  fpcxtj(e){
    var that = this;
    console.log(that.data.id)
    if(e.detail.value.phone==''){
      wx.showToast({
        title: '请输入您的手机号',
        icon:'none'
      })
      return
    }
    if(e.detail.value.yzm==''){
      wx.showToast({
        title: '请输入验证码',
        icon:'none'
      })
      return
    }
    if(that.data.id==''||that.data.id==undefined){
      wx.showToast({
        title: '请选择套餐',
        icon:'none'
      })
      return
    }
    console.log(e)
    var userId = that.data.userId2;
    var params = {
      url: '/app/orderV31/addUserWashPackageOrderInfoYq',
      method: 'POST',
      data: {
        'washPackageInfo.id': that.data.id,//套餐id
        'phone': e.detail.value.phone,
        'codeRandom': e.detail.value.yzm,
        // 'referrerUserInfo.id':'2c9a91e4674deace01674f46998e0042',
        'referrerUserInfo.id':userId,
      },
      sCallBack: function (data) {
        console.log(data)
        if(data.data.errorCode==0){
          that.setData({
            orderNumber:data.data.result.orderNumber,
            paymentMoney:data.data.result.paymentMoney,
          })
          that.pay()
        }else{
          wx.showToast({
            title: data.data.errorMsg,
            icon:'none',
            duration: 3000,
            success: function () {
              setTimeout(function () {
               wx.switchTab({
                 url: '/pages/index/index',
               })
              }, 3000);

            },
            
          })
        }
      },
      eCallBack: function () {

      }
    }
    base.request(params);
  },
  // 支付
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
                title: '恭喜您成功尊享爱鞋会员',
                icon: 'none',
                duration: 3000,
                success: function () {
                  setTimeout(function () {
                   wx.switchTab({
                     url: '/pages/index/index',
                   })
                  }, 3000);

                },
                
              })
            },
            fail: function (e) {
              console.log('报错')
              wx.showToast({
                title:'支付失败',
                icon: 'none',
                duration: 3000,
                success: function () {
                  setTimeout(function () {
                   wx.switchTap({
                     url: '/pages/index/index',
                   })
                  }, 3000);

                },
                
              })
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
})