<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      @closed='closed'
    >
      <div class="flexBox flex-col">
         <div class="item flexBox flex-row flex-middle pac-mb12x">
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem"><span class='redIcon'>*</span>费用类型：</div>
            <div>
              <el-select v-model="req.configType" placeholder="类型" @change='typeChange'>
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  {{ item.label }}
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem"><span class='redIcon'>*</span>费用：</div>
            <div>
              <el-input v-model='req.cost' type="number"/>
            </div>
          </div>

        </div>
        <div class="item flexBox flex-row flex-middle pac-mb12x">
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem"><span class='redIcon'>*</span>出发地：</div>
            <div>

               <el-cascader
               filterable
                  v-model="req.address1"
                  :options="addressList1"
                  :props="{ expandTrigger: 'click',  value:'key', label: 'value', children: 'children', emitPath: false}"
                  ></el-cascader>
            </div>
          </div>
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem"><span class='redIcon'>*</span>目的地：</div>
            <div>
              <!-- <el-input v-model='req.address2'/> -->
              <el-cascader
               filterable
                  v-model="req.address2"
                  :options="addressList2"
                  :props="{ expandTrigger: 'click',  value:'key', label: 'value', children: 'children', emitPath: false}"
                  ></el-cascader>
            </div>
          </div>
        </div>

        <div class="item flexBox flex-row flex-middle pac-mb12x">
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem"><span class='redIcon'>*</span>车型：</div>
            <div>
              <el-select
                v-model="req.carType"
                placeholder="车辆类型"
                class="pac-pr20x"
              >
                <el-option
                  v-for="item in carTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  {{ item.label }}
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="flex-1 flexBox flex-row flex-middle" v-if='req.configType===5'>
            <div class="labelItem">途径</div>
            <div>
              <el-cascader
               filterable
                  v-model="addressline"
                  collapse-tags
                  :options="addressList"
                  :props="{ multiple: true ,expandTrigger: 'click',  value:'key', label: 'value', children: 'children', emitPath: false}"
                  ></el-cascader>
            </div>
          </div>

        </div>

        <div class="item flexBox flex-row flex-middle pac-mb12x">
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem"><span class='redIcon'>*</span>费用时段：</div>
            <div>
              <el-select
                v-model="req.timeType"
                placeholder="费用时段"
                class="pac-pr20x"
              >
                <el-option :value='1' label='整天'></el-option>
                <el-option :value='2' label='上半天'></el-option>
                <el-option :value='3' label='下半天'></el-option>
                <el-option :value='4' label='时间段'></el-option>
              </el-select>
            </div>
          </div>

        </div>
        <div class="item flexBox flex-row flex-middle pac-mb12x">

          <div class="flex-1 flexBox flex-row flex-middle" v-if='req.timeType===4'>
            <div class="labelItem"><span class='redIcon'>*</span>时间段</div>
            <div>

              <el-input-number v-model="req.startTime" :precision="0" :step="1" :min='0' :max="23" :step-strictly='true'></el-input-number>~
              <el-input-number v-model="req.endTime" :precision="0" :step="1" :min='0' :max="23"></el-input-number>
            </div>
          </div>

        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { updateCostConfigureApi, addCostConfigureApi, getRegionTreeApi, getAddressBookListApi } from '@/api/apilist'
import { getTypeText } from '@/utils/lib'
export default {
  name: 'friyong',
  props: ['comapyTypeList', 'activeName'],
  computed: {

  },

  data () {
    return {
      pickeroptions: {
        format: 'H'
      },
      req: {
        startTime: 0,
        endTime: 0,
        address1: '',
        address2: '',
        configType: 1,
        carType: 1,
        cost: '',
        passThrough: '',
        timeType: 1
      },
      addressline: null,
      dialogVisible: false,
      carTypeList: getTypeText('carType'),
      id: '',
      title: '',
      rangeData: [],
      typeList: [
        {
          value: 1,
          label: '接机'
        },
        {
          value: 2,
          label: '送机'
        }

      ],
      addressList: [],
      addressList1: [],
      addressList2: [],
      flag: true
    }
  },
  watch: {
    'req.configType': {
      handler: function (v) {
        this.getAddressBookList(v)
      },
      deep: true
    },
    addressline (v) {
      this.req.passThrough = v.toString()
    },
    activeName (v) {
      if (v === '飞机') {
        this.typeList = [{
          value: 1,
          label: '接机'
        },
        {
          value: 2,
          label: '送机'
        }]
        this.req.configType = 1
      } else if (v === '火车') {
        this.typeList = [{
          value: 3,
          label: '接火车'
        }, {
          value: 4,
          label: '送火车'
        }]
        this.req.configType = 3
      } else {
        this.typeList = [{
          value: 5,
          label: '包车'
        }]
        this.req.configType = 5
      }
    }
  },
  methods: {
    getTypeText,
    disabledDate (v) {
      console.log(v)
    },
    getAddressBookList (v) {
      let type = 1
      if (v === 1 || v === 2) {
        type = 1
      } else if (v === 3 || v === 4) {
        type = 2
      } else {
        type = 3
      }
      getAddressBookListApi({ stationType: type }).then(data => {
        if (v === 1 || v === 3) {
          this.addressList1 = data.content.map(item => {
            return {
              key: item.areaCode,
              value: item.airportName
            }
          })
          this.addressList2 = this.addressList
        } else if (v === 2 || v === 4) {
          this.addressList1 = this.addressList
          this.addressList2 = data.content.map(item => {
            return {
              key: item.areaCode,
              value: item.airportName
            }
          })
        } else {
          this.addressList1 = this.addressList
          this.addressList2 = this.addressList
        }
      })
    },
    getaddressList () {
      return new Promise(res => {
        getRegionTreeApi().then(data => {
          this.addressList = data.content
          res(true)
        })
      })
    },
    getComp () {
      const comapyTypeList = []
      this.CommonCompany.forEach(item => {
        comapyTypeList.push({ value: item.id, label: item.companyName })
      })
      this.comapyTypeList = comapyTypeList
    },
    handleClose () {
      this.dialogVisible = false
    },
    closed () {
      this.req = {
        startTime: 0,
        endTime: 0,
        address1: '',
        address2: '',
        configType: 1,
        carType: 1,
        cost: '',
        passThrough: '',
        timeType: 1
      }
      this.id = ''
    },
    async show (c, data) {
      this.flag = true
      this.title = c
      await this.getaddressList()
      this.dialogVisible = true
      if (c === '编辑') {
        this.id = data.id
        this.req.address1 = data.address1
        this.req.address2 = data.address2
        this.req.cost = data.cost
        this.req.startTime = data.startTime
        this.req.endTime = data.endTime

        this.req.carType = data.carType
        this.req.passThrough = data.passThrough.split(',')
        this.addressline = data.passThrough.split(',')
        console.log(this.req.passThrough)
        this.req.timeType = data.timeType

        this.req.configType = Number(data.configType)
        this.getAddressBookList(this.req.configType)
      } else {
        this.getAddressBookList(this.req.configType)
      }
    },
    submit () {
      if (!this.req.address1 || !this.req.address2 || !this.req.configType || !this.req.cost) {
        this.$alert('内容不可为空', '警告', {
          confirmButtonText: '确定',
          type: 'warning'

        })
        return
      }
      if (this.req.timeType === 4 && ((!this.req.startTime && this.req.startTime !== 0) || (!this.req.endTime && this.req.endTime !== 0))) {
        this.$alert('时间有问题', '警告', {
          confirmButtonText: '确定',
          type: 'warning'

        })
        return
      }
      if (this.req.timeType === 4 && (this.req.startTime >= this.req.endTime)) {
        this.$alert('时间有问题', '警告', {
          confirmButtonText: '确定',
          type: 'warning'

        })
        return
      }
      if (this.title !== '编辑') {
        addCostConfigureApi(this.req).then(data => {
          this.$emit('success')
          this.dialogVisible = false
        })
      } else {
        this.req.id = this.id
        updateCostConfigureApi(this.req).then(data => {
          this.$emit('success')
          this.dialogVisible = false
        })
      }
    },
    typeChange () {
      if (this.flag && this.title === '编辑') {
        this.req.address1 = null
        this.req.address2 = null
        this.addressline = []
      } else {
        this.req.address1 = null
        this.req.address2 = null
        this.addressline = []
      }
      this.flag = false
    }
  }
}
</script>
<style lang="scss" scoped>
.labelItem {
  width: 100px;
}
</style>
