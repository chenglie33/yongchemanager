<template>
  <div class="container-panel">
    <DialogCar ref='diag' :carTypeList='carTypeList' :comapyTypeList='comapyTypeList' @dataupdate='search'/>
    <div class="flexBox flex-row flex-end">
      <el-input v-model='req.carNum' placeholder="车牌号码" class='w120x pac-mr12x'/>
      <el-select v-model="req.carType" placeholder="车辆类型" class="pac-pr20x">
        <el-option
          v-for="item in carTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          {{ item.label }}
        </el-option>
      </el-select>
      <!-- <el-date-picker
        class="pac-pr20x"
        clearable
        v-model="value1"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
      <el-input
        v-model="input"
        placeholder="输入订单编号/驾驶员/关键字"
        class="pac-pr20x"
        style="width:340px"
      ></el-input> -->
      <el-button type="primary" @click='getcar'>查询</el-button>
      <el-button type="primary" @click='add'>添加车辆</el-button>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%" class="pac-mt20x">
        <el-table-column fixed prop="carNum" label="车牌号" >
        </el-table-column>
        <el-table-column prop="carType" label="车型" >
          <template slot-scope="scope">
            <div>{{getTypeText('carType',scope.row.carType)}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="companyId" label="企业名称" >

          <template slot-scope="scope">
            <div>{{getTypeTextRemote(comapyTypeList,scope.row.companyId)}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="carPicture" label="车辆照片" >
          <template slot-scope="scope">
            <div><el-image v-for='item in scope.row.imglist' :key='item' class='imgthum'
                :src="item"
                :preview-src-list="scope.row.imglist"/></div>
          </template>

        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">

            <el-button type="text" size="small" @click='edit(scope.row)'>编辑</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >历史行程</el-button
            >
             <el-button type="text" size="small" @click='deleteD(scope.row)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="flexBox flex-end pac-mt12x">

      <el-pagination
        @size-change="handleSizeChange"
         background
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
import { getCarInfoPageListApi, delCarInfoApi } from '@/api/apilist'
import { getTypeText, getTypeTextRemote } from '@/utils/lib'
import DialogCar from './components/DialogCar.vue'
import { mapState } from 'vuex'

export default {
  name: 'carmanage',
  components: { DialogCar },
  data () {
    return {
      comapyTypeList: [],
      req: {
        pageNo: 1,
        pageSize: 50
      },
      total: 0,
      currentPage: 1,
      input: '',
      value1: null,
      value: null,
      carTypeList: getTypeText('carType'),
      tableData: [
      ]
    }
  },
  computed: mapState([
  // 映射 this.count 为 store.state.count
    'CommonCompany', 'CommonDriver', 'CommonOrder'
  ]),
  methods: {
    getTypeTextRemote,
    getTypeText,
    handleSizeChange () {},
    handleCurrentChange (v) {
      this.req.pageNo = v
      this.getcar()
    },
    add () {
      this.$refs.diag.show('添加')
    },
    edit (data) {
      this.$refs.diag.show('编辑', data)
    },
    search () {
      this.req.pageNo = 1
      this.getcar()
    },
    deleteD (data) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delCarInfoApi({ id: data.id }).then(() => {
          this.req.pageNo = 1
          this.getcar()
        })
      }).catch(() => {

      })
    },
    handleClick (data) {
      this.$router.push({ name: 'his', params: { data } })
    },
    getcar () {
      getCarInfoPageListApi(this.req).then(data => {
        const comapyTypeList = []
        let list = []
        this.CommonCompany.forEach(item => {
          comapyTypeList.push({ value: item.id, label: item.companyName })
        })
        list = data.content.list.map(item => {
          // let imglist = []
          if (item.carPicture) {
            item.imglist = item.carPicture.split(',')
            // imglist.push()
          }
          return item
        })
        this.comapyTypeList = comapyTypeList
        this.tableData = list
        this.total = Number(data.content.pageInfo.rows)
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.getcar()
    }, 10)
  }
}
</script>
<style lang="scss" scoped>
.imgthum{
  width: 50px;
  height: 50px;
}
</style>
