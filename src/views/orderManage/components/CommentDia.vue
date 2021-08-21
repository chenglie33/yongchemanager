<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="300px"
      :before-close="handleClose"
      @closed='closed'
    >
    <div class='flexBox flex-col'>
      <div class='flexBox flex-row flex-middle pac-mb12x'>
        <div class='item1'>车内整洁度</div>
        <div class=''>
          <el-rate
            v-model="pj1"
            disabled
            text-color="#ff9900"
            >
          </el-rate>
        </div>
      </div>
      <div class='flexBox flex-row flex-middle pac-mb12x'>
        <div class='item1'>司机服务态度</div>
        <div class=''>
          <div class=''>
          <el-rate
            v-model="pj2"
            disabled
            text-color="#ff9900"
            >
          </el-rate>
        </div>
        </div>
      </div>
      <div class='flexBox flex-row flex-middle pac-mb12x'>
        <div class='item1'>旅程舒适度</div>
        <div class=''>
          <div class=''>
          <el-rate
            v-model="pj3"
            disabled
            text-color="#ff9900"
            >
          </el-rate>
        </div>
        </div>
      </div>
      <div class='flexBox flex-row flex-middle pac-mb12x'>
        <div class='item1'>综合评分</div>
        <div class=''>

          <div class=''>
          <el-rate
            v-model="pjScore"
            disabled
            text-color="#ff9900"
            >
          </el-rate>
        </div>
        </div>
      </div>
      <div>{{pjDetails}}</div>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'commentdia',
  data () {
    return {
      title: '查看评价',
      dialogVisible: false,
      pj1: 0,
      pj2: 0,
      pj3: 0,
      pjScore: 0,
      pjDetails: ''

    }
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    },
    show (data) {
      this.pj1 = data.pj1
      this.pj2 = data.pj2
      this.pj3 = data.pj4
      this.pjScore = data.pjScore
      this.pjDetails = data.pjDetails
      this.dialogVisible = true
    },
    closed () {
      this.pj1 = 0
      this.pj2 = 0
      this.pj3 = 0
      this.pjScore = 0
      this.pjDetails = ''
    }
  }
}
</script>
<style lang='scss' scoped>
.item1{
  width: 100px;
}
</style>
