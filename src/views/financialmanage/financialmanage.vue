<template>
  <div class="container-panel">
    <KaiPiaoDi ref='KaiPiaoDi' @success='search'/>
    <div class="flexBox flex-row flex-end">
      <el-date-picker
      class='pac-mr12x'
        v-model="rangedata"
        type="datetimerange"
        value-format='yyyy-MM-dd HH:mm:SS'
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-input class='w120x pac-mr12x' v-model="req.orderId" placeholder="订单号"/>

      <el-select v-model="req.orderStatus" placeholder="订单状态" clearable class="pac-pr20x">
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
        <el-table-column fixed prop="id" label="订单编号" > </el-table-column>
         <el-table-column prop="orderStatus" label="订单状态" >
           <template slot-scope="scope">
             <div>
               {{getTypeText('orderStatus', scope.row.orderStatus)}}
             </div>
           </template>
        </el-table-column>
        <el-table-column prop="deposit" label="定金（元）"> </el-table-column>
        <el-table-column prop="otherCost" label="待付"> </el-table-column>

        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button v-if='scope.row.orderStatus!==7'
            @click='showd(scope.row)'
              type="text"
              >开票</el-button
            >
            <el-button v-else
              type="text"
              @click='showd(scope.row)'
              >已开票</el-button
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
        :current-page.sync="currentPage"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getInvoiceOrderPageListApi } from '@/api/apilist'
import { getTypeText } from '@/utils/lib'
import { mapState } from 'vuex'
import KaiPiaoDi from './components/KaiPiaoDi.vue'

export default {
  name: 'finalcia',
  components: {
    KaiPiaoDi
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
        pageSize: 50,
        orderId: '',
        orderStatus: '',
        rangedata: [dayjs(datec).format('YYYY-MM-DD HH:mm:ss'), dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')]
      },
      orderStatuslist: getTypeText('orderStatus'),
      tableData: [],
      rangedata: [dayjs(datec).format('YYYY-MM-DD HH:mm:ss'), dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')]
    }
  },
  methods: {
    getTypeText,
    showd (data) {
      this.$refs.KaiPiaoDi.show(data)
    },
    getComp () {
      const comapyTypeList = []
      this.CommonCompany.forEach(item => {
        comapyTypeList.push({ value: item.id, label: item.companyName })
      })
      this.comapyTypeList = comapyTypeList
    },
    handleSizeChange () {},
    handleCurrentChange (v) {
      this.req.pageNo = v
      this.getList()
    },
    search () {
      this.req.pageNo = 1
      this.getList()
    },
    getList () {
      this.req.startTime = this.rangedata[0]
      this.req.endTime = this.rangedata[1]
      this.req.orderStatus = this.req.orderStatus === '' ? null : this.orderStatus
      getInvoiceOrderPageListApi(this.req).then(data => {
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
