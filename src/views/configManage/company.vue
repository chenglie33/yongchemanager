<template>
  <div class="container-panel">
    <addcompany ref='addcompany' @success='search'/>
    <div class="flexBox flex-row flex-end">
      <el-input
        v-model="req.queryStr"
        placeholder="公司名称/信用代码"
        class="pac-pr20x"
        style="width:340px"
      ></el-input>
      <el-button type="primary" class='pac-mr12x' @click='search'>查询</el-button>
      <el-button type="primary" @click='add'>添加</el-button>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%" class="pac-mt20x">
        <el-table-column prop="companyName" label="公司名称">
        </el-table-column>
        <el-table-column prop="creditCode" label="统一信用代码">
        </el-table-column>
        <el-table-column prop="areaName" label="区县">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click='deletd(scope.row)'>删除</el-button>
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
import { getCompanyInfoPageApi, delCompanyInfoApi } from '@/api/apilist'
import addcompany from './components/addcompany.vue'

import { getTypeText } from '@/utils/lib'
export default {
  name: 'personmanage',
  components: { addcompany },
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
        queryStr: ''

      },
      total: 0,
      currentPage: 1,
      input: '',
      value1: null,
      value: null,
      options: [],
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
      getCompanyInfoPageApi(this.req).then(data => {
        this.tableData = data.content.list
        this.total = Number(data.content.pageInfo.rows)
      })
    },
    handleClick (data) {
      this.$refs.addcompany.show('编辑', data)
    },
    deletd (data) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delCompanyInfoApi({ id: data.id }).then(() => {
          this.search()
        })
      }).catch(() => {

      })
    },
    add () {
      this.$refs.addcompany.show('添加')
    }
  },
  mounted () {
    this.getList()
  }
}
</script>
<style lang="scss" scoped></style>
