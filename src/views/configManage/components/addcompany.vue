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
            <div class="labelItem"><span class='redIcon'>*</span>公司名称</div>
            <div><el-input v-model='req.companyName'/></div>
          </div>
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem"><span class='redIcon'>*</span>区县</div>
            <div>

              <el-cascader
               filterable
                  v-model="req.areaCode"
                  :options="options"
                  :props="{ expandTrigger: 'click',  value:'key', label: 'value', children: 'children', emitPath: false}"
                  ></el-cascader>
            </div>
          </div>
        </div>
        <div class="item flexBox flex-row flex-middle pac-mb12x">
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem"><span class='redIcon'>*</span>地址</div>
            <div><el-input v-model='req.address'/></div>
          </div>
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem"><span class='redIcon'>*</span>统一编码</div>
            <div>
              <el-input v-model='req.creditCode'/>
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
import { updateCompanyInfoApi, addCompanyInfoApi, getRegionTreeApi } from '@/api/apilist'
import { getTypeText } from '@/utils/lib'
export default {
  name: 'addcitycode',
  props: ['comapyTypeList'],
  computed: {

  },
  data () {
    return {
      req: {
        companyName: '',
        address: '',
        areaCode: '',
        creditCode: ''
      },
      options: [],
      dialogVisible: false,
      id: '',
      title: '',
      typeList: getTypeText('qutype')
    }
  },
  methods: {
    getTypeText,
    getRegionTree () {
      getRegionTreeApi().then(data => {
        console.log(data.content)
        this.options = data.content
      })
    },
    getComp () {
      const comapyTypeList = []
      this.comapyTypeList.forEach(item => {
        comapyTypeList.push({ value: item.id, label: item.companyName })
      })
      this.comapyTypeList = comapyTypeList
    },
    handleClose () {
      this.dialogVisible = false
    },
    closed () {
      this.req = {
        companyName: '',
        address: '',
        areaCode: '',
        creditCode: ''
      }
      this.id = ''
    },
    show (c, data) {
      this.getRegionTree()
      this.title = c

      this.dialogVisible = true
      if (c === '编辑') {
        this.id = data.id
        this.req.companyName = data.companyName
        this.req.address = data.address
        this.req.areaCode = data.areaCode
        this.req.creditCode = data.creditCode
      }
    },
    submit () {
      if (!this.req.companyName || !this.req.address || !this.req.areaCode || !this.req.creditCode) {
        this.$alert('内容不可为空', '警告', {
          confirmButtonText: '确定',
          type: 'warning'

        })
        return
      }
      if (this.title !== '编辑') {
        addCompanyInfoApi(this.req).then(data => {
          this.$emit('success')
          this.dialogVisible = false
        })
      } else {
        this.req.id = this.id
        updateCompanyInfoApi(this.req).then(data => {
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
