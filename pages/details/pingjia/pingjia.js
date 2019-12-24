// pages/details/pingjia/pingjia.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
// var url = 'https://jlmxcs.jlzn365.com'
var url = 'https://jlmxcs.jlzn365.com'
var util = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgArr: [],
    arr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(options)
    var imgUrl = app.globalData.imgUrl;
    this.setData({
      orderId:options.id,
      imgUrl: imgUrl
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
  addImg: function () {
    var that = this;
    // var arr = [];
   
    // if (this.data.imgArr.length < 6) {
      wx.chooseImage({
        count:'1',
        success: function (res) {
          console.log(res)
          var tempFilePaths = res.tempFilePaths
          console.log(tempFilePaths);
          for (var i = 0; i < tempFilePaths.length; i++) {
            var filePath = tempFilePaths[i];
            // console.log(filePath)
            wx.uploadFile({
              url: url + '/fileUpload',
              filePath: filePath,
              name: 'file',
              formData: {},
              success: function (res) {
                console.log(res);
                var data = res.data
                var datas = JSON.parse(data)
                that.data.arr.push(datas.result.path[0])
                // console.log(arr)
                that.setData({
                  datas2:datas.result.path[0],
                  arr: that.data.arr
                })
              }
            })
          }
          that.setData({
            // imgArr: that.data.imgArr.concat(tempFilePaths)
            imgArr:tempFilePaths
          });
        }
      })
  
  },
  //预览照片
  previewImg: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: that.data.imgArr[index], // 当前显示图片的http链接
      urls: that.data.imgArr // 需要预览的图片http链接列表
    })
    console.log(e.currentTarget.dataset)
  },
  

  // 删除图片
  deleteImg: function (e) {
    console.log(e)
    var that = this;
    var imgs = this.data.arr;
    var index = e.currentTarget.dataset.index;
    // var relationIds = this.data.relationId
    imgs.splice(index, 1);

    this.setData({
      arr: imgs
    });

  },

  bindTextAreaBlur:function(e){
    this.setData({
      content: e.detail.value
    }) 
  },
  // 提交
  pingjia: function () {
    var that = this;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    console.log(that.data.orderId)
    console.log(that.data.arr)
    var photo = JSON.stringify(that.data.arr);
    console.log(photo)
    that.setData({
      userId: userId
    });
    var userId = that.data.userId;
    if (that.data.content == "" || that.data.content==undefined){
      wx.showToast({
        title: "请输入评价内容",
        icon: 'none',
        duration: 2000
      })
    } else{
      var params = {
        url: '/app/order/addUserCommentInfo',
        data: {
          'type': 1,
          'orderId': that.data.orderId,
          'userInfo.id': userId,
          'washOrderInfoV3.id': that.data.orderId,
          'content': that.data.content,
          'photo': photo
        },
        method: 'POST',
        sCallBack: function (data) {
          console.log(data)
          if (data.data.errorCode == "0") {
            wx.switchTab({
              url: '/pages/details/dingdan_new/dingdan_new'
            })
          } else {
            wx.showToast({
              title: data.data.errorMsg,
              icon: 'none',
              duration: 2000
            })
          }

        },
        eCallBack: function () {
        }
      }
      base.request(params);
    }
    
   
  },


  back:function(){
    wx.switchTab({
      url: '/pages/details/dingdan_new/dingdan_new'
    })
  },


















  
})