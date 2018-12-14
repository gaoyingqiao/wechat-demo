var amapFile = require('../../../utils/amap-wx.js');

Page({
  data: {
    key: '9b0589b28ed519606d41ea391fe5429f',
    show: false,
    currentLo: null,
    currentLa: null,
    newCurrentLo: null,
    newCurrentLa: null,
    distance: 0,
    duration: 0,
    markers: null,
    scale: 16,
    polyline: null,
    statusType: 'car',
    includePoints: [],
    polypon: {
      fence_type: "polygon",
      route: [{
        "lat": 30.255995,
        "lng": 119.952524
      }, {
        "lat": 30.255518,
        "lng": 119.952696
      }, {
        "lat": 30.255249,
        "lng": 119.952562
      }, {
        "lat": 30.255559,
        "lng": 119.952181
      }] 
    }
  },
  onLoad() {
    var _this = this;
    wx.getLocation({
      success(res) {
        console.log('getLocation', res)
        _this.setData({
          currentLo: res.longitude,
          currentLa: res.latitude,
          includePoints: [{
            longitude: res.longitude,
            latitude: res.latitude
          }],
          markers: [{
            id: 0,
            longitude: res.longitude,
            latitude: res.latitude,
            title: res.address,
            iconPath: '../../../images/dizhi.png',
            width: 32,
            height: 32
          }]
        });
      }
    })
  },
  drawPolyline(self, color) {
    return {
      origin: this.data.currentLo + ',' + this.data.currentLa,
      destination: this.data.newCurrentLo + ',' + this.data.newCurrentLa,
      success(data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        self.setData({
          distance: data.paths[0].distance,
          duration: parseInt(data.paths[0].duration / 60),
          polyline: [{
            points: points,
            color: color,
            width: 6,
            arrowLine: true
          }]
        });
      }
    }
  },
  getPolyline(_type) {
    var amap = new amapFile.AMapWX({ key: this.data.key });
    var self = this;
    switch (_type) {
      case 'car':
        amap.getDrivingRoute(this.drawPolyline(this, "#0091ff"));
        break;
      case 'walk':
        amap.getWalkingRoute(this.drawPolyline(this, "#1afa29"));
        break;
      case 'ride':
        amap.getRidingRoute(this.drawPolyline(this, "#1296db"));
        break;
      default:
        return false;
    }
  },
  // initPolyline(_type) {
  //   var amap = new amapFile.AMapWX({ key: this.data.key });
  //   switch (_type) {
  //     case: 'polyline':
  //       amap.
  //   }
  // }
})