<template>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="1000px"

      :before-close="handleClose"
      @closed='closed'
    >
    <div class=''>
       <el-table
      :data="tableData"
height="250"
      style="width: 100%">
      <el-table-column fixed prop="areaName" label="区域名称" width="120"> </el-table-column>
        <el-table-column prop="completeTime" label="完成时间" width="120"> </el-table-column>
         <el-table-column prop="cost" label="付款金额" width="120">
           <!-- <template slot-scope="scope">
             <div>
               {{getTypeText('orderType', scope.row.orderType)}}
             </div>
           </template> -->
         </el-table-column>
         <el-table-column prop="downStationCount" label="下车次数" width="120">
           <!-- <template slot-scope="scope">
             <div>
               {{getTypeText('orderStatus', scope.row.orderStatus)}}
             </div>
           </template> -->
        </el-table-column>
        <el-table-column prop="startTime" label="下单时间" width="120">
        </el-table-column>
        <el-table-column prop="stationName" label="站点名称" width="120">
        </el-table-column>
        <el-table-column fixed prop="carNum" label="车牌号" width="150">
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
  getUpDownStationStatisticalListApi
} from '@/api/apilist'
export default {
  name: 'orders',
  props: ['timerange', 'shangxiatyoe', 'upDownType'],
  data () {
    return {
      title: '订单上车点下车点统计排名列表',
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
      getUpDownStationStatisticalListApi({
        startTime: this.timerange[0] + ' 00:00:00',
        endTime: this.timerange[1] + ' 00:00:00',
        orderType: this.shangxiatyoe,
        upDownType: this.upDownType,
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
