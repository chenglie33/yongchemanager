<template>
  <div class="container-panel">
    <div class="flexBox flex-row flex-end">

      <el-input
        v-model="req.userName"
        placeholder="司机"
        class="pac-pr20x"
        style="width:340px"
      ></el-input>
      <el-button type="primary" class='pac-mr12x' @click='search'>查询</el-button>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%" class="pac-mt20x">
        <el-table-column fixed prop="name" label="用户名" width="150">
        </el-table-column>
        <el-table-column prop="phone" label="电话" >
        </el-table-column>
        <el-table-column prop="development" label="部门" >
        </el-table-column>
        <el-table-column prop="otherPhone" label="引流用户电话" >
        </el-table-column>

        <el-table-column prop="userType" label="用户类型" >
          <template slot-scope="scope">
            <div>{{getTypeText('wxuserType', scope.row.userType)}}</div>
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
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getWxUserPageListApi } from '@/api/apilist'

import { getTypeText } from '@/utils/lib'
export default {
  name: 'weixinmanage',
  components: { },
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
        pageSize: 50,
        userName: ''

      },
      total: 0,
      orderList: getTypeText('driverStatus'),
      tableData: [],
      comapyTypeList: []
    }
  },
  methods: {
    getTypeText,
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
      getWxUserPageListApi(this.req).then(data => {
        console.log(data)
        this.tableData = data.content.list
        this.total = Number(data.content.pageInfo.rows)
      })
    },
    handleClick (data) {
      this.$refs.AddUser.show('编辑', data)
    },
    add () {
      this.$refs.AddUser.show('添加')
    }
  },
  mounted () {
    this.getList()
  }
}
</script>
<style lang="scss" scoped></style>
