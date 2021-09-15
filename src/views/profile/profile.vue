<template>
  <div class="container-panel flexBox flex-row">
    <orderDetail ref='orderDetail' :timerange='timerange'/>
    <yongshi ref='yongshi' :timerange='timerange'/>
    <shangxia ref='shangxia' :timerange='timerange' :shangxiatyoe='shangxiatyoe' :upDownType='upDownType'/>
    <div class="flexBox flex-col">
      <div class="leftPanel flex-1 pac-mb12x shadowWin flexBox flex-col">
        <el-date-picker
          class="timeW"
          v-model="timerange"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <div class="flexBox flex-row flex-middle flex-center flex-1">
          总额：{{ this.allCost }}
        </div>
      </div>
      <div class="leftPanel flex-1 pac-mb12x shadowWin flexBox flex-col">
        <div class="flexBox flex-row flex-center flex-middle"><div>机场</div><div class='flex-end flex-1 flexBox flex-center '> <el-button class='fR ' type="text"  icon="el-icon-s-operation" circle @click='showorder'></el-button></div></div>
        <numshangche class="flex-1" :jiChang="jiChang" ref="jichang" />
      </div>
      <div class="leftPanel flex-1 pac-mb12x shadowWin flexBox flex-col">
       <div class="flexBox flex-row flex-center flex-middle"><div>火车站</div><div class='flex-end flex-1 flexBox flex-center '> <el-button class='fR ' type="text"  icon="el-icon-s-operation" circle @click='showorder'></el-button></div></div>
        <numshangche class="flex-1" :jiChang="trainData" ref="train" />
      </div>
      <div class="leftPanel flex-1 pac-mb12x shadowWin flexBox flex-col">
        <div class="flexBox flex-row flex-center flex-middle"><div>包车</div><div class='flex-end flex-1 flexBox flex-center '> <el-button class='fR ' type="text"  icon="el-icon-s-operation" circle @click='showorder'></el-button></div></div>
        <numshangche class="flex-1" :jiChang="baocheData" ref="baoche" />
      </div>
    </div>
    <div class="flexBox flex-col pac-pl12x flex-1" style="">
      <div class="flexBox flex-row flex-2 pac-mb12x">
        <div class="chartMap shadowWin flex-1 flexBox posR" >
          <div class='flex-1 posA' style="width:100%;height:100%" ref="chartMap"></div>
        </div>
        <div class="paiming pac-ml12x  flexBox flex-col" >
          <div class='shadowWin aoll flexBox pac-mb12x flex-col'>
            <div class='flex-end'><el-button class='fR ' type="text"  icon="el-icon-s-operation" circle @click='showorderyongshi'></el-button></div>
            <div class='flex-1 flexBox flex-middle flex-center'>总计：{{allTime}}小时</div>
          </div>
          <div class='flex-1 shadowWin' ref='chartXX'></div>
        </div>
      </div>
      <div class="flex-1 pac-pb12x">
        <div class="cartCity shadowWin pac-p12x flexBox flex-col">
          <div class="flexBox flex-row">
            <div>上车下车点统计</div>
            <div class="flex-1">
              <el-button class='fR ' type="text"  icon="el-icon-s-operation" circle @click='showordershanxia'></el-button>
              <el-select v-model="shangxiatyoe" class="fR">
                <el-option label="接机" :value="1"></el-option>
                <el-option label="送机" :value="2"></el-option>
                <el-option label="接火车" :value="3"></el-option>
                <el-option label="送火车" :value="4"></el-option>
                <el-option label="包车" :value="5"></el-option>
              </el-select>
              <el-select v-model="upDownType" class="fR pac-mr12x">
                <el-option label="上车点" :value="1"></el-option>
                <el-option label="下车点" :value="2"></el-option>
              </el-select>

            </div>
          </div>
          <div class="flex-1" ref="updown"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCostRateApi,
  getUpDownStationStatisticalApi,
  getMapStationApi,
  getUseCarTimeApi
} from '@/api/apilist'
import numshangche from './components/numshangche.vue'
import orderDetail from './components/orderDetail.vue'
import shangxia from './components/shangxia.vue'
import yongshi from './components/yongshi.vue'

import { getTypeText } from '@/utils/lib'
export default {
  name: 'peizhi',
  components: { numshangche, orderDetail, yongshi, shangxia },
  data () {
    const date = new Date()
    date.setMonth(date.getMonth() - 1)
    return {
      jiChang: {},
      trainData: {},
      baocheData: {},
      shangxiatyoe: 1,
      upDownType: 1,
      allCost: 0,
      allTime: 0,
      timerange: [
        dayjs(date).format('YYYY-MM-DD'),
        dayjs(new Date()).format('YYYY-MM-DD')
      ]
    }
  },
  watch: {
    timerange (v) {
      this.getAll()
    },
    upDownType (v) {
      this.getAll()
    },
    shangxiatyoe (v) {
      this.getAll()
    }
  },
  methods: {
    showordershanxia () {
      this.$refs.shangxia.show()
    },
    showorderyongshi () {
      this.$refs.yongshi.show()
    },
    showorder () {
      this.$refs.orderDetail.show()
    },
    getUseCarTime () {
      return new Promise((res) => {
        getUseCarTimeApi({
          startTime: this.timerange[0] + ' 00:00:00',
          endTime: this.timerange[1] + ' 00:00:00'
        }).then(data => {
          res(data.content)
        })
      })
    },
    getMapStation () {
      return new Promise((resolve, reject) => {
        getMapStationApi({
          startTime: this.timerange[0] + ' 00:00:00',
          endTime: this.timerange[1] + ' 00:00:00',
          orderType: this.shangxiatyoe,
          upDownType: this.upDownType
        })
          .then(data => {
            resolve(data.content)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    chartMap (data) {
      // var map = new BMapGL.Map(this.$refs.chartMap)
      const chart = echarts.init(this.$refs.chartMap)

      const lineData = []
      const scatterPoints = [
        { value: [120.594712, 31.305046], itemStyle: { color: '#ffc107' } }
      ]
      data.forEach(item => {
        lineData.push([
          { coord: [120.594712, 31.305046] },
          {
            coord: [item.lng, item.lat], // fromCoord
            value: 0
          }
        ])
        scatterPoints.push({ value: [item.lng, item.lat, item.upStationCount, item.stationName], itemStyle: { color: '#ffc107' } })
      })

      const option = {
        tooltip: {
          trigger: 'item',
          formatter: function (v) {
            if (v.data.value.length > 3) {
              return v.data.value[3] + '：' + v.data.value[2].toString()
            }
            return null
          }
        },

        bmap: {
          center: [120.594712, 31.305046],
          zoom: 9,
          roam: true,
          mapStyle: {
            styleJson: [{
              featureType: 'land',
              elementType: 'geometry',
              stylers: {
                visibility: 'on',
                color: '#091220ff'
              }
            }, {
              featureType: 'water',
              elementType: 'geometry',
              stylers: {
                visibility: 'on',
                color: '#113549ff'
              }
            }, {
              featureType: 'green',
              elementType: 'geometry',
              stylers: {
                visibility: 'on',
                color: '#0e1b30ff'
              }
            }, {
              featureType: 'building',
              elementType: 'geometry',
              stylers: {
                visibility: 'on'
              }
            }, {
              featureType: 'building',
              elementType: 'geometry.topfill',
              stylers: {
                color: '#113549ff'
              }
            }, {
              featureType: 'building',
              elementType: 'geometry.sidefill',
              stylers: {
                color: '#143e56ff'
              }
            }, {
              featureType: 'building',
              elementType: 'geometry.stroke',
              stylers: {
                color: '#dadada00'
              }
            }, {
              featureType: 'subwaystation',
              elementType: 'geometry',
              stylers: {
                visibility: 'on',
                color: '#113549B2'
              }
            }, {
              featureType: 'education',
              elementType: 'geometry',
              stylers: {
                visibility: 'on',
                color: '#12223dff'
              }
            }, {
              featureType: 'medical',
              elementType: 'geometry',
              stylers: {
                visibility: 'on',
                color: '#12223dff'
              }
            }, {
              featureType: 'scenicspots',
              elementType: 'geometry',
              stylers: {
                visibility: 'on',
                color: '#12223dff'
              }
            }, {
              featureType: 'highway',
              elementType: 'geometry',
              stylers: {
                visibility: 'on',
                weight: 4
              }
            }, {
              featureType: 'highway',
              elementType: 'geometry.fill',
              stylers: {
                color: '#12223dff'
              }
            }, {
              featureType: 'highway',
              elementType: 'geometry.stroke',
              stylers: {
                color: '#fed66900'
              }
            }, {
              featureType: 'highway',
              elementType: 'labels',
              stylers: {
                visibility: 'on'
              }
            }, {
              featureType: 'highway',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#12223dff'
              }
            }, {
              featureType: 'highway',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'highway',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'on'
              }
            }, {
              featureType: 'arterial',
              elementType: 'geometry',
              stylers: {
                visibility: 'on',
                weight: 2
              }
            }, {
              featureType: 'arterial',
              elementType: 'geometry.fill',
              stylers: {
                color: '#12223dff'
              }
            }, {
              featureType: 'arterial',
              elementType: 'geometry.stroke',
              stylers: {
                color: '#ffeebb00'
              }
            }, {
              featureType: 'arterial',
              elementType: 'labels',
              stylers: {
                visibility: 'on'
              }
            }, {
              featureType: 'arterial',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'arterial',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'local',
              elementType: 'geometry',
              stylers: {
                visibility: 'on',
                weight: 1
              }
            }, {
              featureType: 'local',
              elementType: 'geometry.fill',
              stylers: {
                color: '#12223dff'
              }
            }, {
              featureType: 'local',
              elementType: 'geometry.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'local',
              elementType: 'labels',
              stylers: {
                visibility: 'on'
              }
            }, {
              featureType: 'local',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#979c9aff'
              }
            }, {
              featureType: 'local',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffffff'
              }
            }, {
              featureType: 'railway',
              elementType: 'geometry',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'subway',
              elementType: 'geometry',
              stylers: {
                visibility: 'off',
                weight: 1
              }
            }, {
              featureType: 'subway',
              elementType: 'geometry.fill',
              stylers: {
                color: '#d8d8d8ff'
              }
            }, {
              featureType: 'subway',
              elementType: 'geometry.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'subway',
              elementType: 'labels',
              stylers: {
                visibility: 'on'
              }
            }, {
              featureType: 'subway',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#979c9aff'
              }
            }, {
              featureType: 'subway',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffffff'
              }
            }, {
              featureType: 'continent',
              elementType: 'labels',
              stylers: {
                visibility: 'on'
              }
            }, {
              featureType: 'continent',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'on'
              }
            }, {
              featureType: 'continent',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'continent',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'city',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'on'
              }
            }, {
              featureType: 'city',
              elementType: 'labels',
              stylers: {
                visibility: 'on'
              }
            }, {
              featureType: 'city',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'city',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'town',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'on'
              }
            }, {
              featureType: 'town',
              elementType: 'labels',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'town',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#454d50ff'
              }
            }, {
              featureType: 'town',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffffff'
              }
            }, {
              featureType: 'road',
              elementType: 'geometry.fill',
              stylers: {
                color: '#12223dff'
              }
            }, {
              featureType: 'poilabel',
              elementType: 'labels',
              stylers: {
                visibility: 'on'
              }
            }, {
              featureType: 'districtlabel',
              elementType: 'labels',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'road',
              elementType: 'geometry',
              stylers: {
                visibility: 'on'
              }
            }, {
              featureType: 'road',
              elementType: 'labels',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'district',
              elementType: 'labels',
              stylers: {
                visibility: 'on'
              }
            }, {
              featureType: 'poilabel',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'poilabel',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'poilabel',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'manmade',
              elementType: 'geometry',
              stylers: {
                color: '#12223dff'
              }
            }, {
              featureType: 'districtlabel',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffffff'
              }
            }, {
              featureType: 'entertainment',
              elementType: 'geometry',
              stylers: {
                color: '#12223dff'
              }
            }, {
              featureType: 'shopping',
              elementType: 'geometry',
              stylers: {
                color: '#12223dff'
              }
            }, {
              featureType: 'nationalway',
              stylers: {
                curZoomRegionId: '0',
                curZoomRegion: '6,10',
                level: '6'
              }
            }, {
              featureType: 'nationalway',
              stylers: {
                curZoomRegionId: '0',
                curZoomRegion: '6,10',
                level: '7'
              }
            }, {
              featureType: 'nationalway',
              stylers: {
                curZoomRegionId: '0',
                curZoomRegion: '6,10',
                level: '8'
              }
            }, {
              featureType: 'nationalway',
              stylers: {
                curZoomRegionId: '0',
                curZoomRegion: '6,10',
                level: '9'
              }
            }, {
              featureType: 'nationalway',
              stylers: {
                curZoomRegionId: '0',
                curZoomRegion: '6,10',
                level: '10'
              }
            }, {
              featureType: 'nationalway',
              elementType: 'geometry',
              stylers: {
                visibility: 'off',
                curZoomRegionId: '0',
                curZoomRegion: '6,10',
                level: '6'
              }
            }, {
              featureType: 'nationalway',
              elementType: 'geometry',
              stylers: {
                visibility: 'off',
                curZoomRegionId: '0',
                curZoomRegion: '6,10',
                level: '7'
              }
            }, {
              featureType: 'nationalway',
              elementType: 'geometry',
              stylers: {
                visibility: 'off',
                curZoomRegionId: '0',
                curZoomRegion: '6,10',
                level: '8'
              }
            }, {
              featureType: 'nationalway',
              elementType: 'geometry',
              stylers: {
                visibility: 'off',
                curZoomRegionId: '0',
                curZoomRegion: '6,10',
                level: '9'
              }
            }, {
              featureType: 'nationalway',
              elementType: 'geometry',
              stylers: {
                visibility: 'off',
                curZoomRegionId: '0',
                curZoomRegion: '6,10',
                level: '10'
              }
            }, {
              featureType: 'nationalway',
              elementType: 'labels',
              stylers: {
                visibility: 'off',
                curZoomRegionId: '0',
                curZoomRegion: '6,10',
                level: '6'
              }
            }, {
              featureType: 'nationalway',
              elementType: 'labels',
              stylers: {
                visibility: 'off',
                curZoomRegionId: '0',
                curZoomRegion: '6,10',
                level: '7'
              }
            }, {
              featureType: 'nationalway',
              elementType: 'labels',
              stylers: {
                visibility: 'off',
                curZoomRegionId: '0',
                curZoomRegion: '6,10',
                level: '8'
              }
            }, {
              featureType: 'nationalway',
              elementType: 'labels',
              stylers: {
                visibility: 'off',
                curZoomRegionId: '0',
                curZoomRegion: '6,10',
                level: '9'
              }
            }, {
              featureType: 'nationalway',
              elementType: 'labels',
              stylers: {
                visibility: 'off',
                curZoomRegionId: '0',
                curZoomRegion: '6,10',
                level: '10'
              }
            }, {
              featureType: 'cityhighway',
              stylers: {
                curZoomRegionId: '0',
                curZoomRegion: '6,9',
                level: '6'
              }
            }, {
              featureType: 'cityhighway',
              stylers: {
                curZoomRegionId: '0',
                curZoomRegion: '6,9',
                level: '7'
              }
            }, {
              featureType: 'cityhighway',
              stylers: {
                curZoomRegionId: '0',
                curZoomRegion: '6,9',
                level: '8'
              }
            }, {
              featureType: 'cityhighway',
              stylers: {
                curZoomRegionId: '0',
                curZoomRegion: '6,9',
                level: '9'
              }
            }, {
              featureType: 'cityhighway',
              elementType: 'geometry',
              stylers: {
                visibility: 'off',
                curZoomRegionId: '0',
                curZoomRegion: '6,9',
                level: '6'
              }
            }, {
              featureType: 'cityhighway',
              elementType: 'geometry',
              stylers: {
                visibility: 'off',
                curZoomRegionId: '0',
                curZoomRegion: '6,9',
                level: '7'
              }
            }, {
              featureType: 'cityhighway',
              elementType: 'geometry',
              stylers: {
                visibility: 'off',
                curZoomRegionId: '0',
                curZoomRegion: '6,9',
                level: '8'
              }
            }, {
              featureType: 'cityhighway',
              elementType: 'geometry',
              stylers: {
                visibility: 'off',
                curZoomRegionId: '0',
                curZoomRegion: '6,9',
                level: '9'
              }
            }, {
              featureType: 'cityhighway',
              elementType: 'labels',
              stylers: {
                visibility: 'off',
                curZoomRegionId: '0',
                curZoomRegion: '6,9',
                level: '6'
              }
            }, {
              featureType: 'cityhighway',
              elementType: 'labels',
              stylers: {
                visibility: 'off',
                curZoomRegionId: '0',
                curZoomRegion: '6,9',
                level: '7'
              }
            }, {
              featureType: 'cityhighway',
              elementType: 'labels',
              stylers: {
                visibility: 'off',
                curZoomRegionId: '0',
                curZoomRegion: '6,9',
                level: '8'
              }
            }, {
              featureType: 'cityhighway',
              elementType: 'labels',
              stylers: {
                visibility: 'off',
                curZoomRegionId: '0',
                curZoomRegion: '6,9',
                level: '9'
              }
            }, {
              featureType: 'subwaylabel',
              elementType: 'labels',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'subwaylabel',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'tertiarywaysign',
              elementType: 'labels',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'tertiarywaysign',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'provincialwaysign',
              elementType: 'labels',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'provincialwaysign',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'nationalwaysign',
              elementType: 'labels',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'nationalwaysign',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'highwaysign',
              elementType: 'labels',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'highwaysign',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'village',
              elementType: 'labels',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'district',
              elementType: 'labels.text',
              stylers: {
                fontsize: 20
              }
            }, {
              featureType: 'district',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'district',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'country',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'country',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'cityhighway',
              elementType: 'geometry.fill',
              stylers: {
                color: '#12223dff'
              }
            }, {
              featureType: 'cityhighway',
              elementType: 'geometry.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'tertiaryway',
              elementType: 'geometry.fill',
              stylers: {
                color: '#12223dff'
              }
            }, {
              featureType: 'tertiaryway',
              elementType: 'geometry.stroke',
              stylers: {
                color: '#ffffff10'
              }
            }, {
              featureType: 'provincialway',
              elementType: 'geometry.fill',
              stylers: {
                color: '#12223dff'
              }
            }, {
              featureType: 'provincialway',
              elementType: 'geometry.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'nationalway',
              elementType: 'geometry.fill',
              stylers: {
                color: '#12223dff'
              }
            }, {
              featureType: 'nationalway',
              elementType: 'geometry.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'highway',
              elementType: 'labels.text',
              stylers: {
                fontsize: 20
              }
            }, {
              featureType: 'nationalway',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'nationalway',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#12223dff'
              }
            }, {
              featureType: 'nationalway',
              elementType: 'labels.text',
              stylers: {
                fontsize: 20
              }
            }, {
              featureType: 'provincialway',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#12223dff'
              }
            }, {
              featureType: 'provincialway',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'provincialway',
              elementType: 'labels.text',
              stylers: {
                fontsize: 20
              }
            }, {
              featureType: 'cityhighway',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#12223dff'
              }
            }, {
              featureType: 'cityhighway',
              elementType: 'labels.text',
              stylers: {
                fontsize: 20
              }
            }, {
              featureType: 'cityhighway',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'estate',
              elementType: 'geometry',
              stylers: {
                color: '#12223dff'
              }
            }, {
              featureType: 'tertiaryway',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'tertiaryway',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'fourlevelway',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'fourlevelway',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'scenicspotsway',
              elementType: 'geometry.fill',
              stylers: {
                color: '#12223dff'
              }
            }, {
              featureType: 'scenicspotsway',
              elementType: 'geometry.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'universityway',
              elementType: 'geometry.fill',
              stylers: {
                color: '#12223dff'
              }
            }, {
              featureType: 'universityway',
              elementType: 'geometry.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'vacationway',
              elementType: 'geometry.fill',
              stylers: {
                color: '#12223dff'
              }
            }, {
              featureType: 'vacationway',
              elementType: 'geometry.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'fourlevelway',
              elementType: 'geometry',
              stylers: {
                visibility: 'on'
              }
            }, {
              featureType: 'fourlevelway',
              elementType: 'geometry.fill',
              stylers: {
                color: '#12223dff'
              }
            }, {
              featureType: 'fourlevelway',
              elementType: 'geometry.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'transportationlabel',
              elementType: 'labels',
              stylers: {
                visibility: 'on'
              }
            }, {
              featureType: 'transportationlabel',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'transportationlabel',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'transportationlabel',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'educationlabel',
              elementType: 'labels',
              stylers: {
                visibility: 'on'
              }
            }, {
              featureType: 'educationlabel',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'educationlabel',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'educationlabel',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'transportation',
              elementType: 'geometry',
              stylers: {
                color: '#113549ff'
              }
            }, {
              featureType: 'airportlabel',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'airportlabel',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'scenicspotslabel',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'scenicspotslabel',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'medicallabel',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'medicallabel',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'medicallabel',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'scenicspotslabel',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'airportlabel',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'entertainmentlabel',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'entertainmentlabel',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'entertainmentlabel',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'estatelabel',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'estatelabel',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'estatelabel',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'businesstowerlabel',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'businesstowerlabel',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'businesstowerlabel',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'companylabel',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'companylabel',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'companylabel',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'governmentlabel',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'governmentlabel',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'governmentlabel',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'restaurantlabel',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'restaurantlabel',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'restaurantlabel',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'hotellabel',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'hotellabel',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'hotellabel',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'shoppinglabel',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'shoppinglabel',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'shoppinglabel',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'lifeservicelabel',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'lifeservicelabel',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'lifeservicelabel',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'carservicelabel',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'carservicelabel',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'carservicelabel',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'financelabel',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'financelabel',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'financelabel',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'otherlabel',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'otherlabel',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'otherlabel',
              elementType: 'labels.icon',
              stylers: {
                visibility: 'off'
              }
            }, {
              featureType: 'manmade',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'manmade',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'transportation',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'transportation',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'education',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'education',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'medical',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'medical',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }, {
              featureType: 'scenicspots',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#2dc4bbff'
              }
            }, {
              featureType: 'scenicspots',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#ffffff00'
              }
            }]
          }
        },

        series: [
          {
            /// 地图线的动画效果
            type: 'lines',
            zlevel: 2,
            coordinateSystem: 'bmap',
            effect: {
              show: true,
              period: 4, // 箭头指向速度，值越小速度越快
              trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'arrow', // 箭头图标
              symbolSize: 5, // 图标大小
              color: '#ff9800'
            },
            lineStyle: {
              normal: {
                width: 1, // 尾迹线条宽度
                opacity: 0.5, // 尾迹线条透明度
                curveness: 0.1, // 尾迹线条曲直度
                color: '#ff9800',
                type: 'dotted'
              }
            },
            data: lineData
          },
          {
            // 涟漪
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            showEffectOn: 'render',
            zlevel: 3,

            rippleEffect: {
              period: 15,
              scale: 1,
              brushType: 'fill'
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color:
                  '#1DE9B6', /* function (value){ //随机颜色	return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);	} */
                shadowBlur: 2,
                shadowColor: '#333'
              }
            },
            symbolSize: 8,
            data: scatterPoints
          }
        ]
      }
      chart.setOption(option)
    },
    getUpDownStationStatistical () {
      getUpDownStationStatisticalApi({
        startTime: this.timerange[0] + ' 00:00:00',
        endTime: this.timerange[1] + ' 00:00:00',
        orderType: this.shangxiatyoe,
        upDownType: this.upDownType
      }).then(data => {
        console.log(data)
        const xData = []
        const yData = []

        data.content.forEach(item => {
          xData.push(item.stationName)
          yData.push(item.upStationCount)
        })
        const chart = echarts.init(this.$refs.updown)
        const option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '1%',
            right: '1%',
            bottom: '1%',
            top: '12%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: xData
          },
          yAxis: {
            type: 'value',
            splitNumber: 3
          },
          series: [
            {
              data: yData,
              type: 'bar',
              barMaxWidth: 20
            }
          ]
        }
        chart.setOption(option)
      })
    },
    getCostRate (req) {
      return new Promise(res => {
        getCostRateApi(req).then(data => {
          this.allCost = data.content.allCost
          res(data.content)
        })
      })
    },
    draw (data) {
      const yAxis = []
      const datax = []
      this.allTime = 0
      data.forEach(item => {
        yAxis.push(getTypeText('carTypes', item.carType))
        datax.push(item.useHour)
        this.allTime += item.useHour
      })
      var myChart = echarts.init(this.$refs.chartXX)
      const option = {

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: yAxis
        },
        series: [
          {

            type: 'bar',
            data: datax,
            barMaxWidth: 20
          }
        ]
      }
      myChart.setOption(option)
    },
    getAll () {
      this.getUseCarTime().then(data => {
        this.draw(data)
      })

      // 飞机
      this.getCostRate({
        orderType: '1,2',
        startTime: this.timerange[0] + ' 00:00:00',
        endTime: this.timerange[1] + ' 00:00:00'
      }).then(data => {
        this.jiChang = data
        this.jiChang.color = ['#0de7b7']

        this.$nextTick(() => {
          this.$refs.jichang.drawPie()
        })
      })
      // 火车
      this.getCostRate({
        orderType: '3,4',
        startTime: this.timerange[0] + ' 00:00:00',
        endTime: this.timerange[1] + ' 00:00:00'
      }).then(data => {
        this.trainData = data
        this.trainData.color = ['#e26983']
        this.$nextTick(() => {
          this.$refs.train.drawPie()
        })
      })
      // 包机
      this.getCostRate({
        orderType: '5',
        startTime: this.timerange[0] + ' 00:00:00',
        endTime: this.timerange[1] + ' 00:00:00'
      }).then(data => {
        this.baocheData = data
        this.baocheData.color = ['#eeb756']
        this.$nextTick(() => {
          this.$refs.baoche.drawPie()
        })
      })
      this.getUpDownStationStatistical()

      this.getMapStation().then(data => {
        this.chartMap(data)
      })
    }
  },
  mounted () {
    this.getAll()
  }
}
</script>

<style lang="scss" scoped>
.container-panel {
  padding: 10px;
}
.shadowWin {
  box-shadow: 0px 3px 10px 2px rgba(41, 125, 236, 0.2);
}
.leftPanel {
  padding: 10px;
  width: 300px;
}
.chartMap {

}
.paiming {
  width: 300px;
}
.cartCity {
  height: 100%;
}
.timeW {
  width: 280px;
}
.aoll{
  height:30%
}
</style>
