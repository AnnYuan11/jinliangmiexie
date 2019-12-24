// pages/dingdan/order/order.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var url = 'https://jlmxcs.jlzn365.com'
// var url = 'https://jlmxcs.jlzn365.com'
var util = require('../../../utils/util.js');
var app = getApp()
Page({
  data: {
    num:'201808210325110',
    time:'2018-02-09  15:23',
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    list:[],
    carts: [], 
    showzf:false,
    type: 1,
    isshowye:true,
    isshowyes:true,
    // items: [
    //   { name: '1', value: '余额支付', checked: 'true'},
    //   { name: '2', value: '微信支付',}
    // ]
    // has:false   
  },
  onLoad: function (options) {
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    var that = this;
    console.log(app.globalData.currentTab)
    if (app.globalData.currentTab){
      this.setData({
        currentTab: app.globalData.currentTab
      })
    }else{
      this.setData({
        currentTab: that.data.currentTab
      })
    }
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    // that.Allorder();
    that.dqh();
    that.qxz();
    that.yuyueqian();
    that.yuyueqian2();
    that.daishouhuo();
    that.yisongda();
    that.complete();
    // that.getOpenId();
    that.refresh();
    that.getOpenId();
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    wx.removeStorageSync('ids')
    wx.removeStorageSync('ids2')
    wx.removeStorageSync('orderNumber')
  },
  onShow:function(){
    this.onLoad();
    wx.removeStorageSync('ids')
    wx.removeStorageSync('ids2')
    wx.removeStorageSync('orderNumber')
  },
  onPullDownRefresh() {
    app.globalData.currentTab=""
    this.onLoad();//初始化页面的接口请求
    wx.stopPullDownRefresh();//关闭下拉刷新

  },
  /**
     * 滑动切换tab
     */
  bindChange: util.throttle(function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });

  },500),
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
  },500),


  bindCheckbox: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var selected = this.data.carts[index].selected;
    var carts = this.data.carts;
    var num = parseInt(this.data.carts[index].num);
    var price = this.data.carts[index].price;
    if (!selected) {
      this.setData({
        count: this.data.count + num * price,
        number: num + this.data.number

      });
    } else {
      this.setData({
        count: this.data.count - num * price,
        number: this.data.number - num

      });
    }
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
  },
  // 全部订单
  // Allorder:function(){
  //   var that = this;
  //   // 获取userID
  //   var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
  //   that.setData({
  //     userId: userId
  //   });
  //   var userId = that.data.userId;
  //   var params = {
  //     url: '/app/order/listWashOrderInfo',
  //     method: 'POST',
  //     data: {
  //       'pageIndex':1,
  //       'pageSize':1000000,
  //       'userInfo.id': userId
  //     },
  //     sCallBack: function (data) {
  //       console.log(data)
  //       var list = data.data.result;
  //       // 订单状态
  //       for (var i = 0; i < list.length; i++) {
  //         var orderStatus = list[i].orderStatus;
  //         if (orderStatus=="1"){
  //           orderStatus = "待取货"
  //         }else if (orderStatus == "2"){
  //           orderStatus = "清洗中"
  //         }else if (orderStatus == "3"){
  //           orderStatus = "待配送"
  //         }else if (orderStatus == "4"){
  //           orderStatus = "待收货"
  //         }else if (orderStatus == "5"){
  //           orderStatus = "已送达"
  //         } else if (orderStatus == "6"){
  //           orderStatus = "已完成"
  //         }
  //         else{
  //           orderStatus = "已评价"
  //         }
  //         var takeShoeType = list[i].takeShoeType;
  //         if (takeShoeType=="1"){
  //           takeShoeType = "存入鞋柜"
  //         }else{
  //           takeShoeType = "上门取鞋"
  //         }
  //         var sendShoeType = list[i].sendShoeType;
  //         if (sendShoeType == "1") {
  //           sendShoeType = "存入鞋柜"
  //         } else {
  //           sendShoeType = "上门送鞋"
  //         }
  //         var remark = list[i].remark;
  //         if (remark =="undefined"){
  //           remark = "暂无"
  //         }
  //         list[i].orderStatus = orderStatus;
  //         list[i].takeShoeType = takeShoeType;
  //         list[i].sendShoeType = sendShoeType;
  //         list[i].remark = remark;
  //       }
  //       that.setData({
  //         list:list,
  //       })
  //     },
  //     eCallBack: function () {
  //     }
  //   }
  //   base.request(params);
  // },
  // 待取货
  dqh:function(){
    var that = this;
    // 获取userID
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    that.setData({
      userId: userId
    });
    var userId = that.data.userId;
    var params = {
      url: '/app/order/listWashOrderInfo',
      method: 'POST',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
        'userInfo.id': userId,
        'orderStatus':1
      },
      sCallBack: function (data) {
        console.log(data)
        var list = data.data.result;
        // 订单状态
        for (var i = 0; i < list.length; i++) {
          var orderStatus = list[i].orderStatus;
          if (orderStatus == "1") {
            orderStatus = "待取货"
          }
          var takeShoeType = list[i].takeShoeType;
          if (takeShoeType == "1") {
            takeShoeType = "存入鞋柜"
          } else {
            takeShoeType = "上门取鞋"
          }
          var sendShoeType = list[i].sendShoeType;
          if (sendShoeType == "1") {
            sendShoeType = "存入鞋柜"
          } else {
            sendShoeType = "上门送鞋"
          }
          var remark = list[i].remark;
          if (remark == "undefined" || remark=="") {
            remark = "暂无"
          }
          list[i].orderStatus = orderStatus;
          list[i].takeShoeType = takeShoeType;
          list[i].sendShoeType = sendShoeType;
          list[i].remark = remark;
        }
        that.setData({
          list2: list,
          count1: data.data.result.length
        })
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
// 清洗中
qxz:function(){
  var that = this;
  // 获取userID
  var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
  that.setData({
    userId: userId
  });
  var userId = that.data.userId;
  var params = {
    url: '/app/order/listWashOrderInfo',
    method: 'POST',
    data: {
      'pageIndex': 1,
      'pageSize': 1000000,
      'userInfo.id': userId,
      'orderStatus': 2
    },
    sCallBack: function (data) {
      console.log(data)
      var list = data.data.result;
      var imgArr = [];
      // 订单状态
      for (var i = 0; i < list.length; i++) {
        if (list[i].beforePhoto == "") {

        } else {
          var img = JSON.parse(list[i].beforePhoto);
          list[i].img = img;
        }
       
        // console.log(list[i].beforePhoto)
        var orderStatus = list[i].orderStatus;
        if (orderStatus == "2") {
          orderStatus = "清洗中"
        }
        var takeShoeType = list[i].takeShoeType;
        if (takeShoeType == "1") {
          takeShoeType = "存入鞋柜"
        } else {
          takeShoeType = "上门取鞋"
        }
        var remark = list[i].remark;
        if (remark == "undefined" || remark == "") {
          remark = "暂无"
        }
        list[i].orderStatus = orderStatus;
        list[i].takeShoeType = takeShoeType;
        list[i].remark = remark;
        var imgUrl = that.data.imgUrl
        imgArr[i] = (imgUrl+list[i].beforePhoto);
      }
      
      that.setData({
        list3: list,
        imgArr: imgArr,
        count2: data.data.result.length
      })
      console.log(imgArr)
    },
    eCallBack: function () {
    }
  }
  base.request(params);
},
// 预约前
yuyueqian:function(){
  var that = this;
  // 获取userID
  var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
  that.setData({
    userId: userId
  });
  var userId = that.data.userId;
  var params = {
    url: '/app/order/listWashOrderInfo',
    method: 'POST',
    data: {
      'pageIndex': 1,
      'pageSize': 1000000,
      'userInfo.id': userId,
      'orderStatus': 3,
      'paymentStatus':0
    },
    sCallBack: function (data) {
      console.log(data)
      var list = data.data.result;
      var imgArr2 = [];
      // 订单状态
     if(list.length==0){
       that.setData({
         has:false
       })
     }else{
       that.setData({
         has: true
       })
     }
      for (var i = 0; i < list.length; i++) {
        if (list[i].beforePhoto==""){
          
        }else{
          var img = JSON.parse(list[i].beforePhoto);
          list[i].img = img;
        }
     
        var orderStatus = list[i].orderStatus;
        if (orderStatus == "3") {
          orderStatus = "预约前"
        }
        var takeShoeType = list[i].takeShoeType;
          if (takeShoeType == "1") {
            takeShoeType = "存入鞋柜"
          } else {
            takeShoeType = "上门取鞋"
          }
        var remark = list[i].remark;
        if (remark == "undefined" || remark == "") {
          remark = "暂无"
        }
        list[i].orderStatus = orderStatus;
        list[i].takeShoeType = takeShoeType;
        list[i].remark = remark;
        var imgUrl = that.data.imgUrl
        imgArr2[i] = (imgUrl + list[i].beforePhoto);
      }
      that.setData({
        list4: list,
        imgArr2: imgArr2,
        count3: data.data.result.length
      })
    },
    eCallBack: function () {
    }
  }
  base.request(params);
},
// 已支付待预约
  yuyueqian2: function () {
    var that = this;
    // 获取userID
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    that.setData({
      userId: userId
    });
    var userId = that.data.userId;
    var params = {
      url: '/app/order/listWashOrderInfo',
      method: 'POST',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
        'userInfo.id': userId,
        'orderStatus': 3,
        'paymentStatus': 1
      },
      sCallBack: function (data) {
        console.log(data)
        var list = data.data.result;
        var imgArr6 = [];
        // 订单状态
        if (list.length == 0) {
          that.setData({
            has2: false
          })
        } else {
          that.setData({
            has2: true
          })
        }
        for (var i = 0; i < list.length; i++) {
          if (list[i].beforePhoto == "") {

          } else {
            var img = JSON.parse(list[i].beforePhoto);
            list[i].img = img;
          }

          var orderStatus = list[i].orderStatus;
          if (orderStatus == "3") {
            orderStatus = "预约前"
          }
          var takeShoeType = list[i].takeShoeType;
          if (takeShoeType == "1") {
            takeShoeType = "存入鞋柜"
          } else {
            takeShoeType = "上门取鞋"
          }
          var remark = list[i].remark;
          if (remark == "undefined" || remark == "") {
            remark = "暂无"
          }
          list[i].orderStatus = orderStatus;
          list[i].takeShoeType = takeShoeType;
          list[i].remark = remark;
          var imgUrl = that.data.imgUrl
          imgArr6[i] = (imgUrl + list[i].beforePhoto);
        }
        that.setData({
          list8: list,
          imgArr6: imgArr6,
          count7: data.data.result.length
        })
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
// 待收货
daishouhuo:function(){
  var that = this;
  // 获取userID
  var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
  that.setData({
    userId: userId
  });
  var userId = that.data.userId;
  var params = {
    url: '/app/order/listWashOrderInfo',
    method: 'POST',
    data: {
      'pageIndex': 1,
      'pageSize': 1000000,
      'userInfo.id': userId,
      'orderStatus': 4
    },
    sCallBack: function (data) {
      console.log(data)
      var list = data.data.result;
     
      var imgArr3 = [];
      // 订单状态
      for (var i = 0; i < list.length; i++) {
        if (list[i].beforePhoto == "") {

        } else {
          var img = JSON.parse(list[i].beforePhoto);
          list[i].img = img;
        }
        var orderStatus = list[i].orderStatus;
        if (orderStatus == "4") {
          orderStatus = "待收货"
        }
        var sendShoeType = list[i].sendShoeType;
        if (sendShoeType == "1") {
          sendShoeType = "存入鞋柜"
        } else {
          sendShoeType = "上门送鞋"
        }
        var remark1 = list[i].remark1;
        if (remark1 == "undefined" || remark1 == "") {
          remark1 = "暂无"
        }
        list[i].orderStatus = orderStatus;
        list[i].sendShoeType = sendShoeType;
        list[i].remark1 = remark1;
        var imgUrl = that.data.imgUrl
        imgArr3[i] = (imgUrl + list[i].beforePhoto);
      }
      that.setData({
        list5: list,
        imgArr3: imgArr3,
        count4: data.data.result.length
      })
    },
    eCallBack: function () {
    }
  }
  base.request(params);
},
// 确认收货
 sureGoods:function(e){
   var that = this;
   console.log(e)
   var id = e.currentTarget.dataset.id;
   var params = {
     url: '/app/order/updateWashOrderInfoStatus',
     method: 'POST',
     data: {
       'id': id,
       'orderStatus': 6,
     },
     sCallBack: function (data) {
       console.log(data)
       if (data.data.errorCode==0){
         that.onLoad();
         wx.navigateTo({
           url: '../../details/pingjia/pingjia?id=' + id,
         })
       }else{
         wx.showToast({
           title: data.data.errorMsg,
          icon: 'none',
          duration: 3000
     });
      }
     },
     eCallBack: function () {
     }
   }
   base.request(params);








 },
//  去评价
  // pingjia:function(e){
  //   var that = this;
  //   console.log(e)
  //   var id = e.currentTarget.dataset.id;
  //   wx.navigateTo({
  //     url: '../../details/pingjia/pingjia?id='+id,        
  //   })
  // },
  // 已送达
yisongda: function () {
    var that = this;
    // 获取userID
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    that.setData({
      userId: userId
    });
    var userId = that.data.userId;
    var params = {
      url: '/app/order/listWashOrderInfo',
      method: 'POST',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
        'userInfo.id': userId,
        'orderStatus': 5
      },
      sCallBack: function (data) {
        console.log(data)
        var list = data.data.result;
        var imgArr4 = [];
        // 订单状态
        for (var i = 0; i < list.length; i++) {
          if (list[i].beforePhoto == "") {
          } else {
            var img = JSON.parse(list[i].beforePhoto);
            list[i].img = img;
          }
          var orderStatus = list[i].orderStatus;
          if (orderStatus == "5") {
            orderStatus = "已送达"
          }
          var sendShoeType = list[i].sendShoeType;
          if (sendShoeType == "1") {
            sendShoeType = "存入鞋柜"
          } else {
            sendShoeType = "上门送鞋"
          }
          var remark1 = list[i].remark1;
          if (remark1 == "undefined" || remark1 == "") {
            remark1 = "暂无"
          }
          list[i].orderStatus = orderStatus;
          list[i].sendShoeType = sendShoeType;
          list[i].remark1 = remark1;
          var imgUrl = that.data.imgUrl
          imgArr4[i] = (imgUrl + list[i].beforePhoto);
        }
        that.setData({
          list7: list,
          imgArr4: imgArr4,
          count5: data.data.result.length
        })
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
// 已完成
complete:function(){
  var that = this;
  // 获取userID
  var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
  that.setData({
    userId: userId
  });
  var userId = that.data.userId;
  var params = {
    url: '/app/order/listWashOrderInfo',
    method: 'POST',
    data: {
      'pageIndex': 1,
      'pageSize': 1000000,
      'userInfo.id': userId,
      'orderStatus': 6
    },
    sCallBack: function (data) {
      console.log(data)
      var list = data.data.result;
      var imgArr5 = [];
      // 订单状态
      for (var i = 0; i < list.length; i++) {
        if (list[i].beforePhoto == "") {

        } else {
          var img = JSON.parse(list[i].beforePhoto);
          list[i].img = img;
        }
        // console.log(list[i].beforePhoto)
        
       var orderStatus = list[i].orderStatus;
       
        if (orderStatus == "6") {
          orderStatus = "已完成"
        }
        if (orderStatus == "7") {
          orderStatus = "已评价"
        }
        var takeShoeType = list[i].takeShoeType;
        if (takeShoeType == "1") {
          takeShoeType = "存入鞋柜"
        } else {
          takeShoeType = "上门取鞋"
        }
        var sendShoeType = list[i].sendShoeType;
        if (sendShoeType == "1") {
          sendShoeType = "存入鞋柜"
        } else {
          sendShoeType = "上门送鞋"
        }
        var remark1 = list[i].remark1;
        if (remark1 == "undefined" || remark1 == "") {
          remark1 = "暂无"
        }
        list[i].remark1 = remark1;
        list[i].orderStatus = orderStatus;
        list[i].sendShoeType = sendShoeType;
        list[i].takeShoeType = takeShoeType;
        var imgUrl = that.data.imgUrl
        imgArr5[i] = (imgUrl + list[i].beforePhoto);
      
      }
      that.setData({
        list6: list,
        imgArr5: imgArr5,
        count6: data.data.result.length
      })
    },
    eCallBack: function () {
    }
  }
  base.request(params);
},
// 配送选择
selectList:function(e) {
    var ids = []; //选中的商品id，购物车id
  var orderNumber = []; //选中的商品id，购物车id
    const index = e.currentTarget.dataset.index;
    let carts = this.data.list4;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      list4: carts
    });
    var list4 = this.data.list4;
    console.log(list4)
    var length = 0; // 选中商品的个数。 
    for (let i = 0; i < list4.length; i++) {
      if (list4[i].selected) {
        ids.push(list4[i].id);
        orderNumber.push(list4[i].orderNumber)
      }
    }
    this.setData({
      ids: ids,
    });
    // wx.setStorage({
    //   key: 'ids',
    //   data: ids
    // })
    // wx.setStorage({
    //   key: 'orderNumber',
    //   data: orderNumber
    // })
    console.log(this.data.ids)
  },
selectList2: function (e) {
    var ids2 = []; //选中的商品id，购物车id
    var orderNumber = []; //选中的商品id，购物车id
    const index = e.currentTarget.dataset.index;
    let carts = this.data.list8;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      list8: carts
    });
    var list8 = this.data.list8;
    console.log(list8)
    var length = 0; // 选中商品的个数。 
    for (let i = 0; i < list8.length; i++) {
      if (list8[i].selected) {
        ids2.push(list8[i].id);
        orderNumber.push(list8[i].orderNumber)
      }
    }
    // this.setData({
    //   ids: ids,
    // });
    
    wx.setStorage({
      key: 'ids2',
      data: ids2
    })
    wx.setStorage({
      key: 'orderNumber',
      data: orderNumber
    })

  var ids = wx.getStorageSync('ids2');//wx.getStorageSync(key)，获取本地缓存
  console.log(ids2)
  },

// 支付
  zhifu:function(){
    var that = this;
    var ids = that.data.ids;
    console.log(ids)
    if (ids == "" || ids == undefined) {
      wx.showToast({
        title: '请选择订单',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    // if (ids.length > 3) {
    //   wx.showToast({
    //     title: '最多只能预约3个订单',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // }

    else{
      that.zftd();
      that.setData({
        showzf: true,
        list4:[],
        has: false
      })

      that.ddje();
    }
  },
  // 支付通道
  zftd:function(){
    var that = this;
    var items = that.data.items;
    // console.log(items)
    var params = {
      url: '/app/order/findPaymentType',
      method: 'GET',
      data: {

      },
      sCallBack: function (data) {
        console.log(data)
        if (data.data.result.paymentType==1){
          that.setData({
            isshowye:true,
            isshowyes: true
          })
        } else if (data.data.result.paymentType == 2){
          that.setData({
            isshowye: false,
            isshowyes: true
          })
        } else if (data.data.result.paymentType == 3) {
          that.setData({
            isshowye: true,
            isshowyes: false
          })
        }else{
          that.setData({
            isshowye: false,
            isshowyes: false
          })
        }
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },

// 已支付待预约
  yyps:function(){
    var that = this;
    var ids = wx.getStorageSync('ids2');//wx.getStorageSync(key)，获取本地缓存
    console.log(ids)
    if(ids==""||ids==undefined){
      wx.showToast({
        title: '请选择订单',
        icon: 'none',
        duration: 2000
      })
      return;
    }
      // if(ids.length>3){
      //   wx.showToast({
      //     title: '最多只能预约3个订单',
      //     icon: 'none',
      //     duration: 2000
      //   })
      // }
      else{
        wx.navigateTo({
          url: '../../details/yyps/yyps?ids=' + ids,
          // url: '/pages/details/yyps/yyps',
        })
      }
     
    
  },

  // 清洗中图片预览
  previewImg: function (e) {
    console.log(e)
    var that = this;
    var imgUrl = that.data.imgUrl;
    var lists = e.currentTarget.dataset.list;
    for (var i = 0; i < lists.length; i++) {
      lists[i] = imgUrl + lists[i]
      console.log(lists)
    }
    wx.previewImage({
      current:e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: lists // 需要预览的图片http链接列表
    })
  },
  previewImg2: function (e) {
    var that = this;
    var imgUrl = that.data.imgUrl;
    var lists = e.currentTarget.dataset.list;
    for (var i = 0; i < lists.length; i++) {
      lists[i] = imgUrl + lists[i]
      console.log(lists)
    }
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: lists // 需要预览的图片http链接列表
    })
  },
  previewImg3: function (e) {
    var that = this;
    var imgUrl = that.data.imgUrl;
    var lists = e.currentTarget.dataset.list;
    for (var i = 0; i < lists.length; i++) {
      lists[i] = imgUrl + lists[i]
      console.log(lists)
    }
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: lists // 需要预览的图片http链接列表
    })
  },
  previewImg4: function (e) {
    var that = this;
    var imgUrl = that.data.imgUrl;
    var lists = e.currentTarget.dataset.list;
    for (var i = 0; i < lists.length; i++) {
      lists[i] = imgUrl + lists[i]
      console.log(lists)
    }
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: lists // 需要预览的图片http链接列表
    })
  },
  previewImg5: function (e) {
    var that = this;
    var imgUrl = that.data.imgUrl;
    var lists = e.currentTarget.dataset.list;
    for (var i = 0; i < lists.length; i++) {
      lists[i] = imgUrl + lists[i]
      console.log(lists)
    }
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: lists // 需要预览的图片http链接列表
    })
  },
  previewImg6: function (e) {
    var that = this;
    var imgUrl = that.data.imgUrl;
    var lists = e.currentTarget.dataset.list;
    for (var i = 0; i < lists.length; i++) {
      lists[i] = imgUrl + lists[i]
      console.log(lists)
    }
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: lists // 需要预览的图片http链接列表
    })
  },
  // 支付方式选择
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      type: e.detail.value
    })
  },
  surePay: function () {
    var that = this;
    var type = that.data.type;
    console.log(type);
    if (type == "1") {
      that.zhkk();
    } else {
      that.zxzf();
    }
  },
  // 账户扣款
  zhkk: function () {
    var that = this;
    var ids = that.data.ids;
    that.setData({
      showzf: false,
    })
    console.log(ids)
    var params = {
      url: '/app/order/updateWashOrderInfoStatusPay',
      method: 'POST',
      data: {
        'ids': ids,
      },
      sCallBack: function (data) {
        console.log(data)
        that.setData({
          showzf: false,
        })
        if (data.data.errorCode == "0") {
          // that.success();
          wx.showToast({
            title: '已支付成功，请耐心等待您的美鞋！',
            icon: 'none',
            duration: 3000,
            success: function () {
              setTimeout(function () {
                that.onLoad();
                wx.removeStorageSync('ids')
              }, 3000);

            }
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: data.data.errorMsg,
          })
        }
      },
      eCallBack: function () {
      }
    }
    base.request(params);

  },
  // 在线支付
  zxzf: function () {
    var that = this;
    var ids = wx.getStorageSync('ids')//wx.getStorageSync(key)，获取本地缓存
    var payOrderNumber = that.data.payOrderNumber;
    console.log(payOrderNumber)
    var params = {
      url: '/payment/getOrderStr',
      method: 'POST',
      data: {
        'openId': that.data.openId,
        'type': 2,
        'orderNumber': payOrderNumber,
        'price': that.data.jg
        // 'price': 0.01
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
              that.setData({
                showzf: false,
              })
              wx.showToast({
                title: '已支付成功，请耐心等待您的美鞋！',
                icon: 'none',
                duration: 3000,
                success: function () {
                  setTimeout(function () {
                   that.onLoad();
                    wx.removeStorageSync('ids')
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
  guan: function () {
    var that = this;
    console.log(that.data.list4)
    var showzf = this.data.showzf;
    app.globalData.currentTab = '2'
    this.setData({
      showzf: false,
     
    })
    that.yuyueqian();
  },
  // 获取账户余额
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
        that.setData({
          money: res.data.result.money
        })
        // console.log(that.data.money)
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  // 获取订单金额
  ddje: function () {
    var that = this;
    var ids = that.data.ids;
    // var aa = '22'
    console.log(ids)
    // that.setData({
    //   showzf: true,
    //   showbz: false
    // })
    var params = {
      url: '/app/order/getWashOrderInfoStatusPayMoney',
      method: 'POST',
      data: {
        'ids': ids,
      },
      sCallBack: function (data) {
        console.log(data)
        console.log(data.data.result.payMoneyTotal.toString().length);
        if (data.data.result.payMoneyTotal.toString().length>5){
          that.setData({
            jg: data.data.result.payMoneyTotal.toString().substr(0,5),
            payOrderNumber: data.data.result.payOrderNumber
          })
        }else{
          that.setData({
            jg: data.data.result.payMoneyTotal,
            payOrderNumber: data.data.result.payOrderNumber
          })
        }
        
        console.log(data)
      },
      eCallBack: function () {
      }
    }
    base.request(params);
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
  }
})
