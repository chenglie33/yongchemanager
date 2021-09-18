<template>
  <div class='flexBox flex-col'>

    <div class='item flexBox flex-row' v-if='orderType!=3'>
      <div class='label'>接送类型:</div>
      <div class='items'>
        <el-select v-model='types'   >
          <el-option

          :label="`到${custName}接我`"
          value="1">

          </el-option>
          <el-option

          :label="`送我去机场${custName}`"
          value="2">

          </el-option>
        </el-select>
      </div>
    </div>
    <div class='item flexBox flex-row' v-if='types==1'>
      <div class='label'>出发地:</div>
      <div class='items'>
        <el-select v-model='custAdd' placeholder="出发地" >
           <el-option label="到机场接我"
          value="1">

          </el-option>

         </el-select>
      </div>
    </div>
    <div class='item flexBox flex-row' v-if='types==1&&orderType==3'>
      <div class='label'>目的地:</div>
      <div class='items'>
        <el-select v-model='custAdd' placeholder="目的地" >
           <el-option label="到机场接我" value="1">

          </el-option>

         </el-select>
      </div>
    </div>
    <div class='item flexBox flex-row' v-if='orderType!=3'>
      <div class='label'>{{custName}}:</div>
      <div class='items'>
        <el-cascader
               filterable
                  v-model="areaCode"
                  :options="options"
                  :props="{ checkStrictly: true,expandTrigger: 'click',  value:'key', label: 'value', children: 'children', emitPath: false}"
                  @change="handleChange"></el-cascader>
      </div>
      <div class='items'>
         <el-select v-model='custAdd' :placeholder="`请选择${custName}`">
           <el-option

          label="到机场接我"
          value="1">

          </el-option>
         </el-select>
      </div>
    </div>

    <div class='item flexBox flex-row' v-if='types==2'>
      <div class='label'>目的地址:</div>
      <div class='items'>
        <el-select v-model='custAdd' placeholder="目的地">
           <el-option

          label="到机场接我"
          value="1">

          </el-option>
         </el-select>
      </div>

    </div>

    <div class='item flexBox flex-row' v-if='orderType!=3'>
      <div class='label'>{{orderType==1?'航班班次':'火车班次'}}:</div>
      <div class='items'>
        <el-input v-model='zuojiaid'/>
      </div>

    </div>
    <div class='item flexBox flex-row'>
      <div class='label'>{{orderType==1?'航班时间到站':orderType==2?'火车时间到站':'预计到达时间'}}:</div>
      <div class='items'>
         <el-date-picker
         value-format='yyyy-MM-dd'
            v-model="airveTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
      </div>

    </div>
    <div class='item flexBox flex-row'>
      <div class='label'>车辆类型数量:</div>
      <div class='bigItem flexBox flex-col'>
        <div class='flexBox flex-row'>
          <div>大巴</div>
          <div><el-input-number :precision='0' v-model="num1" :min="0" :max="10" ></el-input-number></div>
        </div>
        <div class='flexBox flex-row'>
          <div>中巴</div>
          <div><el-input-number :precision='0' v-model="num2" :min="0" :max="10" ></el-input-number></div>
        </div>
        <div class='flexBox flex-row'>
          <div>商务</div>
          <div><el-input-number :precision='0' v-model="num3" :min="0" :max="10" ></el-input-number></div>
        </div>
        <div class='flexBox flex-row'>
          <div>小巴</div>
          <div><el-input-number :precision='0' v-model="num4" :min="0" :max="10" ></el-input-number></div>
        </div>
      </div>
    </div>
    <div class='item flexBox flex-row'>
      <div class='label'>时间类型:</div>
      <div class='items'>
         <el-select v-model='timetype'>
           <el-option
            v-for="item in selector"
            :key='item.value'
          :label="item.label"
          :value="item.value">

          </el-option>
         </el-select>
      </div>

    </div>
    <div class='item flexBox flex-row'>
      <div class='label'>开始时间:</div>
      <div class='items'>{{airveTime}}</div>
      <div class='items'>
         <el-select v-model='startH'>
           <el-option
            v-for="item in selectortime"
            :key='item'
          :label="item"
          :value="item">

          </el-option>
         </el-select>
      </div>

    </div>
    <div class='item flexBox flex-row'>
      <div class='label'>结束时间:</div>
      <div class='items'>
        <el-date-picker
        value-format='yyyy-MM-dd'
      v-model="endTime"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
      </div>
      <div class='items'>
         <el-select v-model='startH'>
           <el-option
            v-for="item in selectortime"
            :key='item'
          :label="item"
          :value="item">

          </el-option>
         </el-select>
      </div>

    </div>

  </div>
</template>

<script>
import { getRegionTreeApi } from '@/api/apilist'
export default {
  props: ['orderType'],
  watch: {
    // orderType: {
    //   immediate: true,
    //   handler: function (v) {
    //     if (v == 1) {
    //       this.custName = '机场'
    //     } else if (v == 2) {
    //       this.custName = '火车站'
    //     }
    //   }
    // }

  },
  mounted () {
    if (this.orderType == 1) {
      this.custName = '机场'
    } else if (this.orderType == 2) {
      this.custName = '火车站'
    }
  },
  data () {
    return {
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0,
      custName: '机场',
      startH: '00:00',
      endTime: null,
      types: '1',
      timetype: 1,
      options: [],
      areaCode: '',
      custAdd: null,
      zuojiaid: '',
      airveTime: '',
      selector: [{ label: '整天(8:00～18:00)', value: 1 }, { label: '上半天(8:00～12:00)', value: 2 }, { label: '下半天(12:00～18:00)', value: 3 }, { label: '时间段', value: 4 }],
      selectortime: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    }
  },
  methods: {
    getRegionTree () {
      getRegionTreeApi().then(data => {
        console.log(data.content)
        this.options = data.content
      })
    },
    handleChange (v) {

    }
  }

}
</script>

<style lang="scss" scoped>
.item{
  border-bottom: 1px solid #dfdfdf;
}
</style>
