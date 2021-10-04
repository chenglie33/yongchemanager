<template>
  <div class="home flexBox">
    <CarSelect @selectChange='selectChange'/>
    <div id='map-baidu' class="flex-1">

    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import CarSelect from '@/components/CarSelect.vue'
import { carRealDetailsApi } from '@/api/apilist'
import che_2 from '../assets/che_2.png'
export default {
  name: 'Home',

  components: {
    CarSelect
  },
  data () {
    return {
      height: document.body.clientHeight - 88,
      carlist: [],
      carNum: '',
      che_2,
      map: null
    }
  },
  methods: {
    // 根据原始数据计算中心坐标和缩放级别，并为地图设置中心坐标和缩放级别。
    setZoom (points) {
      if (points.length > 0) {
        var maxLng = points[0].lng
        var minLng = points[0].lng
        var maxLat = points[0].lat
        var minLat = points[0].lat
        var res
        for (var i = points.length - 1; i >= 0; i--) {
          res = points[i]
          if (res.lng > maxLng) maxLng = res.lng
          if (res.lng < minLng) minLng = res.lng
          if (res.lat > maxLat) maxLat = res.lat
          if (res.lat < minLat) minLat = res.lat
        };
        var cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2
        var cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2
        var zoom = this.getZoom(maxLng, minLng, maxLat, minLat)
        this.map.centerAndZoom(new BMapGL.Point(cenLng, cenLat), zoom)
      } else {
        // 没有坐标，显示全中国
        this.map.centerAndZoom(new BMapGL.Point(103.388611, 35.563611), 5)
      }
    },
    // 根据经纬极值计算绽放级别。
    getZoom (maxLng, minLng, maxLat, minLat) {
      var zoom = ['50', '100', '200', '500', '1000', '2000', '5000', '10000', '20000', '25000', '50000', '100000', '200000', '500000', '1000000', '2000000']// 级别18到3。
      var pointA = new BMapGL.Point(maxLng, maxLat) // 创建点坐标A
      var pointB = new BMapGL.Point(minLng, minLat) // 创建点坐标B
      var distance = this.map.getDistance(pointA, pointB).toFixed(1) // 获取两点距离,保留小数点后两位
      for (var i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
        if (zoom[i] - distance > 0) {
          return 18 - i + 3// 之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。
        }
      };
    },

    selectChange (data) {
      // this.map.clearoverlays()
      this.map.clearOverlays()
      this.carlist = data
      let carNum = ''
      this.carlist.forEach(item => {
        carNum += item.carNum + ','
      })
      this.carNum = carNum.slice(0, carNum.length - 1)
      this.carRealDetails(this.carNum)
    },
    carRealDetails (carNum) {
      this.carNumlist = carNum
      carRealDetailsApi({ carNum }).then(data => {
        const allpoint = []
        data.content.forEach(item => {
          console.log(item)
          allpoint.push({ lng: item.longitude, lat: item.latitude })
          var point = new BMapGL.Point(item.longitude, item.latitude)
          var myIcon = new BMapGL.Icon(che_2, new BMapGL.Size(60, 60), {

            imageSize: new BMapGL.Size(50, 50),
            anchor: new BMapGL.Size(30, 30),
            imageOffset: new BMapGL.Size(0, 0) // 设置图片偏移
          })
          // 创建标注对象并添加到地图
          var marker = new BMapGL.Marker(point, { icon: myIcon })

          this.map.addOverlay(marker)
          var sContent = `<h4 style='margin:0 0 5px 0;'>${item.carNum}</h4>
                            <div class='flexBox flex-row'>
                              <div style='width:120px'>车速:</div>
                              <div style='width:120px'>${item.carSpeed}km/h</div>
                            </div>
                            <div class='flexBox flex-row'>
                              <div style='width:120px'>数据时间:</div>
                              <div style='width:120px'>${item.dataTime}</div>
                            </div>
                            `
          var infoWindow = new BMapGL.InfoWindow(sContent)
          // marker添加点击事件
          marker.addEventListener('click', function () {
            this.openInfoWindow(infoWindow)
            // 图片加载完毕重绘infoWindow
            document.getElementById(item.carNum).onload = function () {
              infoWindow.redraw() // 防止在网速较慢时生成的信息框高度比图片总高度小，导致图片部分被隐藏
            }
          })
          this.setZoom(allpoint)
          // this.map.centerAndZoom(point, 10)
        })
      })
    }
  },
  mounted () {
    this.map = new BMapGL.Map('map-baidu')
    // 创建地图实例
    var point = new BMapGL.Point(120.60801, 31.303825)
    // // 创建点坐标
    // var myIcon = new BMapGL.Icon(che_2, new BMapGL.Size(60, 60), {
    // // 指定定位位置。
    // // 当标注显示在地图上时，其所指向的地理位置距离图标左上
    // // 角各偏移10像素和25像素。您可以看到在本例中该位置即是
    // // 图标中央下端的尖角位置。
    //   imageSize: new BMapGL.Size(50, 50),
    //   anchor: new BMapGL.Size(30, 30),
    //   // 设置图片偏移。
    //   // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
    //   // 需要指定大图的偏移位置，此做法与css sprites技术类似。
    //   imageOffset: new BMapGL.Size(0, 0) // 设置图片偏移
    // })
    // 创建标注对象并添加到地图

    // var marker = new BMapGL.Marker(point, { icon: myIcon })
    // this.map.addOverlay(marker)
    var scaleCtrl = new BMapGL.ScaleControl() // 添加比例尺控件
    this.map.addControl(scaleCtrl)
    var zoomCtrl = new BMapGL.ZoomControl() // 添加缩放控件
    this.map.addControl(zoomCtrl)
    // var cityCtrl = new BMapGL.CityListControl() // 添加城市列表控件
    // this.map.addControl(cityCtrl)
    this.map.enableScrollWheelZoom(true)
    this.map.centerAndZoom(point, 10)
  }
}
</script>
<style lang="scss" scoped>
#map-baidum,.home{
  width: 100%;
  height: 100%;
}
</style>
