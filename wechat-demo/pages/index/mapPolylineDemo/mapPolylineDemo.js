var amapFile = require('../../../utils/amap-wx.js');

Page({
  data: {
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
    var map = new amapFile.Map('map-polyline', {
      zoom: 10
    });
    map.setMapStyle('amap://styles/79917cca25be14f105ebbed6f90c5c56')
  },
})