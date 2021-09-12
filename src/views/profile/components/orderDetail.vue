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
      <el-table-column fixed prop="id" label="订单编号" width="120"> </el-table-column>
        <el-table-column prop="startTime" label="下单时间" width="120"> </el-table-column>
         <el-table-column prop="orderType" label="订单类型" width="120">
           <template slot-scope="scope">
             <div>
               {{getTypeText('orderType', scope.row.orderType)}}
             </div>
           </template>
         </el-table-column>
         <el-table-column prop="orderStatus" label="订单状态" width="120">
           <template slot-scope="scope">
             <div>
               {{getTypeText('orderStatus', scope.row.orderStatus)}}
             </div>
           </template>
        </el-table-column>
        <el-table-column prop="companyName" label="企业名称" width="120">
        </el-table-column>
        <el-table-column prop="driverName" label="司机名称" width="120">
        </el-table-column>
        <el-table-column fixed prop="carNum" label="车牌号" width="150">
        </el-table-column>
        <el-table-column prop="startTime" label="接送时间" width="150">
        </el-table-column>
        <el-table-column prop="startAddress" label="出发地址" width="150">
        </el-table-column>
        <!-- <el-table-column fixed prop="flight_num" label="车次/航班号" width="150">
        </el-table-column> -->
        <el-table-column prop="endAddress" label="目的地地址" width="120">
        </el-table-column>

        <el-table-column prop="deposit" label="定金（元）"> </el-table-column>
        <el-table-column prop="otherCost" label="尾款（元）"> </el-table-column>
        <el-table-column prop="userName" label="客户姓名" width="120"> </el-table-column>
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
  statisticalApi
} from '@/api/apilist'
export default {
  name: 'orders',
  props: ['timerange'],
  data () {
    return {
      title: '订单费用占比分页列表',
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
      statisticalApi({
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
