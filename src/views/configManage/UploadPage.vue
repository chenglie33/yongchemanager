<template>
  <div class="container-panel">
    <el-upload
  class="upload-demo"
    action="/ht-api/file/upload"
  :on-remove="handleRemove"
  :on-success='uploadsuccess'
    list-type="picture"
  :file-list="fileList">
  <el-button size="small" type="primary">选择图片</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
<el-button @click='save'>保存</el-button>
    <!-- <el-table :data="tableData">
      <el-table-column ></el-table-column>
    </el-table> -->
  </div>
</template>

<script>
import { getXcxPicApi, uploadXcxPicApi } from '@/api/apilist'
export default {
  name: 'uploadpage',
  data () {
    return {
      tableData: [],
      fileList: [],
      listArr: []
    }
  },
  mounted () {
    this.getXcxPic()
  },
  methods: {
    handleRemove (file, fileList) {
      this.fileList = fileList
      this.listArr = []
      fileList.forEach(item => {
        if (item.response) {
          this.listArr.push(item.response.content.url)
        } else {
          this.listArr.push('pic' + item.url.split('pic')[1])
        }
      })
    },
    uploadsuccess (response, file, fileList) {
      // this.fileList.push({ name: response.content.name, url: response.content.url })
      this.listArr.push(response.content.url)
    },
    save () {
      uploadXcxPicApi({ value: this.listArr.toString() }).then(data => {
        if (data.content === true) {
          alert('成功')
          this.getXcxPic()
        } else {
          alert('失败')
        }
      })
    },
    getXcxPic () {
      getXcxPicApi().then(data => {
        this.fileList = []
        this.listArr = []
        data.content.forEach(item => {
          this.listArr.push(item.uri)
          this.fileList.push({ url: item.url })
        })
      })
    }
  }

}
</script>

<style>

</style>
