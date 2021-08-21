<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="300px"
      :before-close="handleClose"
      @closed='closed'
    >
    <div class='flexBox flex-col flex-middle'>
      <div class='flexBox flex-row flex-middle pac-mb12x'>
        <el-select v-model='driver' filterable  placeholder="选择司机">
          <el-option  v-for="item in driverList"
          :key="item.id"
          :label="item.name"
          :value="item.id+'==='+item.name">

          </el-option>
        </el-select>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled='!driver' @click="subm">派发</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getDriverListApi, releaseOrderApi } from '@/api/apilist'
export default {
  name: 'driverselect',
  data () {
    return {
      title: '开票',
      dialogVisible: false,
      driver: '',
      id: '',
      driverid: '',
      driverList: []
    }
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    },
    closed () {
      this.driver = ''
      this.id = ''
      this.driverList = []
    },
    subm () {
      const driArr = this.driver.split('===')
      this.driverName = driArr[1]
      this.driverid = driArr[0]
      releaseOrderApi({ driverId: this.driverid, driverName: this.driverName, id: this.id }).then(() => {
        this.dialogVisible = false
        this.$emit('success')
      })
    },
    show (data) {
      this.dialogVisible = true
      this.id = data.id
      getDriverListApi({ orderStatus: 0 }).then(data => {
        this.driverList = data.content
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
