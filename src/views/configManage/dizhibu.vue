<template>
  <div class="container-panel">
    <AddDizhi ref='AddDizhi' @success='search'/>
    <div class="flexBox flex-row flex-end">
      <el-input
        v-model="req.airpointName"
        placeholder="站点名称"
        class="pac-pr20x"
        style="width:340px"
      ></el-input>
      <el-select v-model="req.stationType" clearable placeholder="站点类型" class="pac-pr20x">
        <el-option
          v-for="item in statinlist"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          {{ item.label }}
        </el-option>
      </el-select>
      <el-button type="primary" class='pac-mr12x' @click='search'>查询</el-button>
      <el-button type="primary" @click='add'>添加</el-button>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%" class="pac-mt20x">
        <el-table-column fixed prop="airportName" label="站点名称" width="150">
        </el-table-column>
        <el-table-column prop="areaCode" label="区县" >
        </el-table-column>
        <el-table-column prop="areaName" label="区县名称" >
        </el-table-column>
        <el-table-column prop="stationType" label="站点类型" >
          <template slot-scope="scope">
            <div>{{getTypeText('stationType', scope.row.stationType)}}</div>
          </template>
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
import { getAddressBookPageListApi, delAddressBookApi } from '@/api/apilist'
import AddDizhi from './components/AddDizhi.vue'
import { getTypeText } from '@/utils/lib'

export default {
  name: 'dizhibu',
  components: { AddDizhi },
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
        airpointName: '',
        stationType: null

      },
      total: 0,
      statinlist: getTypeText('stationType'),
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
      getAddressBookPageListApi(this.req).then(data => {
        this.tableData = data.content.list
        this.total = Number(data.content.pageInfo.rows)
      })
    },
    handleClick (data) {
      this.$refs.AddDizhi.show('编辑', data)
    },
    deletd (data) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delAddressBookApi({ id: data.id }).then(() => {
          this.search()
        })
      }).catch(() => {

      })
    },
    add () {
      this.$refs.AddDizhi.show('添加')
    }
  },
  mounted () {
    this.getList()
  }
}
</script>
<style lang="scss" scoped></style>
