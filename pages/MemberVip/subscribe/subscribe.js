// pages/MemberVip/subscribe/subscribe.js
import {
  Base
} from "../../../utils/request/base.js";
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
  key: 'YQZBZ-C24LS-LTIO2-6HVJV-NCQVK-NPB3T' // 必填
});
var base = new Base();
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.imgUrl,
    num: 1,
    dates: '请选择日期',
    array: [{
        id: 1,
        name: '上午9:00-12:00'
      },
      {
        id: 2,
        name: '下午14:00-17:00'
      },
    ],
    index: 0,
    index2: 0,
    currentDate: '',
    endDate: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    var date = that.getDateStr(null,1)
    var endDate = that.nextData()
    console.log(date)
    console.log(endDate)
    that.data.currentDate = date;
    that.data.endDate = endDate
    that.setData({
      currentDate: date,
      endDate: endDate,
      nums: options.nums
    })
    console.log(that.data.currentDate)
    that.locations();
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

  // 获取日期
  getDateStr: function (today, addDayCount) {
    var date;
    var that = this;
    if (today) {
      date = new Date(today);
    } else {
      date = new Date();
    }
    date.setDate(date.getDate() + addDayCount); //获取AddDayCount天后的日期 
    var y = date.getFullYear();
    var m = date.getMonth() + 1; //获取当前月份的日期 
    var d = date.getDate();
    if (m < 10) {
      m = '0' + m;
    };
    if (d < 10) {
      d = '0' + d;
    };
    var currentDate = y + "-" + m + "-" + d;
    return currentDate
  },
  nextData() {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var date = new Date(timestamp * 1000);

    //获取年份
    var Y = date.getFullYear();
    //获取月份
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //減7天的时间戳：
    var before_timetamp = timestamp + 24 * 60 * 60 * 7;
    //減7天的时间：
    var n_to = before_timetamp * 1000;
    var before_timetamp = new Date(n_to);
    var Y_before = before_timetamp.getFullYear();
    //月份
    var M_before = (before_timetamp.getMonth() + 1 < 10 ? '0' + (before_timetamp.getMonth() + 1) : before_timetamp.getMonth() + 1);

    //日期

    var D_before = before_timetamp.getDate() < 10 ? '0' + before_timetamp.getDate() : before_timetamp.getDate();
    var endDate = Y_before + '-' + M_before + '-' + D_before
    return endDate
  },


  bindDateChange: function (e) {
    console.log(e)
    this.setData({
      dates: e.detail.value
    })
  },
  bindTime(e) {
    var that = this
    var array = that.data.array
    that.setData({
      index: e.detail.value,
      time: array[e.detail.value].id
    })
  },
  jia: function () {
    var num = this.data.num;
    num++;
    if (num > this.data.nums) {
      wx.showToast({
        title: "最多只能选" + this.data.nums + "双",
        icon: 'none',
        duration: 1000
      })
      return;
    }
    this.setData({
      num: num,
    })

  },

  // 减
  jian: function () {
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    this.setData({
      num: num,
    })
  },
  // 门店列表
  // 获取当前经纬度
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
            console.log(addressRes);
            vm.setData({
              // city:addressRes.result.ad_info.city,
              province: addressRes.result.ad_info.province,
              latitude: res.latitude,
              longitude: res.longitude
            })
            vm.list()
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
  // 门店列表
  list: function () {
    var that = this;
    var city = wx.getStorageSync('city')
    var params = {
      url: '/app/user/listEquipmentInfoByDistancePackage',
      method: 'POST',
      data: {
        'myLng': that.data.longitude,
        'myLat': that.data.latitude,
        'province': that.data.province,
        'city': city
      },
      sCallBack: function (data) {
        console.log(data)
        that.setData({
          mdlist: data.data.result,
          equipmentInfoId: data.data.result[0].id
        })
      },
      eCallBack: function () {}
    }
    base.request(params);
  },
  // 选择门店
  bindmd(e) {
    var that = this
    console.log(e)
    var array = this.data.mdlist;
    that.setData({
      index2: e.detail.value,
      equipmentInfoId: array[e.detail.value].id
    })

  },
  bindTextAreaBlur: function (e) {
    this.setData({
      remark: e.detail.value
    })
    console.log(e.detail.value)
  },
  // 提交
  submit: function () {
    var that = this;
    if (that.data.dzid) {
      var userId = wx.getStorageSync('userId'); //wx.getStorageSync(key)，获取本地缓存
      console.log(that.data.equipmentInfoId)
      if (that.data.remark == undefined || that.data.remark == "") {
        that.data.remark = ""
      }
      if (that.data.equipmentInfoId == undefined || that.data.equipmentInfoId == "") {
        that.data.equipmentInfoId = ""
      }
      if (that.data.dates == '请选择日期') {
        wx.showToast({
          title: '请选择日期',
          icon: 'none'
        })
        return;
      }
      if (that.data.time == undefined) {
        that.data.time = "1"
      }
      var params = {
        url: '/app/orderV3/addPackageWashOrderInfoV3',
        method: 'POST',
        data: {
          'userAddressInfo.id': that.data.dzid,
          'userInfo.id': userId,
          'remark': that.data.remark,
          'orderType': 1,
          'appointmentTime': that.data.dates,
          'appointTimeType': that.data.time,
          'shoesNumber': that.data.num,
          'equipmentInfo.id': that.data.equipmentInfoId,
        },
        sCallBack: function (res) {
          console.log(res)
          if (res.data.errorCode == '0') {
            wx.showToast({
              title: '预约成功！',
              icon: 'none',
              duration: 3000,
              success: function () {
                setTimeout(function () {
                  wx.switchTab({
                    url: '/pages/details/dingdan_new/dingdan_new'
                  })
                }, 3000);

              }
            })

          }
        },
        eCallBack: function () {}
      }
      base.request(params);
    } else {
      wx.showToast({
        title: '请选择地址',
        icon: 'none'
      })
    }

  },
})