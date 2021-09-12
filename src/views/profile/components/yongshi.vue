<template>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="800px"

      :before-close="handleClose"
      @closed='closed'
    >
    <div class=''>
       <el-table
      :data="tableData"
height="250"
      style="width: 100%">
      <el-table-column fixed prop="carNum" label="车牌号" width="120"> </el-table-column>
         <el-table-column prop="carType" label="车类型" width="120">
           <template slot-scope="scope">
             <div>
               {{getTypeText('carType', scope.row.carType)}}
             </div>
           </template>
         </el-table-column>
         <el-table-column prop="driverOrderStatus" label="司机订单状态" width="120">
           <template slot-scope="scope">
             <div>
               {{getTypeText('orderStatus', scope.row.driverOrderStatus)}}
             </div>
           </template>
        </el-table-column>
        <el-table-column prop="driverName" label="司机名" width="120">
        </el-table-column>
        <el-table-column prop="driverExecuteTime" label="司机执行订单时间" width="120">
        </el-table-column>
        <el-table-column  prop="driverEndTime" label="司机结束时间" width="150">
        </el-table-column>

       </el-table>
       <el-pagination
      background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNo"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    </el-dialog>
</template>
<script>

import { getTypeText } from '@/utils/lib'
import {
  useCarTimeListApi
} from '@/api/apilist'
export default {
  name: 'orders',
  props: ['timerange'],
  data () {
    return {
      title: '车类型用车时间分页列表',
      pageNo: 1,
      pageSize: 30,
      total: 0,
      dialogVisible: false,
      tableData: []

    }
  },
  methods: {
    getTypeText,
    handleSizeChange (v) {
      this.pageSize = v
    },
    handleCurrentChange (v) {
      this.pageNo = v
    },
    handleClose () {
      this.dialogVisible = false
    },
    show (data) {
      useCarTimeListApi({
        startTime: this.timerange[0] + ' 00:00:00',
        endTime: this.timerange[1] + ' 00:00:00',
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }).then(data => {
        this.tableData = data.content.list
        console.log(data.content.pageInfo)
        this.total = Number(data.content.pageInfo.rows)
        this.dialogVisible = true
      })
    },
    closed () {

    }
  }
}
</script>
<style lang='scss' scoped>
.item1{
  width: 100px;
}
</style>
