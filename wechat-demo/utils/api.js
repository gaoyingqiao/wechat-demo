let API_HOST = "http://gyqtest.com/test";
let DEBUG = true; // 切换数据入口

const Mock = require('./mock.js')

function ajax(data = '', fn, method = "get", header = {}) {
  if (!DEBUG) {
    wx.request({
      url: config.API_HOST + data,
      method: method ? method : 'get',
      data: {},
      header: header ? header : { "Content-Type": "application/json" },
      success: function (res) {
        fn(res);
      }
    });
  } else {
    // 模拟数据
    var res;
    if (data === '') {
      res = Mock.mock({
        'error_code': '',
        'error_msg': '',
        'data|10': [{
          'id|+1': 1,
          'img': "@image('200x100', '#4A7BF7','#fff','pic')",
          'title': '@ctitle(3,8)',
          'city': "@county(true)",
          'stock_num': '@integer(0,100)',//库存数量  
          'marketing_start': '@datetime()',
          'marketing_stop': '@now()',
          'price': '@integer(100,2000)',//现价，单位：分  
          'original_price': '@integer(100,3000)'
        }]
      })
    } else if (data === '/carousel') {
      res = getCarousel()
    } else if (data === '/charts') {
      res = getCharts()
    }
    console.log(res, 'res')
    fn(res);
  }
}

// 获取轮播图数据
function getCarousel() {
  return Mock.mock({
    'error_code': '',
    'error_msg': '',
    'data|3': [{
      'id|+1': 1,
      'img': "@image('355x150', '#4A7BF7', 'red','pic')",
    }]
  })
}

// 获取echarts数据
function getCharts() {
  return Mock.mock({
    'error_code': '',
    'error_msg': '',
    'data|7': [{
      'id|+1': 1,
      'data1|100-350': 200,
      'data2|80-240': 100,
    }]
  })
}

module.exports = {
  ajax: ajax
}