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
            <div class="labelItem">车牌号：</div>
            <div><el-input v-model="req.carNum" /></div>
          </div>
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">车型：</div>
            <div>
              <el-select
                v-model="req.carType"
                placeholder="车辆类型"
                class="pac-pr20x"
              >
                <el-option
                  v-for="item in carTypeList"
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
        <div class="item flexBox flex-row flex-middle  pac-mb12x">
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">公司：</div>
            <div><el-select
                v-model="req.companyId"
                placeholder="车辆类型"
                class="pac-pr20x"
              >
                <el-option
                  v-for="item in comapyTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  {{ item.label }}
                </el-option>
              </el-select></div>

          </div>
          <div class="flex-1 flexBox flex-row flex-middle">
                <div class="labelItem">负责人：</div>
                <div><el-input v-model="req.chargePerson" /></div>
              </div>

        </div>
        <div class="item flexBox flex-row flex-middle  pac-mb12x">
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">负责人电话：</div>
            <div><el-input v-model="req.chargePersonPhone" /></div>
          </div>
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">sim：</div>
            <div><el-input v-model="req.sim" /></div>
          </div>
        </div>

        <div class="item flexBox flex-row flex-middle  pac-mb12x">
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">部门：</div>
            <div><el-input v-model="req.development" /></div>
          </div>
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">座位数：</div>
            <div><el-input v-model="req.siteNum" /></div>
          </div>
        </div>

        <div class="item flexBox flex-row flex-middle  pac-mb12x">
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">车品牌：</div>
            <div><el-input v-model="req.carTypeDetails" /></div>
          </div>
        </div>
        <div class="item flexBox flex-row flex-middle  pac-mb12x">
          <div class="flex-1 flexBox flex-row flex-middle">
            <div class="labelItem">车辆照片：</div>
            <div>
              <el-upload
  class="upload-demo"
  action="/ht-api/file/upload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  :on-success='uploadsuccess'
  multiple
  :limit="3"
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
import { addCarInfoApi, updateCarInfoApi } from '@/api/apilist'
export default {
  name: 'dialogcar',
  props: ['carTypeList', 'comapyTypeList'],
  data () {
    return {
      req: {
        carNum: '',
        carType: '',
        carTypeDetails: '',
        chargePerson: '',
        chargePersonPhone: '',
        companyId: '',
        development: '',
        sim: '',
        siteNum: '',
        fileList: []
      },
      dialogVisible: false,
      id: '',
      title: '',
      fileList: [],
      carNum: ''
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
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    uploadsuccess (response, file, fileList) {
      this.fileList.push({ name: response.content.name, url: response.content.url })
      console.log(response, file, fileList)
    },
    handleClose () {
      this.dialogVisible = false
    },
    closed () {
      this.fileList = []
      this.req = {}
      this.id = ''
    },
    show (c, data) {
      console.log(11)
      this.title = c

      this.dialogVisible = true
      if (c === '编辑') {
        this.id = data.id
        var datacopy = JSON.parse(JSON.stringify(data))
        this.req.carNum = data.carNum
        this.req.carType = datacopy.carType
        this.req.carTypeDetails = datacopy.carTypeDetails
        this.req.chargePerson = datacopy.chargePerson
        this.req.chargePersonPhone = datacopy.chargePersonPhone
        this.req.companyId = datacopy.companyId
        this.req.development = datacopy.development
        this.req.sim = datacopy.sim
        this.req.siteNum = datacopy.siteNum
        // this.req = {}
        const filelist = datacopy.imglist.map((item, index) => {
          console.log(item.split('pic'))
          const url = `pic${item.split('pic')[1]}`
          return {
            name: `img${index}`,
            url: url
          }
        })
        this.fileList = filelist
      }
    },
    submit () {
      if (!this.req.carNum || !this.req.carType || !this.req.carTypeDetails || !this.req.chargePerson || !this.req.chargePersonPhone || !this.req.companyId || !this.req.development || !this.req.siteNum || !this.req.sim || this.fileList.length === 0) {
        this.$alert('内容不可为空', '警告', {
          confirmButtonText: '确定',
          type: 'warning'

        })
        return
      }
      let carPicture = ''
      this.fileList.forEach(item => {
        carPicture += item.url + ','
      })
      this.req.carPicture = carPicture.slice(0, carPicture.length - 1)
      if (this.title === '编辑') {
        this.req.id = this.id
        updateCarInfoApi(this.req).then(data => {
          this.dialogVisible = false
          this.$emit('dataupdate')
        }).catch(err => {
          console.log(err)
        })
      } else {
        addCarInfoApi(this.req).then(data => {
          this.dialogVisible = false
          this.$emit('dataupdate')
        }).catch(err => {
          console.log(err)
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
