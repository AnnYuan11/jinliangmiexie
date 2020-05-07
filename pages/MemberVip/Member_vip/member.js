// pages/MemberVip/Member_vip/member.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'yes', value: '是' },
      { name: 'no', value: '否', checked: 'true' }
    ],
    isShow:false,
    index:1,
    problemAnswer:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this;
    app.getOpenId()
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
    var phone = wx.getStorageSync('phone');
    this.setData({
      phone:phone
    })
    this.refresh()
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
  radioChange: function (e) {
    var that=this;
    console.log(e)
    console.log(e.detail.value)
    that.setData({
      value:e.detail.value
    })
  },
  // 下一题
  next(){
    var that=this;
    console.log(that.data.lists.length)
    var obj = new Object();
  
    //为对象添加动态属性
    if(that.data.value==undefined){
      that.data.value='否'
    }
    obj.problem = that.data.lists[0].problem;
    obj.answer = that.data.value;
   that.data.problemAnswer.push(obj)
   console.log(that.data.problemAnswer)  
    if(that.data.lists.length!='1'){
      var newArr = that.data.lists.slice(1);
      var indexNew=++that.data.index
      that.setData({
        lists:newArr,
        index:indexNew
      })
    }else{
      that.addQuestion()
      that.setData({
        isShow:false
      })
    }
   
    
  },
  // 添加问题
  addQuestion(){
    var that = this;
    var userId = wx.getStorageSync('userId');
    var params = {
      url: '/app/user/addUserProblemInfo',
      method: 'POST',
      data: {
        'problemAnswer':JSON.stringify(that.data.problemAnswer),
        'userInfo.id':userId
      },
      sCallBack: function (res) {
        console.log(res)
        
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  // 跳过
  pass(){
    var that=this;
    that.setData({
      isShow:false
    })
  },
  // 问题列表
  question(){
    var that = this;
    var params = {
      url: '/app/user/listProblemInfo',
      method: 'POST',
      data: {
        'pageIndex':1,
        'pageSize':10
      },
      sCallBack: function (res) {
        console.log(res)
        that.setData({
          lists:res.data.result,
          length:res.data.result.length
        })
      
       
      },
      eCallBack: function () {
      }
    }
    base.request(params);
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
                title: '已支付成功！',
                icon: 'none',
                duration: 3000,
                success: function () {
                  setTimeout(function () {
                    that.onLoad()
                    that.onShow()
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
  // 是否提交过问题
  isTip(){
    var that=this;
    var userId = wx.getStorageSync('userId');
    var params = {
      url: '/app/user/findUserProblemInfoExist',
      method: 'POST',
      data: {
        'userInfo.id':userId,
      },
      sCallBack: function (data) {
        console.log(data)
        if(data.data.result=='1'){
          that.setData({
            isShow:false
          })
        }else{
          that.setData({
            isShow:true
          })
        }
      },
      eCallBack: function () {
       
      }
    }
    base.request(params);
  },
  // 去使用
  toUse(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/MemberVip/subscribe/subscribe?nums='+this.data.packageNumber,
    })
  },
  // 成为会员
  // toVip(){
  //   wx.navigateTo({
  //     url: '/pages/MemberVip/Xfrenew/xf',
  //   })
  // },
  // 获取信息
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
        that.setData({
          isVip:res.data.result.isVip,
          packageEndTime:res.data.result.packageEndTime.substring(0,10),
          packageNumber:res.data.result.packageNumber
        })
        that.list()
        that.question()
        that.isTip()//显示问题
      }
      
    

      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
})