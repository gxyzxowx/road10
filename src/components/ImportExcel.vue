<template>
  <div>
    <Upload
        ref="upload"
        action="/api/book/excel/import"
        name="excel-file"
        :show-upload-list="true"
        :on-format-error="handleFormatError"
        :on-success="handleSuccess"
        :on-error="handleError"
        :format ="['xlsx','xls']">
            <Button type="info" icon="ios-cloud-upload-outline">批量导入</Button>
    </Upload>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传.xls,.xlsx文件。'
      })
    },
    handleSuccess (res, file) {
      if (res.errcode === 0) {
        this.dialoLead = false
        this.$Message.success('数据导入成功！')
        this._getBookList()
        this.$refs.upload.clearFiles()
      }
    },
    handleError (error, file) {
      console.log(error)
      console.log(file)
      this.$Message.error('数据导入失败！')
    }
  }
}
</script>
