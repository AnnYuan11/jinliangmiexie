// pages/details/txfpxx/txfpxx.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    console.log(options)
    var ids = options.ids;
    console.log(ids)
    var ids2 = ids.split(",");
    this.setData({
      ids2: ids2
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
  // 开票
  kaipiao:function(e){
    var that = this;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
      that.setData({
        userId: userId,
      });
    var userId = that.data.userId;
    var ids = that.data.ids2;
    if (e.detail.value.taxName == '' || e.detail.value.taxName==undefined){
      wx.showToast({
        title: '请填写您的名称',
        icon: 'none',
        duration: 1000,
      })
      return;
    }
    if (e.detail.value.taxNumber == '' || e.detail.value.taxNumber == undefined){
      wx.showToast({
        title: '请填写您的税号',
        icon: 'none',
        duration: 1000,
      })
      return;
    }
    if (e.detail.value.openBank == '' ||  e.detail.value.openBank == undefined) {
      wx.showToast({
        title: '请填写您的开户行',
        icon: 'none',
        duration: 1000,
      })
      return;
    }
    if (e.detail.value.bankNumber == '' || e.detail.value.bankNumber == undefined) {
      wx.showToast({
        title: '请填写您的银行账号',
        icon: 'none',
        duration: 1000,
      })
      return;
    }
    if (e.detail.value.bankAddress == '' || e.detail.value.bankAddress == undefined) {
      wx.showToast({
        title: '请填写您的地址与电话',
        icon: 'none',
        duration: 1000,
      })
      return;
    }
    if ( e.detail.value.address == '' ||  e.detail.value.address == undefined) {
      wx.showToast({
        title: '请填写您的收票地址',
        icon: 'none',
        duration: 1000,
      })
      return;
    }
    var params = {
      url: '/app/order/addInvoiceInfo',
      data: {
        'userInfo.id': userId,
        'taxName': e.detail.value.taxName,
        'taxNumber': e.detail.value.taxNumber,
        'openBank': e.detail.value.openBank,
        'bankNumber': e.detail.value.bankNumber,
        'bankAddress': e.detail.value.bankAddress,
        'address': e.detail.value.address,
        'ids': ids
      },
      method: 'POST',
      sCallBack: function (data) {
      console.log(data)
        if (data.data.errorCode==0){
           wx.showToast({
            title: '添加成功！',
            icon: 'none',
            duration: 1000,
            success: function () {
              wx.switchTab({
                url: '../../wode/my/my'
              })
            }
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
  }
})