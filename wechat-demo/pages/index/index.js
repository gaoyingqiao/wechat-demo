//index.js
//获取应用实例
const app = getApp()

const API = require('../../utils/api.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list: [],
    menuList: [
      {
        id: 1,
        name: '轮播图',
        pages: 'carousel'
      },
      {
        id: 2,
        name: 'ECharts',
        pages: 'charts'
      },
      {
        id: 3,
        name: 'lazyCharts',
        pages: 'lazyCharts',
      },
      {
        id: 4,
        name: 'mapDemo',
        pages: 'mapDemo',
      },
      {
        id: 5,
        name: 'mapPolylineDemo',
        pages: 'mapPolylineDemo'
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    // 使用 Mock
    API.ajax('', (res) => {
      //这里既可以获取模拟的res
      console.log(res)
      this.setData({
        list: res.data
      })
    });

    console.log(this.data.list)
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 设置menu分享
  onShareAppMessage: function(res) {
    // from：转发事件来源。button：页面内转发按钮；menu：右上角转发菜单； 
    // target：如果 from 值是 button，则 target 是触发这次转发事件的 button，否则为 undefined
    if (res.from === 'menu') {
      return {
        title: '页面一分享', // 转发标题（默认：当前小程序名称）
        path: '/pages/index/index', // 转发路径（当前页面 path ），必须是以 / 开头的完整路径
        success(e) {
          // 转发成功
          console.log("转发成功:" + JSON.stringify(e));
          // shareAppMessage: ok,
          // shareTickets 数组，每一项是一个 shareTicket ，对应一个转发对象
          // 需要在页面onLoad()事件中实现接口
          wx.showShareMenu({
            // 要求小程序返回分享目标信息
            withShareTicket: true
          });
        },
        fail(e) {
          // 转发失败
          console.log("转发失败:" + JSON.stringify(e));
        },
        complete() {}
      }
    }
  }
})
