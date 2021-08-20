<template>
  <div class="home flexBox">
    <div class='posA datarang'>
      <el-date-picker
        v-model="rangedata"
        type="datetimerange"
        value-format='yyyy-MM-dd HH:mm:SS'
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>

    <CarSelect @selectChange='selectChange' :single='true'/>
    <div id='map-baidu' class="flex-1">

    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import CarSelect from '@/components/CarSelect.vue'
import { getCarHistoryApi } from '@/api/apilist'
export default {
  name: 'histroys',

  components: {
    CarSelect
  },
  watch: {
    rangedata (v) {
      this.$nextTick(() => {
        this.carRealDetails(this.carNum)
      })
    }
  },
  data () {
    const datec = new Date()
    datec.setHours(0)
    datec.setMinutes(0)
    datec.setSeconds(0)
    return {
      height: document.body.clientHeight - 88,
      carlist: [],
      carNum: '',
      rangedata: [datec, new Date()],
      map: null
    }
  },
  methods: {
    selectChange (data) {
      this.carlist = data
      let carNum = ''
      this.carlist.forEach(item => {
        carNum += item.carNum
      })
      this.carNum = carNum.slice(0, carNum.length - 1)
      this.carRealDetails(carNum)
    },
    carRealDetails (carNum) {
      const Polyline = []
      let point = null
      getCarHistoryApi({ carNum, startTime: this.rangedata[0], endTime: this.rangedata[1] }).then(data => {
        console.log(data)
        data.content.forEach((item, index) => {
          Polyline.push(new BMapGL.Point(item.longitude, item.latitude))
          var points = new BMapGL.Point(item.longitude, item.latitude)
          // var myIcon = new BMapGL.Icon(che_2, new BMapGL.Size(60, 60), {

          //   imageSize: new BMapGL.Size(50, 50),
          //   anchor: new BMapGL.Size(30, 30),
          //   imageOffset: new BMapGL.Size(0, 0) // 设置图片偏移
          // })
          // // 创建标注对象并添加到地图
          // var marker = new BMapGL.Marker(points, { icon: myIcon })
          // this.map.addOverlay(marker)
          if (index === data.content.length - 1) {
            console.log(item.longitude, item.latitude)
            point = new BMapGL.Point(item.longitude, item.latitude)
          }
        })

        this.map.centerAndZoom(point, 10)
        var polyline = new BMapGL.Polyline(Polyline, { strokeColor: 'blue', strokeWeight: 2, strokeOpacity: 0.5 })
        this.map.addOverlay(polyline)
      })
    }
  },
  mounted () {
    this.map = new BMapGL.Map('map-baidu')
    // 创建地图实例
    var point = new BMapGL.Point(116.404, 39.915)

    var scaleCtrl = new BMapGL.ScaleControl() // 添加比例尺控件
    this.map.addControl(scaleCtrl)
    var zoomCtrl = new BMapGL.ZoomControl() // 添加缩放控件
    this.map.addControl(zoomCtrl)
    var cityCtrl = new BMapGL.CityListControl() // 添加城市列表控件
    this.map.addControl(cityCtrl)
    // this.map.centerAndZoom(point, 10)
  }
}
</script>
<style lang="scss" scoped>
#map-baidum,.home{
  width: 100%;
  height: 100%;
}
.datarang{
  z-index: 20;
  top: 110px;
  left: 120px;
}
</style>
