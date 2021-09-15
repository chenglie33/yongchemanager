<template>
  <div class="container-panel">
    <Paidan ref='paidan' @success='search'/>
    <CommentDia ref='comm'/>
    <DriverSelect ref='DriverSelect' @success='search'/>
    <div class="flexBox flex-row flex-end">
      <el-input v-model='carNum' placeholder="车牌号码" class='w120x pac-mr12x' />
      <el-select v-model="companyId" clearable placeholder="公司名称" class="pac-pr20x">
        <el-option
          v-for="item in comapyTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          {{ item.label }}
        </el-option>
      </el-select>
      <el-date-picker
      class='pac-mr12x'
        v-model="rangedata"
        type="datetimerange"
        value-format='yyyy-MM-dd HH:mm:SS'
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-input class='w120x pac-mr12x' v-model="driverName" placeholder="司机名"/>
      <el-input class='w120x pac-mr12x' v-model="userName" placeholder="用户名"/>
      <el-select v-model="orderStatus" placeholder="订单状态" clearable class="pac-pr20x">
        <el-option
          v-for="item in orderStatuslist"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          {{ item.label }}
        </el-option>
      </el-select>
      <el-button type="primary"  @click='search'>查询</el-button>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%" class="pac-mt20x">
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
        <el-table-column prop="otherCost" label="待付（元）"> </el-table-column>
        <el-table-column prop="userName" label="客户姓名" width="120"> </el-table-column>

        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
            v-if='scope.row.isPj == 2'
            @click='showd(scope.row)'
              type="text"
              >查看评价</el-button
            >
             <el-button
             v-if='scope.row.orderStatus===0 && scope.row.orderCostStatus>1'
            @click='paidan(scope.row)'
              type="text"
              >派单</el-button
            >

            <el-button
             v-if='scope.row.orderStatus >0'
            @click='paidandetail(scope.row)'
              type="text"
              >派单详情</el-button
            >

          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="flexBox flex-end pac-mt12x">
      <el-pagination
      background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="req.pageNo"
        :page-size="req.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getOrderPageListApi } from '@/api/apilist'
import { getTypeText } from '@/utils/lib'
import { mapState } from 'vuex'
import CommentDia from './components/CommentDia.vue'
import DriverSelect from './components/DriverSelect.vue'
import Paidan from './components/Paidan.vue'
export default {
  name: 'ordermanage',
  components: {
    CommentDia, DriverSelect, Paidan
  },
  computed: {

    CommonCompanylist () {
      this.getComp()
      return this.CommonCompany
    },
    ...mapState([
      'CommonCompany', 'CommonDriver', 'CommonOrder'
    ])
  },
  data () {
    const datec = new Date()
    datec.setHours(0)
    datec.setMinutes(0)
    datec.setSeconds(0)
    return {
      currentPage: 1,
      comapyTypeList: [],
      total: 0,
      req: {
        pageNo: 1,
        pageSize: 10,
        driverName: '',
        userName: '',
        input: '',
        value1: null,
        value: null,
        orderStatus: null,
        orderStatuslist: getTypeText('orderStatus'),
        tableData: [],
        rangedata: [dayjs(datec).format('YYYY-MM-DD HH:mm:ss'), dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')]
      },
      carNum: '',
      companyId: '',
      driverName: '',
      userName: '',
      input: '',
      value1: null,
      value: null,
      orderStatus: null,
      orderStatuslist: getTypeText('orderStatus'),
      tableData: [],
      rangedata: [dayjs(datec).format('YYYY-MM-DD HH:mm:ss'), dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')]
    }
  },
  methods: {
    getTypeText,
    showd (data) {
      this.$refs.comm.show(data)
    },
    paidan (data) {
      this.$refs.paidan.show(data.id)
    },
    getComp () {
      const comapyTypeList = []
      this.CommonCompany.forEach(item => {
        comapyTypeList.push({ value: item.id, label: item.companyName })
      })
      this.comapyTypeList = comapyTypeList
    },
    paidandetail (data) {
      this.$refs.paidan.show(data.id, true)
    },
    handleSizeChange (v) {
      this.req.pageSize = v
      this.getList()
    },
    handleCurrentChange (v) {
      this.req.pageNo = v
      this.getList()
    },
    search () {
      this.req.pageNo = 1
      this.getList()
    },
    getList () {
      if (!this.rangedata || this.rangedata.length === 0) {
        this.req.startTime = ''
        this.req.endTime = ''
      } else {
        this.req.startTime = this.rangedata[0]
        this.req.endTime = this.rangedata[1]
      }
      this.req.carNum = this.carNum
      this.req.companyId = this.companyId
      this.req.driverName = this.driverName
      this.req.orderStatus = this.orderStatus === '' ? null : this.orderStatus
      this.req.userName = this.userName
      getOrderPageListApi(this.req).then(data => {
        console.log(data)
        this.tableData = data.content.list
        this.total = Number(data.content.pageInfo.rows)
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.getComp()
      this.getList()
    }, 10)
  }
}
</script>
<style lang="scss" scoped></style>
