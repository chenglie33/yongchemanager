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
            <div class="labelItem">地址1：</div>
            <div>

               <el-cascader
               filterable
                  v-model="req.address1"
                  :options="addressList"
                  :props="{ expandTrigger: 'click',  value:'key', label: 'value', children: 'children', emitPath: false}"
                  ></el-cascader>
            </div>
          </div>
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">地址2：</div>
            <div>
              <!-- <el-input v-model='req.address2'/> -->
              <el-cascader
               filterable
                  v-model="req.address2"
                  :options="addressList"
                  :props="{ expandTrigger: 'click',  value:'key', label: 'value', children: 'children', emitPath: false}"
                  ></el-cascader>
            </div>
          </div>
        </div>
        <div class="item flexBox flex-row flex-middle pac-mb12x">
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">费用类型：</div>
            <div>
              <el-select v-model="req.configType" clearable placeholder="类型">
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
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">费用：</div>
            <div>
              <el-input v-model='req.cost'/>
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
import { updateCostConfigureApi, addCostConfigureApi, getRegionTreeApi } from '@/api/apilist'
import { getTypeText } from '@/utils/lib'
export default {
  name: 'friyong',
  props: ['comapyTypeList'],
  computed: {

  },
  data () {
    return {
      req: {
        address1: '',
        address2: '',
        configType: '',
        cost: ''
      },
      dialogVisible: false,
      id: '',
      title: '',
      typeList: getTypeText('configType'),
      addressList: []
    }
  },
  methods: {
    getTypeText,
    getaddressList () {
      getRegionTreeApi().then(data => {
        console.log(data.content)
        this.addressList = data.content
      })
    },
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
        address1: '',
        address2: '',
        configType: '',
        cost: ''
      }
      this.id = ''
    },
    show (c, data) {
      this.title = c
      this.getaddressList()
      this.dialogVisible = true
      if (c === '编辑') {
        this.id = data.id
        this.req.address1 = data.address1
        this.req.address2 = data.address2
        this.req.cost = data.cost

        this.req.configType = Number(data.configType)
      }
    },
    submit () {
      if (!this.req.address1 || !this.req.address2 || !this.req.configType || !this.req.cost) {
        this.$alert('内容不可为空', '警告', {
          confirmButtonText: '确定',
          type: 'warning'

        })
        return
      }
      if (this.title !== '编辑') {
        addCostConfigureApi(this.req).then(data => {
          this.$emit('success')
          this.dialogVisible = false
        })
      } else {
        this.req.id = this.id
        updateCostConfigureApi(this.req).then(data => {
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
