// pages/details/yyps/yyps.js
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
    dates: '请选择日期',
    time: '请选择时间(可预约时间为一小时后)',
    array: ['存入鞋柜', '上门送鞋','请选择您的配送方式'],
    index: 2,
    showzf: false,
    showbz:true,
    remark1:'',
    type:1,
    // sendShoeType:2
    items: [
      { name: '1', value: '余额支付'  ,checked: 'true' },
      { name: '2', value: '微信支付'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    console.log(options)
    this.getOpenId();
    var date = this.date(new Date())
    console.log(date)
    var Time = this.time(new Date())
    console.log(Time)
    console.log(typeof(Time))
    if(options.time){
      this.setData({
        time: options.time
      })
    }
    else{
      this.setData({
        time: this.data.time
      })
    }
    this.setData({
      // currentDate: date,
      // currentTime: Time,
      // dates: date,
      // time: Time
    })
    var ids = wx.getStorageSync('ids');//wx.getStorageSync(key)，获取本地缓存
    if (options.sendShoeType) {
      this.setData({
        sendShoeType: options.sendShoeType
      })
    }
    if (options.index) {
      this.setData({
        index: options.index
      })
    }
    if (options.dates) {
      this.setData({
        dates: options.dates
      })
    }else{
      this.setData({
        dates: date
      })
    }
    if (options.remark1){
      this.setData({
        remark1: options.remark1
      })
    }
    this.setData({
      ids:ids,
      zdid: options.zdid,
      // sendShoeType: options.sendShoeType,
      // dates: options.dates,
      // remark1: options.remark1,
      sendAddress :options.sendAddress,
      address: options.address,
      currentDate: date,
      currentTime: Time,
    })
    // console.log(this.data.sendShoeType)
    
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
    // this.refresh();
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      sendShoeType: parseInt(e.detail.value) + parseInt(1)
    })
    console.log(this.data.sendShoeType)
  },
  // bindDateChange: function (e) {
  //   this.setData({
  //     date: e.detail.value
  //   })
  // },
  // 获取备注信息
  beizhu: function (e) {
    this.setData({
      remark1: e.detail.value
    })
  },
  // 获取配送地址
  tzdz:function(e){
    var that = this;
    console.log(that.data.sendShoeType)
    var sendShoeType = that.data.sendShoeType;
    var index = that.data.index;
    var remark1 = that.data.remark1;

    console.log(remark1)
    wx.navigateTo({
      url: '/pages/details/selectdz2/selectdz2?sendShoeType=' + sendShoeType + '&index=' + index + '&remark1=' + remark1,
    })
   
  },

  sub:function(e){
    // wx.showLoading({
    //   title: '预约中',
    //   mask: true
    // })
    var that = this;
    var ids = wx.getStorageSync('ids2');//wx.getStorageSync(key)，获取本地缓存
    var sendShoeType = that.data.sendShoeType;
    var sendAddress = that.data.sendAddress;
    var remark1 = that.data.remark1;
    var equipmentInfo = that.data.zdid;
    if (sendShoeType==1&&ids.length>3){
      wx.showToast({
        title: "存入鞋柜数量不能超过3双",
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (remark1 == undefined || remark1==""){
      remark1="";
    }
    if (sendAddress == "" || sendAddress == undefined) {
      sendAddress = ""
    }
    if (equipmentInfo == "" || equipmentInfo == undefined) {
      equipmentInfo = ""
    }

    if (sendShoeType == 3 || sendShoeType == undefined) {
      wx.showToast({
        title: "请选择您的配送方式",
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (sendShoeType==2){
      if (sendAddress == "" || sendAddress == undefined){
        wx.showToast({
          title: "请选择地址",
          icon: 'none',
          duration: 1000
        })
        return;
      }
    }else{
      if (equipmentInfo == "" || equipmentInfo==undefined){
        wx.showToast({
          title: "请选择鞋柜",
          icon: 'none',
          duration: 1000
        })
        return;
      } 
      // else if (ids.length>3){
      //   wx.showToast({
      //     title: "存入鞋柜数量不能超过3双",
      //     icon: 'none',
      //     duration: 1000
      //   })
      //   // setTimeout(function(){
      //   //   wx.switchTab({
      //   //     url: '../../dingdan/order/order?currentTab=4'
      //   //   })
      //   // }, 2000) 
      //   return;
      // }
    }
   
    that.success();
  },
  success:function(){
    var that = this;
    wx.showLoading({
      title: '预约中',
      mask: true
    })
    var ids = wx.getStorageSync('ids2');//wx.getStorageSync(key)，获取本地缓存
    console.log(ids)
    // var ids = that.data.ids;
    var sendShoeType = that.data.sendShoeType;
    var sendAddress = that.data.sendAddress;
    var remark1 = that.data.remark1;
    var time = that.data.time;
    var sendTime = that.data.dates + " " + that.data.time + ':00';
    var equipmentInfo = that.data.zdid;
    console.log(equipmentInfo)
    if (equipmentInfo == "" || equipmentInfo==undefined){
      that.setData({
        equipmentInfo:''
      })
    }else {
      that.setData({
        equipmentInfo: equipmentInfo
      })
    }
    var params = {
      url: '/app/order/updateWashOrderInfoStatusFour',
      method: 'POST',
      data: {
        'ids': ids,
        'orderStatus': 4,
        'sendShoeType': sendShoeType,
        'sendAddress': sendAddress,
        'remark1': remark1,
        // 'sendTime': sendTime,
        'equipmentInfo.id': that.data.equipmentInfo
      },
      sCallBack: function (data) {
        console.log(data)
        wx.hideLoading()
        if (data.data.errorCode == '0') {
          wx.showToast({
            title: "预约成功",
            icon: 'success',
            duration: 1000,
            success: function () {
              setTimeout(function () {
                 wx.switchTab({
                  url: '../../dingdan/order/order?currentTab=4'
                })
                    
                wx.removeStorageSync('ids')
              }, 2000) //延迟时间
            }
          })
        } else {
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
  },
  // 选择时间
  bindDateChange: function (e) {
    console.log(e.detail.value);
    console.log(this.data.currentDate)
    var changed = e.detail.value;
    console.log(changed)
    this.setData({
      dates: e.detail.value
    })

    if (changed != this.data.currentDate) {
      this.setData({
        time: '09:00',
      })
      
    } else {
      this.setData({
        time: this.time(new Date())
      })
     
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
  bindTimeChange: function (e) {
    console.log(this.data.currentTime);
    // console.log(this.data.currentDate)
    // console.log(this.data.dates)
    console.log(e.detail.value)
    var aa = e.detail.value.substring(0, 2)
    console.log(this.data.currentTime)
    if (aa < '09') {
      wx.showToast({
        title: "不在配送时间内",
        icon: 'none',
        duration: 1000,
      })
    }
    else if (this.data.dates == this.data.currentDate && this.data.currentTime > e.detail.value) {
      wx.showToast({
        title: "不在配送时间内",
        icon: 'none',
        duration: 1000,
      })
      this.setData({
        time: "请选择时间(可预约时间为一小时后)"
      })
    }
    else {
      this.setData({
        time: e.detail.value
      })
    }
  },
  date: function (time) {
    var nowDate = new Date(time);
    var nowYear = nowDate.getFullYear(),
      nowMonth = nowDate.getMonth() + 1,
      nowDated = nowDate.getDate();
    nowMonth >= 10 ? nowMonth = nowMonth : nowMonth = '0' + nowMonth;
    nowDated >= 10 ? nowDated = nowDated : nowDated = '0' + nowDated;
    var currentDate = nowYear + "-" + nowMonth + "-" + nowDated;
    return currentDate
  },
  time: function (time) {
    var nowDate = new Date(time);
    var nowHours = nowDate.getHours() + 1,
      nowMin = nowDate.getMinutes(),
      nowSec = nowDate.getSeconds();
    nowHours >= 10 ? nowHours = nowHours : nowHours = '0' + nowHours;
    nowMin >= 10 ? nowMin = nowMin : nowMin = '0' + nowMin;
    nowSec >= 10 ? nowSec = nowSec : nowSec = '0' + nowSec;
    var currentTime = nowHours + ":" + nowMin
    return currentTime;
  },

})