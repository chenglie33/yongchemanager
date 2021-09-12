<template>
  <div class="container-panel flexBox flex-row">

    <div class='flexBox flex-col'>
      <div class='leftPanel flex-1 pac-mb12x shadowWin flexBox flex-col'>
        <el-date-picker
          class='timeW'
          v-model="timerange"
          value-format='yyyy-MM-dd'
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <div class='flexBox flex-row flex-middle flex-center flex-1'>
          总额：{{this.allCost}}
        </div>
      </div>
      <div class='leftPanel flex-1 pac-mb12x shadowWin flexBox flex-col'>
        <span>机场</span>
        <numshangche class='flex-1' :jiChang='jiChang' ref='jichang'/>
      </div>
      <div class='leftPanel flex-1 pac-mb12x shadowWin flexBox flex-col'>
        <span id='train' >火车站</span>
        <numshangche class='flex-1' :jiChang='trainData' ref='train'/>
      </div>
      <div class='leftPanel flex-1 pac-mb12x shadowWin flexBox flex-col'>
        <span id='baoche' >包车</span>
        <numshangche class='flex-1' :jiChang='baocheData' ref='baoche'/>
      </div>
    </div>
    <div class='flexBox flex-col pac-pl12x flex-1' style="">
      <div class='flexBox flex-row flex-2 pac-mb12x'>
        <div class='chartMap shadowWin flex-1' ref='chartMap'></div>
        <div class='paiming pac-ml12x shadowWin'></div>
      </div>
      <div class='flex-1 pac-pb12x'>
        <div class='cartCity shadowWin pac-p12x flexBox flex-col'>
          <div class='flexBox flex-row'>
            <div>上车下车点统计</div>
            <div class='flex-1'>
              <el-select v-model='shangxiatyoe' class='fR'>
                <el-option label='接机' :value="1"></el-option>
                <el-option label='送机' :value="2"></el-option>
                <el-option label='接火车' :value="3"></el-option>
                <el-option label='送火车' :value="4"></el-option>
                <el-option label='包车' :value="5"></el-option>
              </el-select>
              <el-select v-model='upDownType' class='fR pac-mr12x'>
                <el-option label='上车点' :value="1"></el-option>
                <el-option label='下车点' :value="2"></el-option>
              </el-select>
            </div>
          </div>
          <div class='flex-1' ref='updown'></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getCostRateApi, getUpDownStationStatisticalApi, getMapStationApi } from '@/api/apilist'
import numshangche from './components/numshangche.vue'
export default {
  name: 'peizhi',
  components: { numshangche },
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
      timerange: [dayjs(date).format('YYYY-MM-DD HH:mm:ss'), dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')]
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
    getMapStation () {
      return new Promise((resolve, reject) => {
        getMapStationApi({ startTime: this.timerange[0] + ' 00:00:00', endTime: this.timerange[1] + ' 00:00:00', orderType: this.shangxiatyoe, upDownType: this.upDownType }).then(data => {
          resolve(data.content)
        }).catch(err => {
          reject(err)
        })
      })
    },
    chartMap (data) {
      var map = new BMapGL.Map(this.$refs.chartMap)
      var point = new BMapGL.Point(120.594712, 31.305046)
      map.centerAndZoom(point, 10)
      map.enableScrollWheelZoom()
      var styleJson = [{
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
          visibility: 'off'
        }
      }, {
        featureType: 'city',
        elementType: 'labels',
        stylers: {
          visibility: 'off'
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
      map.setMapStyleV2({ styleJson: styleJson })

      const arr = []
      let polyline = null
      data.forEach(item => {
        var path = [
          new BMapGL.Point(120.594712, 31.305046),
          new BMapGL.Point(item.lng, item.lat)
        ]
        polyline = new BMapGL.Polyline(path, {
          clip: false,
          geodesic: true,
          strokeColor: 'blue',
          strokeWeight: 3,
          strokeOpacity: 0.6
        })
        map.addOverlay(polyline)
        function startLushu () {
          var fly = 'data:image/png;base64,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'
          const lushu = new BMapGLLib.LuShu(map, polyline.getPath(), {
            geodesic: true,
            autoCenter: true,
            icon: new BMapGL.Icon(fly, new BMapGL.Size(48, 48), { anchor: new BMapGL.Size(24, 24) }),
            speed: 10000,
            enableRotation: true
          })
          setTimeout(lushu.start(), 4000)
        }
        arr.push(startLushu)
      })

      arr.forEach(item => {
        // item()
      })
    },
    getUpDownStationStatistical () {
      getUpDownStationStatisticalApi({ startTime: this.timerange[0] + ' 00:00:00', endTime: this.timerange[1] + ' 00:00:00', orderType: this.shangxiatyoe, upDownType: this.upDownType }).then(data => {
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
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
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
          series: [{
            data: yData,
            type: 'bar',
            barMaxWidth: 20

          }]
        }
        chart.setOption(option)
      })
    },
    getCostRate (req) {
      return new Promise((res) => {
        getCostRateApi(req).then(data => {
          this.allCost = data.content.allCost
          res(data.content)
        })
      })
    },
    getAll () {
      this.getMapStation().then(data => {
        this.chartMap(data)
      })
      // 飞机
      this.getCostRate({ orderType: '1,2', startTime: this.timerange[0] + ' 00:00:00', endTime: this.timerange[1] + ' 00:00:00' })
        .then(data => {
          this.jiChang = data
          this.jiChang.color = ['#0de7b7']

          this.$nextTick(() => {
            this.$refs.jichang.drawPie()
          })
        })
      // 火车
      this.getCostRate({ orderType: '3,4', startTime: this.timerange[0] + ' 00:00:00', endTime: this.timerange[1] + ' 00:00:00' })
        .then(data => {
          this.trainData = data
          this.trainData.color = ['#e26983']
          this.$nextTick(() => {
            this.$refs.train.drawPie()
          })
        })
      // 包机
      this.getCostRate({ orderType: '5', startTime: this.timerange[0] + ' 00:00:00', endTime: this.timerange[1] + ' 00:00:00' })
        .then(data => {
          this.baocheData = data
          this.baocheData.color = ['#eeb756']
          this.$nextTick(() => {
            this.$refs.baoche.drawPie()
          })
        })
      this.getUpDownStationStatistical()
    }
  },
  mounted () {
    this.getAll()
  }

}
</script>

<style lang="scss" scoped>
.container-panel{
  padding:10px
}
.shadowWin{
box-shadow:  0px 3px 10px 2px rgba(41, 125, 236, 0.2);
}
.leftPanel{
  padding:10px;
  width: 300px;
}
.chartMap{

}
.paiming{
  width: 300px;
}
.cartCity{
height: 100%;
}
.timeW{
  width: 280px;
}
</style>
