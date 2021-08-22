<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      @closed='closed'
    >
      <div class="flexBox flex-col">
        <div class="item flexBox flex-row flex-middle pac-mb12x">
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">站点名称：</div>
            <div><el-input v-model='req.airportName'/></div>
          </div>
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">区县编码：</div>
            <div>
               <el-cascader
               filterable
                  v-model="req.areaCodeArr"
                  :options="options"
                  :props="{ expandTrigger: 'click',  value:'key', label: 'value', children: 'children', emitPath: false}"
                  @change="handleChange"></el-cascader>
            </div>
          </div>
        </div>
        <div class="item flexBox flex-row flex-middle pac-mb12x">
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">类型：</div>
            <div>
              <el-select v-model="req.stationType" clearable placeholder="站点类型">
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  {{ item.label }}
                </el-option>
              </el-select>
            </div>
          </div>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { addAddressBookApi, updateAddressBookApi, getRegionTreeApi } from '@/api/apilist'
import { getTypeText } from '@/utils/lib'

export default {
  name: 'adddizhi',
  props: ['comapyTypeList'],
  computed: {

  },
  data () {
    return {
      req: {
        airportName: '',
        areaCode: '',
        stationType: '',
        areaCodeArr: []
      },
      dialogVisible: false,
      id: '',
      title: '',
      typeList: getTypeText('stationType'),
      options: []
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
    handleClose () {
      this.dialogVisible = false
    },
    closed () {
      this.req = {
        airportName: '',
        areaCode: '',
        stationType: ''
      }
      this.id = ''
    },
    getRegionTree () {
      getRegionTreeApi().then(data => {
        console.log(data.content)
        this.options = data.content
      })
    },
    handleChange () {

    },
    show (c, data) {
      this.title = c
      this.getRegionTree()
      this.dialogVisible = true
      if (c === '编辑') {
        this.id = data.id
        this.req.airportName = data.airportName
        this.req.areaCode = data.areaCode
        this.req.stationType = data.stationType
        this.req.areaCodeArr = data.areaCode
      }
    },
    submit () {
      // if (this.req.areaCodeArr.length > 0) {
      //   this.req.areaCode = this.req.areaCodeArr[this.req.areaCodeArr.length - 1]
      // } else {
      //   this.req.areaCode = this.req.areaCodeArr
      // }
      this.req.areaCode = this.req.areaCodeArr
      if (!this.req.airportName || !this.req.areaCode || !this.req.stationType) {
        this.$alert('内容不可为空', '警告', {
          confirmButtonText: '确定',
          type: 'warning'

        })
        return
      }
      if (this.title !== '编辑') {
        addAddressBookApi(this.req).then(data => {
          this.$emit('success')
          this.dialogVisible = false
        })
      } else {
        this.req.id = this.id
        updateAddressBookApi(this.req).then(data => {
          this.$emit('success')
          this.dialogVisible = false
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.labelItem {
  width: 100px;
}
</style>
