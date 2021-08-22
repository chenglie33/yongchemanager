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
            <div class="labelItem">区县：</div>
            <div><el-input v-model='req.areaName'/></div>
          </div>
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">区县编码：</div>
            <div>
              <el-input v-model='req.areaCode'/>
            </div>
          </div>
        </div>
        <div class="item flexBox flex-row flex-middle pac-mb12x">
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">父级编码：</div>
            <div>
              <el-input v-model='req.parentCode'/>
            </div>
          </div>
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">类型：</div>
            <div>
              <el-select v-model="req.type" clearable placeholder="类型">
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
        <div class="item flexBox flex-row flex-middle pac-mb12x">
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">排序：</div>
            <div><el-input v-model='req.sort'/></div>
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
import { updateRegionApi, addRegionApi } from '@/api/apilist'
import { getTypeText } from '@/utils/lib'
export default {
  name: 'addcitycode',
  props: ['comapyTypeList'],
  computed: {

  },
  data () {
    return {
      req: {
        areaCode: '',
        areaName: '',
        parentCode: '',
        sort: '',
        type: ''
      },
      dialogVisible: false,
      id: '',
      title: '',
      typeList: getTypeText('qutype')
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
        areaCode: '',
        areaName: '',
        parentCode: '',
        sort: '',
        type: ''
      }
      this.id = ''
    },
    show (c, data) {
      this.title = c

      this.dialogVisible = true
      if (c === '编辑') {
        this.id = data.id
        this.req.areaCode = data.areaCode
        this.req.areaName = data.areaName
        this.req.parentCode = data.parentCode
        this.req.sort = data.sort
        this.req.type = Number(data.type)
      }
    },
    submit () {
      if (!this.req.areaCode || !this.req.areaName || (this.req.type !== 1 && !this.req.parentCode) || !this.req.type || !this.req.sort) {
        this.$alert('内容不可为空', '警告', {
          confirmButtonText: '确定',
          type: 'warning'

        })
        return
      }
      if (this.title !== '编辑') {
        addRegionApi(this.req).then(data => {
          this.$emit('success')
          this.dialogVisible = false
        })
      } else {
        this.req.id = this.id
        updateRegionApi(this.req).then(data => {
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
