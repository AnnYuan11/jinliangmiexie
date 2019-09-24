// pages/details/fapiao/fapiao.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var util = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:true,
    list:[],
    listcs:[],
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    var that = this;
    that.list();
    that.list2();
    that.listcs();
    that.list2cs();
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  /**
     * 滑动切换tab
     */
  bindChange: util.throttle(function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });

  }, 500),
  /**
   * 点击tab切换
   */
  swichNav: util.throttle(function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }, 500),
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

  // 列表
  list: function () {
    var that = this;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    that.setData({
      userId: userId,
    });
    var userId = that.data.userId;
    var params = {
      url: '/app/order/listRechargeOrderInfo',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
        'userInfo.id': userId
      },
      method: 'POST',
      sCallBack: function (data) {
        console.log(data)
        for (var i = 0; i < data.data.result.length; i++) {
          that.data.list.push(data.data.result[i]);
          var types = data.data.result[i].orderNumber.substring(0, 2);
          console.log(types)
          if (types == "CZ") {
            that.setData({
              types: "充值"
            })
           
          }
          data.data.result[i].types = that.data.types;
        }
        that.setData({
          list: that.data.list
        })

      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  // 订单发票
  list2:function(){
    var that = this;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    that.setData({
      userId: userId,
    });
    var userId = that.data.userId;
    var params = {
      url: '/app/order/listWashOrderInfoByInvoice',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
        'userInfo.id': userId
      },
      method: 'POST',
      sCallBack: function (data) {
        console.log(data)
        for (var i = 0; i < data.data.result.length;i++){
          that.data.list.push(data.data.result[i]);
          var types = data.data.result[i].orderNumber.substring(0,2);
          if(types=="WS"){
            that.setData({
              types:"订单"
            })
          }
          data.data.result[i].types = that.data.types;
        }
        that.setData({
          list: that.data.list
         
        })
       
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  // 选择
  selectList: function (e) {
    var ids = []; //选中的商品id，购物车id
    var orders = [];
    const index = e.currentTarget.dataset.index;
    let carts = this.data.list;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      list: carts
    });
    var list = this.data.list;
    var length = 0; // 选中商品的个数。 
    for (let i = 0; i < list.length; i++) {
      if (list[i].selected) {
        ids.push(list[i].id)
        orders.push(list[i].orderNumber)
      }
    }
    this.setData({
      ids: ids,
      orders: orders
    });
    console.log(this.data.orders)
  },
  // 开票
  kaipiao: function () {
    var that = this;
    var ids = that.data.orders;
    if (ids == '' || ids == undefined){
      wx.showToast({
        title:'暂无开票数据',
        icon: 'none',
        duration: 1000,
      })
    }else{
      wx.navigateTo({
        url: '../txfpxx/txfpxx?ids=' + ids,
      })
    }
  },
  // 可开票订单超时
  listcs: function () {
    var that = this;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    that.setData({
      userId: userId,
    });
    var userId = that.data.userId;
    var params = {
      url: '/app/order/listRechargeOrderInfoOvertime',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
        'userInfo.id': userId
      },
      method: 'POST',
      sCallBack: function (data) {
        console.log(data)
        for (var i = 0; i < data.data.result.length; i++) {
          that.data.listcs.push(data.data.result[i]);
          var types = data.data.result[i].orderNumber.substring(0, 2);
          console.log(types)
          if (types == "CZ") {
            that.setData({
              types: "充值"
            })

          }
          data.data.result[i].types = that.data.types;
        }
        that.setData({
          listcs: that.data.listcs
        })

      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  // 可开票订单洗鞋订单超时
  list2cs: function () {
    var that = this;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    that.setData({
      userId: userId,
    });
    var userId = that.data.userId;
    var params = {
      url: '/app/order/listWashOrderInfoByInvoiceOvertime',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
        'userInfo.id': userId
      },
      method: 'POST',
      sCallBack: function (data) {
        console.log(data)
        for (var i = 0; i < data.data.result.length; i++) {
          that.data.listcs.push(data.data.result[i]);
          var types = data.data.result[i].orderNumber.substring(0, 2);
          if (types == "WS") {
            that.setData({
              types: "订单"
            })
          }
          data.data.result[i].types = that.data.types;
        }
        that.setData({
          listcs: that.data.listcs

        })

      },
      eCallBack: function () {
      }
    }
    base.request(params);

  },
})