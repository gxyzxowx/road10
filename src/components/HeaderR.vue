<style scoped>
.layout-logo {
  /* width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left; */
  /* position: relative; */
  /* top: 15px;
  left: 20px; */
}
.menu {
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
}
.select {
  width:250px;
  margin-top: 15px;
  /* margin-right: 990px; */

}
.r-layout-nav {
  display: flex;
  justify-content: flex-end;
  /* width: 500px; */
}
.time{
  color:#fff;
  font-size: 13px;
}
</style>
<template>
  <div>
    <Header>
      <Menu mode="horizontal" theme="dark" active-name="1" class="menu">

        <div class="layout-logo">
          <div class="time">{{time}}</div>
        </div>
        <Select v-model="choseItem" class="select" :on-change = "choseItemFun(choseItem)">
          <Option v-for="item in items" :key="item.mItemID" :value="item.mItemID" :label="item.ItemDes">
            <span>项目名：{{item.ItemDes}}</span>
            <span style="float:right;color:#ccc">项目ID:{{item.mItemID}}</span>
          </Option>
          <!-- <Option value="London" label="London">
            <span>London</span>
            <span style="float:right;color:#ccc">U.K.</span>
          </Option>
          <Option value="Sydney" label="Sydney" selected>
            <span>Sydney</span>
            <span style="float:right;color:#ccc">Australian</span>
          </Option> -->
        </Select>
        <div class="layout-nav r-layout-nav">
          <MenuItem name="1" @click.native="choseToLink(0)">
            <Icon type="ios-analytics"></Icon>进入管理
          </MenuItem>
          <!-- <MenuItem name="2" @click.native="choseToLink(1)">
            <Icon type="ios-analytics"></Icon>新建项目
          </MenuItem> -->
          <MenuItem name="3" @click.native="exit()">
            <Icon type="ios-paper"></Icon>退出登录
          </MenuItem>
        </div>
      </Menu>
    </Header>
  </div>
</template>
<script>
export default {
  name: 'HeaderR',
  data () {
    return {
      choseItem: '',
      items: [],
      time: ''
    }
  },
  created () {
    // setInterval(() => {
    //   this.writeCurrentDate()
    // }, 1000)
    // 获取用户拥有项目列表
    let obj = {
      mUserID: this.comFun.getCookie('roadmUserID')
    }
    this.comFun.post('/User/getUserItem', obj, this).then(
      rs => {
        console.log(rs)
        if (rs.code === 0) {
          this.items = rs.data
          // 取第一个复制给select,且存入vuex
          this.choseItem = rs.data[0].mItemID
          // this.choseItemFun()
          return false
        } else {
        }
      },
      err => {
        console.log(err)
      }
    )
  },
  methods: {
    exit () {
      // 删除cookie数据并跳转到Login
      console.log('exit')
      this.comFun.delectCookie('roadmUserID')
      this.$router.push({ name: 'login' })
    },
    choseToLink (type) {
      // 0进入总控制台,1新建项目，发送给父级Home.vue
      this.$emit('choseToLink', type)
    },
    // 切换项目的时候
    choseItemFun (val) {
      this.$store.commit('setItem', this.choseItem)
      // 重新渲染组件（发送给父级组件）
      console.log(val + '切换项目了')
      this.$emit('reloadControl')
      return false
    },
    // 获取今日时间
    writeCurrentDate () {
      var now = new Date()
      var year = now.getFullYear() // 得到年份
      var month = now.getMonth()// 得到月份
      var date = now.getDate()// 得到日期
      var day = now.getDay()// 得到周几
      var hour = now.getHours()// 得到小时
      var minu = now.getMinutes()// 得到分钟
      var sec = now.getSeconds()// 得到秒
      var MS = now.getMilliseconds()// 获取毫秒
      var week
      month = month + 1
      if (month < 10) month = '0' + month
      if (date < 10) date = '0' + date
      if (hour < 10) hour = '0' + hour
      if (minu < 10) minu = '0' + minu
      if (sec < 10) sec = '0' + sec
      if (MS < 100) MS = '0' + MS
      var arrWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      week = arrWeek[day]
      var time = ''
      time = year + '年' + month + '月' + date + '日' + ' ' + hour + ':' + minu + ':' + sec + ' ' + week
      // 当前日期赋值给当前日期输入框中（jQuery easyUI）
      this.time = time
      // 设置得到当前日期的函数的执行间隔时间，每1000毫秒刷新一次。
    }

  }
}
</script>
