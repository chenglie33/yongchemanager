<template>
  <div>
    <el-dialog
      title="派单"
      :visible.sync="dialogVisible"

      :before-close="handleClose"
      @closed='closed'
    >
    <div class='flexBox flex-col'>
      <div class="flexBox flex-row pac-mb12x" v-for='item in orderList' :key='item.id'>
        <div class='flex-1'>{{getTypeText('carType',item.carType)}}</div>
        <div class='flex-1'>
          <el-select :disabled='isDetail' v-model="item.driverId" filterable  clearable placeholder="选择司机" class="pac-pr20x">
            <el-option v-for="item in driverList" :key='item.id' :label='item.name' :value='item.id'></el-option>
          </el-select>
        </div>
        <div class='flex-1'>
          <el-select :disabled='isDetail' v-model="item.carNum" filterable  clearable placeholder="选择车辆" class="pac-pr20x">
            <el-option v-for="item in  whitchCarList(item.carType)" :key='item.value' :label='item.label' :value='item.label'></el-option>
          </el-select>
          </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button v-if='!isDetail' type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getDriverListApi, getCarListApi, getOrderDetailsApi, releaseOrderApi } from '@/api/apilist'
import { getTypeText } from '@/utils/lib'
export default {
  name: 'paidan',
  data () {
    return {
      dialogVisible: false,
      driverList: [],
      carlist: [],
      orderList: [],
      carListOne: [],
      carListTwo: [],
      carListThree: [],
      carListFour: [],
      id: null,
      isDetail: false

    }
  },
  methods: {
    getTypeText,
    whitchCarList (type) {
      if (type == 1) {
        return this.carListOne
      } else if (type == 2) {
        return this.carListTwo
      } else if (type == 3) {
        return this.carListThree
      } else if (type == 4) {
        return this.carListFour
      }
    },
    handleClose () {
      this.dialogVisible = false
    },
    async show (data, isDetail) {
      this.isDetail = isDetail
      this.id = data
      this.dialogVisible = true
      await this.getDriverList()
      await this.getCarList()
      this.getOrderDetails(data)
    },
    closed () {
      this.id = null
      this.isDetail = false
    },
    ok () {
      const req = []
      const setd = new Set()
      const setc = new Set()
      this.orderList.forEach(item => {
        setd.add(item.driverId)
        setc.add(item.carNum)
        req.push({
          driverId: item.driver,
          carNum: item.car,
          id: this.id,
          orderDetailsId: item.id
        })
      })
      const orderLen = req.length
      if (setd.size !== orderLen || setc.size !== orderLen) {
        this.$message.warning('车辆或者司机可以重复配置')
      }
      releaseOrderApi(req).then(data => {
        this.$message.warning('派单成功')
        this.$emit('success')
        this.dialogVisible = false
      }).catch(err => {
        this.$message.warning('派单失败')
        this.dialogVisible = false
      })
    },
    getOrderDetails (id) {
      getOrderDetailsApi({ id }).then(data => {
        this.orderList = data.content
      })
    },
    getDriverList () {
      getDriverListApi({ orderStatus: 0 }).then(data => {
        this.driverList = data.content
      })
    },
    getCarList () {
      getCarListApi({ orderStatus: 0 }).then(data => {
        const carListOne = []
        const carListTwo = []
        const carListThree = []
        const carListFour = []
        data.content.forEach(element => {
          if (element.carType == 1) {
            carListOne.push({
              label: element.carNum,
              value: element.id
            })
          } else if (element.carType == 2) {
            carListTwo.push({
              label: element.carNum,
              value: element.id
            })
          } else if (element.carType == 3) {
            carListThree.push({
              label: element.carNum,
              value: element.id
            })
          } else if (element.carType == 4) {
            carListFour.push({
              label: element.carNum,
              value: element.id
            })
          }
          this.carListOne = carListOne
          this.carListTwo = carListTwo
          this.carListThree = carListThree
          this.carListFour = carListFour
        })
        this.carlist = data.content
      })
    }
  },
  mounted () {

  }
}
</script>
<style lang='scss' scoped>
.item1{
  width: 100px;
}
</style>
