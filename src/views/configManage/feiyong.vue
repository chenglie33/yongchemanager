<template>
  <div class="container-panel">
    <div class="flexBox flex-row flex-end">
      <el-input
        v-model="req.addressName1"
        placeholder="开始地址"
        class="pac-pr20x"
        style="width:340px"
      ></el-input>
      <el-input
        v-model="req.addressName2"
        placeholder="到达地址"
        class="pac-pr20x"
        style="width:340px"
      ></el-input>
      <el-select v-model="req.configType" clearable placeholder="站点类型" class="pac-pr20x">
        <el-option
          v-for="item in configTypelist"
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
        <el-table-column fixed prop="address1" label="地点1" width="150">
        </el-table-column>
        <el-table-column prop="address2" label="地点2" >
        </el-table-column>
        <el-table-column prop="addressName1" label="开始地址名称" >
        </el-table-column>
        <el-table-column prop="addressName2" label="结束地址名称" >
        </el-table-column>
        <el-table-column prop="cost" label="费用" >
        </el-table-column>
        <el-table-column prop="configType" label="结束地址名称" >
          <template slot-scope="scope">
            <div>{{getTypeText('configType', scope.row.configType)}}</div>
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
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getCostConfigurePageListApi } from '@/api/apilist'

import { getTypeText } from '@/utils/lib'
export default {
  name: 'feiyong',
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
        companyId: null,
        addressName1: '',
        addressName2: '',
        configType: null

      },
      total: 0,
      configTypelist: getTypeText('configType'),
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
      getCostConfigurePageListApi(this.req).then(data => {
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
        // delSysUserApi({ id: data.id }).then(() => {
        //   this.search()
        // })
      }).catch(() => {

      })
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
