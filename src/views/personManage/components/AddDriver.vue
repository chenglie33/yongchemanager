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
            <div class="labelItem"><span class='redIcon'>*</span>司机姓名：</div>
            <div><el-input v-model='req.name'/></div>
          </div>
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem"><span class='redIcon'>*</span>电话：</div>
            <div>
              <el-input v-model='req.phone'/>
            </div>
          </div>
        </div>
        <div class="item flexBox flex-row flex-middle pac-mb12x">
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem"><span class='redIcon'>*</span>身份证：</div>
            <div>
              <el-input v-model='req.idNumber'/>
            </div>
          </div>
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem"><span class='redIcon'>*</span>公司：</div>
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

        </div>
        <div class="item flexBox flex-row flex-middle pac-mb12x">
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">负责人：</div>
            <div><el-input v-model='req.chargePerson'/></div>
          </div>
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">负责人电话：</div>
            <div>
              <el-input v-model='req.chargePersonPhone'/>
            </div>
          </div>
        </div>
        <div class="item flexBox flex-row flex-middle pac-mb12x">
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem"><span class='redIcon'>*</span>照片：</div>
            <div>
              <el-upload
                class="upload-demo"
                action="/ht-api/file/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success='uploadsuccess'
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
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
import { addDriverInfoApi, updateDriverInfoApi } from '@/api/apilist'
export default {
  name: 'dialogcar',
  props: ['comapyTypeList'],
  computed: {

  },
  data () {
    return {
      req: {
        companyId: null,
        idNumber: '',
        name: '',
        phone: '',
        photo: '',
        chargePerson: '',
        chargePersonPhone: ''
      },
      dialogVisible: false,
      id: '',
      title: '',
      fileList: []
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
    },
    handlePreview (file) {
      console.log(file)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    uploadsuccess (response, file, fileList) {
      this.fileList.push({ name: response.content.name, url: response.content.url })
      console.log(response, file, fileList)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handleClose () {
      this.dialogVisible = false
    },
    closed () {
      this.req = {
        companyId: null,
        idNumber: '',
        name: '',
        phone: '',
        photo: '',
        chargePerson: '',
        chargePersonPhone: ''
      }
      this.id = ''
    },
    show (c, data) {
      // this.getComp()
      this.title = c

      this.dialogVisible = true
      if (c === '编辑') {
        this.req = {
          companyId: data.companyId,
          idNumber: data.idNumber,
          name: data.name,
          phone: data.phone,
          photo: data.photo,
          chargePerson: data.chargePerson,
          chargePersonPhone: data.chargePersonPhone
        }
        this.fileList = [{ url: data.photo }]
        this.id = data.id
      }
    },
    submit () {
      if (!this.req.companyId || !this.req.idNumber || !this.req.name || !this.req.phone || !this.fileList.length) {
        this.$alert('内容不可为空', '警告', {
          confirmButtonText: '确定',
          type: 'warning'

        })
        return
      }
      var reg = /^\d{11}$/
      if (!reg.test(this.req.phone)) {
        this.$alert('请校验你的手机号码', '警告', {
          confirmButtonText: '确定',
          type: 'warning'

        })
        return
      }
      this.req.photo = this.fileList[0].url
      if (this.title !== '编辑') {
        addDriverInfoApi(this.req).then(data => {
          this.$emit('success')
          this.dialogVisible = false
        })
      } else {
        this.req.id = this.id
        updateDriverInfoApi(this.req).then(data => {
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
