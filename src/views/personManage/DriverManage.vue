<template>
  <div class="container-panel">
    <AddDriver ref='AddDriver' @success='search' :comapyTypeList='comapyTypeList'/>
    <div class="flexBox flex-row flex-end">
      <el-select v-model="req.companyId" clearable placeholder="公司" class="pac-pr20x">
        <el-option
          v-for="item in comapyTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          {{ item.label }}
        </el-option>
      </el-select>
      <el-select v-model="req.orderStatus" clearable placeholder="状态" class="pac-pr20x">
        <el-option
          v-for="item in orderList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          {{ item.label }}
        </el-option>
      </el-select>
      <el-input
        v-model="req.driverName"
        placeholder="司机"
        class="pac-pr20x"
        style="width:340px"
      ></el-input>
      <el-button type="primary" class='pac-mr12x' @click='search'>查询</el-button>
       <el-button type="primary" class='pac-mr12x' @click='adddriver'>添加</el-button>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%" class="pac-mt20x">
        <el-table-column fixed prop="name" label="姓名" width="150">
        </el-table-column>
        <el-table-column prop="companyName" label="企业" >
        </el-table-column>
        <el-table-column prop="development" label="部门" >
        </el-table-column>
        <el-table-column prop="idNumber" label="身份证" >
        </el-table-column>
        <el-table-column prop="phone" label="电话" >
        </el-table-column>
        <el-table-column prop="status" label="状态" >
          <template slot-scope="scope">
            <div>{{getTypeText('driverStatus', scope.row.status)}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="photo" label="照片" >
          <template slot-scope="scope">
             <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.photo"
              :preview-src-list="[scope.row.photo]"/>
          </template>
        </el-table-column>
        <el-table-column prop="chargePerson" label="负责人" >
        </el-table-column>
        <el-table-column prop="chargePersonPhone" label="负责人电话" >
        </el-table-column>
         <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small"
            @click='editRow(scope.row)'
              >编辑</el-button
            >
            <el-button type="text" size="small"  @click='deletd(scope.row)'>删除</el-button>
          </template>
         </el-table-column>

      </el-table>
    </div>
    <div class="flexBox flex-end pac-mt12x">
      <el-pagination
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
import { mapState } from 'vuex'
import { getDriverInfoPageListApi, delDriverInfoApi } from '@/api/apilist'
import AddDriver from './components/AddDriver.vue'
import { getTypeText } from '@/utils/lib'
export default {
  name: 'drivermanager',
  components: { AddDriver },
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
    return {
      req: {
        pageNo: 1,
        pageSize: 10,
        companyId: null,
        driverName: '',
        orderStatus: null

      },
      total: 0,
      orderList: getTypeText('driverStatus'),
      tableData: [],
      comapyTypeList: []
    }
  },
  methods: {
    getTypeText,
    deletd (data) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delDriverInfoApi({ id: data.id }).then(() => {
          this.search()
        })
      }).catch(() => {

      })
    },
    adddriver () {
      this.$refs.AddDriver.show('添加')
    },
    getComp () {
      const comapyTypeList = []
      this.CommonCompany.forEach(item => {
        comapyTypeList.push({ value: item.id, label: item.companyName })
      })
      console.log(comapyTypeList)
      this.comapyTypeList = comapyTypeList
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
      getDriverInfoPageListApi(this.req).then(data => {
        console.log(data)
        this.tableData = data.content.list
        this.total = Number(data.content.pageInfo.rows)
      })
    },

    editRow (data) {
      this.$refs.AddDriver.show('编辑', data)
    }
  },
  mounted () {
    this.getList()
    this.getComp()
  }
}
</script>
<style lang="scss" scoped></style>
