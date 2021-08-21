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
            <div class="labelItem">用户名：</div>
            <div><el-input v-model='req.userName'/></div>
          </div>
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">登录账号：</div>
            <div>
              <el-input v-model='req.loginNumber'/>
            </div>
          </div>
        </div>
        <div class="item flexBox flex-row flex-middle pac-mb12x">
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">公司：</div>
            <div>
              <el-select v-model="req.companyId" clearable placeholder="公司">
                <el-option
                  v-for="item in comapyTypeList"
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
            <div class="labelItem">电话：</div>
            <div>
              <el-input v-model='req.phoneNum'/>
            </div>
          </div>
        </div>
        <div class="item flexBox flex-row flex-middle pac-mb12x">
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">密码：</div>
            <div><el-input v-model='req.password'/></div>
          </div>
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">角色：</div>
            <div><el-select v-model="req.userType" clearable placeholder="角色">
                <el-option

                  label="超级管理员"
                  :value=1
                >
                  超级管理员
                </el-option>
                <el-option

                  label="企业用户"
                  :value=2
                >
                  企业用户
                </el-option>
              </el-select></div>
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
import { addSysUserApi, updateSysUserApi } from '@/api/apilist'
export default {
  name: 'dialogcar',
  props: ['comapyTypeList'],
  computed: {

  },
  data () {
    return {
      req: {
        companyId: null,
        loginNumber: '',
        password: '',
        phoneNum: '',
        userName: '',
        userType: null
      },
      dialogVisible: false,
      id: '',
      title: ''
    }
  },
  methods: {
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
      this.req = {}
      this.id = ''
    },
    show (c, data) {
      this.title = c

      this.dialogVisible = true
      if (c === '编辑') {
        this.id = data.id
        this.req.userName = data.userName
        this.req.companyId = data.companyId
        this.req.phoneNum = data.phoneNum
        this.req.loginNumber = data.loginNumber
        this.req.password = data.password
        this.req.userType = data.userType
      }
    },
    submit () {
      if (!this.req.userName || !this.req.companyId || !this.req.password || !this.req.phoneNum || !this.req.loginNumber || !this.req.userType) {
        this.$alert('内容不可为空', '警告', {
          confirmButtonText: '确定',
          type: 'warning'

        })
        return
      }
      if (this.title !== '编辑') {
        addSysUserApi(this.req).then(data => {
          this.$emit('success')
          this.dialogVisible = false
        })
      } else {
        this.req.id = this.id
        updateSysUserApi(this.req).then(data => {
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
