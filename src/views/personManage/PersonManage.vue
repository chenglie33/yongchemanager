<template>
  <div class="container-panel">
    <AddUser ref='AddUser' @success='search' :comapyTypeList='comapyTypeList'/>
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
      <el-input
        v-model="req.userName"
        placeholder="用户名"
        class="pac-pr20x"
        style="width:340px"
      ></el-input>
      <el-button type="primary" class='pac-mr12x' @click='search'>查询</el-button>
      <el-button type="primary" @click='add'>添加</el-button>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%" class="pac-mt20x">
        <el-table-column fixed prop="userName" label="用户名" width="150">
        </el-table-column>
        <el-table-column prop="companyName" label="公司" >
        </el-table-column>
        <el-table-column prop="phoneNum" label="电话" >
        </el-table-column>
        <el-table-column prop="userType" label="角色" >
          <template slot-scope="scope">
            <div>{{getTypeText('userType', scope.row.userType)}}</div>
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
import { getSysUserPageListApi, delSysUserApi } from '@/api/apilist'
import AddUser from './components/AddUser.vue'
import { getTypeText } from '@/utils/lib'
export default {
  name: 'personmanage',
  components: { AddUser },
  computed: {

    ...mapState([
      'CommonCompany', 'CommonDriver', 'CommonOrder'
    ])
  },
  watch: {
    CommonCompany (v) {
      this.getComp()
    }
  },
  data () {
    return {
      req: {
        pageNo: 1,
        pageSize: 10,
        companyId: null,
        userName: ''

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
      getSysUserPageListApi(this.req).then(data => {
        this.tableData = data.content.list
        this.total = Number(data.content.pageInfo.rows)
      })
    },
    handleClick (data) {
      this.$refs.AddUser.show('编辑', data)
    },
    deletd (data) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delSysUserApi({ id: data.id }).then(() => {
          this.search()
        })
      }).catch(() => {

      })
    },
    add () {
      this.$refs.AddUser.show('添加')
    }
  },
  mounted () {
    this.getList()
    this.getComp()
  }
}
</script>
<style lang="scss" scoped></style>
