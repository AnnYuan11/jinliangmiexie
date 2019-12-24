// pages/details/dingdan_details/dingdan_details.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var util = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(options)
    this.setData({
      id:options.id,
      imgUrl: app.globalData.imgUrl,
      lx: options.lx
    })
    this.list();
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
  list: function () {
    var that = this;
    // 获取userID
    var params = {
      url: '/app/orderV3/findWashOrderInfoV3ByApp',
      method: 'POST',
      data: {
        'id': that.data.id,
    
      },
      sCallBack: function (data) {
        console.log(data)
        var list = data.data.result;
        var orderType = list.orderType;
        var authStatus = list.authStatus;
        var paymentStatus = list.paymentStatus;
        var orderStatusTotal = list.orderStatusTotal;
          var orderType = list.orderType;
          if (orderType == "1") {
            orderType = "洗鞋订单"
          } else if (orderType == "2") {
            if (orderStatusTotal == 1 && authStatus == 1 && paymentStatus == 0) {
              orderStatusTotal = "未支付"
            } else if (orderStatusTotal == 1 && authStatus == 1 && paymentStatus == 1) {
              orderStatusTotal = "已支付"
            } else if (orderStatusTotal == 1 && authStatus == 0 && paymentStatus == 0) {
              orderStatusTotal = "待审核"
            }
            orderType = "修鞋订单"
          } else if (orderType == "3") {
            orderType = "增补订单"
          }
          var takeShoeType = list.takeShoeType;
          if (takeShoeType == "1") {
            takeShoeType = "存入鞋柜"
          } else {
            takeShoeType = "上门取鞋"
          }
          // var orderStatusTotal = list.orderStatusTotal;
        if (orderStatusTotal == "1") {
          orderStatusTotal = "待取货"
        } else if (orderStatusTotal == "2") {
          orderStatusTotal = "已取货"
        } else if (orderStatusTotal == "3") {
          orderStatusTotal = "清洗中"
        } else if (orderStatusTotal == "4") {
          orderStatusTotal = "配送中"
        } else if (orderStatusTotal == "5") {
          orderStatusTotal = "已送达"
        }
        else if (orderStatusTotal == "6") {
          orderStatusTotal = "已完成"
        } else if (orderStatusTotal == "7") {
          orderStatusTotal = "已评价"
        } else if (orderStatusTotal == "0") {
          orderStatusTotal = "已失效"
        }
        
          list.takeShoeType = takeShoeType;
          list.orderStatusTotal = orderStatusTotal;
          list.orderType = orderType;
          for (var i = 0; i < list.subjectList.length; i++) {
            if (list.subjectList[i].beforePhotoList!=''){
              var img = JSON.parse(list.subjectList[i].beforePhotoList);
              list.subjectList[i].beforePhotoList = img;
         
            }
            if (list.subjectList[i].afterPhotoList != '') {
           
              var imgs = JSON.parse(list.subjectList[i].afterPhotoList);
            
              list.subjectList[i].afterPhotoList = imgs;
            }
          }
          
      
        that.setData({
          list: list,
          list2: list.subjectList
        })
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  // 预览照片
  previewImg: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var imgUrl = this.data.imgUrl;
    var lists = e.currentTarget.dataset.list;
    for (var i = 0; i < lists.length; i++) {
      lists[i] = imgUrl +'/'+ lists[i]
      console.log(lists)
    }
    this.setData({
      lists: lists
    })
    wx.previewImage({
      current: e.currentTarget.dataset.src,//当前图片地址
      urls: e.currentTarget.dataset.list,//所有要预览的图片的地址集合 数组形式
    })
  }
})