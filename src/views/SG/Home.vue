<template>
  <div>
施工监管
  </div>
</template>
<script>
export default {
  data () {
    return {
      chartsdata: ''
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.$store.state.itemInfo.id,
        mDevSn: 2019000002
      }
      this.comFun.post('/Locus/getNyDataTest', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 处理数据
          this.chartsdata = this.handleChartsData(rs.data)
        } else {
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    },
    handleChartsData (data) {

    }
  }
}
</script>
