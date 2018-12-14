import * as echarts from '../../../ec-canvas/echarts.js';

const API = require('../../../utils/api.js')

const app = getApp();

function setOption(chart, chartsData) {
  const data1 = chartsData && chartsData.map(v => { return v.data1 })
  const data2 = chartsData && chartsData.map(v => { return v.data2 })
  console.log(data1, data2)
  const option = {
    title: {
      text: '堆叠区域图'
    },
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['邮件营销', '视频广告']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '邮件营销',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: data1
      },
      {
        name: '视频广告',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: data2
      },
    ]
  };
  chart.setOption(option);
}

Page({
  onShareAppMessage: res => {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },

  onLoad: function() {
    console.log('onLoad')
    // 使用 Mock
    API.ajax('/charts', (res) => {
      //这里既可以获取模拟的res
      console.log(res)
      this.setData({
        chartsData: res.data,
        loadingData: false
      })
    });
  },

  onReady: function () {
    console.log('onReady')
    // 获取组件
    this.ecComponent = this.selectComponent('#charts-lazy');
    this.init();
  },

  data: {
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    chartsData: [],
    isLoaded: false,
    isDisposed: false,
    loadData: true,
  },

  // 初始化图表
  init: function () {
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      const { chartsData = [] } = this.data;
      setOption(chart, chartsData);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },

  dispose: function () {
    if (this.chart) {
      this.chart.dispose();
    }

    this.setData({
      isDisposed: true
    });
  }
});