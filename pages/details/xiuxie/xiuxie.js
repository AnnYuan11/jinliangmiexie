// pages/details/xiuxie/xiuxie.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
// var url = 'https://www.jlzn365.com'
var url = 'https://www.jlzn365.com'
var util = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1,
    imgArr: [],
    arr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var imgUrl = app.globalData.imgUrl;
    console.log(imgUrl)
    if(options.num){
      this.setData({
        num: options.num
      })
    }else{
      this.data.num = 1;
    }
    this.setData({
      dizhi: options.dizhi,
      phone:options.phone,
      imgUrl: imgUrl,
      dzid: options.dzid
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
  // 增加
  // jia: function () {
  //   // var num = wx.getStorageSync('num');//wx.getStorageSync(key)，获取本地缓存
  //   // console.log(num)
  //   var num = this.data.num;
  //   num++;

  //   this.setData({
  //     num: num,
  //   })
  // },

  // 减
  // jian: function () {
  //   var num = this.data.num;
  //   if (num > 1) {
  //     num--;
  //   }
  //   this.setData({
  //     num: num,
  //   })
  // },
  addImg: function () {
    var that = this;
    // var arr = [];

    // if (this.data.imgArr.length < 6) {
    wx.chooseImage({
      count: '1',
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
              that.setData({
                datas2: datas.result.path[0],
                arr: that.data.arr
              })
              // console.log(that.data.arr)
            }
          })
        }
        that.setData({
          // imgArr: that.data.imgArr.concat(tempFilePaths)
          imgArr: tempFilePaths
        });
      }
    })

  },
  //预览照片
  previewImg: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(that.data.imgArr)
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
  // 备注
  bindTextAreaBlur:function(e){
    this.setData({
      remark: e.detail.value
    })
    console.log(e.detail.value)
  },
  // 提交
  submit:function(){
    var that = this;
    console.log(that.data.imgArr)
    console.log(that.data.arr)
    var arr = JSON.stringify(that.data.arr)
    if (that.data.dzid) {
      if (arr == "[]" || arr == null || arr == undefined) {
        wx.showToast({
          title: '请上传您鞋子的照片',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
      console.log(userId)
      if (that.data.remark == undefined || that.data.remark == "") {
        that.data.remark = ""
      }
      var params = {
        url: '/app/orderV3/addWashOrderInfoV3Repair',
        method: 'POST',
        data: {
          'userAddressInfo.id': that.data.dzid,
          'userInfo.id': userId,
          'remark': that.data.remark,
          'orderType': 2,
          'takeShoeType': 2,
          'beforePhoto': arr,
          'shoesNumber': that.data.num
        },
        sCallBack: function (res) {
          console.log(res)
          wx.showToast({
            title: '下单成功，请保持电话畅通，客服人员将与联系',
            icon: 'none'
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/details/dingdan_new/dingdan_new',
            })
          }, 3000);
        },
        eCallBack: function () {
        }
      }
      base.request(params);
    }else{
      wx.showToast({
        title: '请选择地址',
        icon: 'none'
      })
    }
      
    
  }
})