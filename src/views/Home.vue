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
    selectChange (data) {
      this.carlist = data
      let carNum = ''
      this.carlist.forEach(item => {
        carNum += item.carNum + ','
      })
      this.carNum = carNum.slice(0, carNum.length - 1)
      this.carRealDetails(carNum)
    },
    carRealDetails (carNum) {
      carRealDetailsApi({ carNum }).then(data => {
        console.log(data)
        data.content.forEach(item => {
          var point = new BMapGL.Point(item.longitude, item.latitude)
          var myIcon = new BMapGL.Icon(che_2, new BMapGL.Size(60, 60), {

            imageSize: new BMapGL.Size(50, 50),
            anchor: new BMapGL.Size(30, 30),
            imageOffset: new BMapGL.Size(0, 0) // 设置图片偏移
          })
          // 创建标注对象并添加到地图
          var marker = new BMapGL.Marker(point, { icon: myIcon })
          this.map.addOverlay(marker)
          this.map.centerAndZoom(point, 10)
        })
      })
    }
  },
  mounted () {
    this.map = new BMapGL.Map('map-baidu')
    // 创建地图实例
    var point = new BMapGL.Point(116.404, 39.915)
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
    var cityCtrl = new BMapGL.CityListControl() // 添加城市列表控件
    this.map.addControl(cityCtrl)
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
