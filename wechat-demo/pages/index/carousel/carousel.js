//index.js
//获取应用实例
const app = getApp()

const API = require('../../../utils/api.js')

Page({
  data: {
    // 轮播图配置
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    carousels: [],
  },
  onLoad: function () {
    // 使用 Mock
    API.ajax('/carousel', (res) => {
      //这里既可以获取模拟的res
      console.log(res)
      this.setData({
        carousels: res.data
      })
    });
  },

  // 设置menu分享
  onShareAppMessage: function (res) {
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
        complete() { }
      }
    }
  },

  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  }
})
