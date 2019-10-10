<style lang="scss" scoped>
</style>
<style scoped lang="less">
.layout .header {
  // height: 385px;
  background-image: url(~@/assets/img/top.png);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 1920px 85px;
}
.control-body {
  height: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  .time {
    width: 470px;
    margin-top: 80px;
    span{
      padding:6px 14px;
      font-size:18px;
      font-family:Source Han Sans CN;
      font-weight:400;
      color: rgba(255,255,255,.71);
      line-height:41px;
      margin-left: 130px;
      height:41px;
      background:rgba(24,56,98,1);
      border:1px solid rgba(32, 64, 129, 1);
      border-radius:21px;
    }
  }
  .mid {
    flex:1;
    .select {
      position: relative;
      margin:0 150px;
      .beautiful {
        padding: 10px 20px;
        position: absolute;
        width: 100%;
        top: 5px;
        text-align: center;
        background: #122a4e;
        pointer-events: none;
        span {

          font-size: 36px;
          color:#E5F5FF;
          background-image: -webkit-linear-gradient(bottom, #93C2F5,  #E5F5FF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 700;
        // text-shadow: 1px 1px 1px #666, 3px 3px 8px black;
        }

      }
    }
    .btns {
      margin-top: 72px;
      display: flex;
      justify-content: space-around;
      .btn {
        cursor: pointer;
        width:263px;
        height:73px;
        background:linear-gradient(to right,rgba(54,94,165,0),rgba(34,136,214,.7),rgba(54,94,165,0));
        border:2px solid rgba(15, 93, 155, .71);
        .texts{
          margin-top: 10px;
          text-align: center;
          span{
            font-family: "Hiragino Sans GB";
            font-size:36px;
            font-weight:500;
            background:linear-gradient(0deg,rgba(229,245,255,1) 0%, rgba(147,194,245,1) 100%);
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
            vertical-align:middle;
          }
          img{
            vertical-align:middle;
            width: 48px;
            height: 48px;
            margin-right: 6px;
          }
        }
      }
    }
  }
  .right {
     width: 470px;
     box-sizing: border-box;
     padding: 0 100px;
     margin-top: 80px;

    display: flex;
    justify-content: space-around;
    .exit,.manage{
      padding:8px 12px;
      text-align: center;
      height:41px;
      background:rgba(24,56,97,1);
      border:1px solid rgba(32, 64, 129, 1);
      border-radius:21px;
      cursor: pointer;
    }
    .texts{
      img{
        width: 20px;
        height: 20px;
        margin-right: 5px;
         vertical-align:middle;
      }
      span{
        color:rgba(255,255,255,.71);
        font-size: 19px;
         vertical-align:middle;
      }
    }
  }
}
</style>
<template>
  <div class="layout" style="height:100%">
    <Layout style="height:100%; background: #050926;">
      <!-- <HeaderR @reloadControl="reloadControl" @choseToLink="choseToLink" ></HeaderR> -->
      <div class="header">
        <div class="time"><span>{{settime}}</span></div>
        <div class="mid">
          <!-- 下拉框和选择按钮3个 -->
          <div class="select">
            <Select v-model="choseItem" style="margin-top:15px;" @on-change="choseItemFun(choseItem)">
              <Option
                v-for="item in items"
                :key="item.mItemID"
                :value="item.mItemID"
                :label="item.ItemDes"
              >
                <span>项目名：{{item.ItemDes}}</span>
                <span style="float:right;color:#ccc">项目ID:{{item.mItemID}}</span>
              </Option>
            </Select>
            <div class="beautiful">
              <span>{{choseItemName}}</span>
            </div>
          </div>
          <div class="btns">
            <div class="btn" @click="linkTo('/control')"><div class="texts"><img src="~@/assets/img/zl.png" alt=""><span>项目总览</span></div></div>
            <div class="btn" @click="linkTo('/sc')"><div class="texts"><img src="~@/assets/img/zl.png" alt=""><span>生产监管</span></div></div>
            <div class="btn" @click="linkTo('/sg')"> <div class="texts"><img src="~@/assets/img/zl.png" alt=""><span>施工监管</span></div></div>
          </div>
        </div>
        <div class="right">
          <!-- 进入管理和退出 -->
          <div class="manage"><div class="texts"><img src="~@/assets/img/manage.png" alt=""><span>进入管理</span></div></div>
          <div class="exit" @click="exit()"><div class="texts"><img src="~@/assets/img/exit.png" alt=""><span>退出</span></div></div>
        </div>
      </div>
      <router-view v-if="showView" />
    </Layout>
  </div>
</template>
<script>
// import HeaderR from '@/components/HeaderR.vue'

export default {
  data () {
    return {
      choseItem: '',
      choseItemName: '',
      items: [],
      settime: '',
      showView: true
    }
  },
  created () {
    this.$router.push('/control')
    setInterval(() => {
      this.getCurrentDate()
    }, 1000)
  },
  mounted () {
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
          this.choseItemName = rs.data[0].ItemDes
          let itemInfo = [this.choseItem, this.choseItemName]
          this.$store.commit('setItem', itemInfo)
          return false
        } else {
        }
      },
      err => {
        console.log(err)
      }
    )
  },
  computed: {},
  methods: {
    // 切换项目的时候
    choseItemFun (val) {
      // val为项目id
      // 更换项目名字的样式
      let choseName = this.items.filter((item, index, array) => {
        return item.mItemID === val
      })
      choseName = choseName[0].ItemDes
      this.choseItemName = choseName

      // 存入vuex
      let itemInfo = [this.choseItem, this.choseItemName]
      this.$store.commit('setItem', itemInfo)

      // 刷新链入控制台并刷新
      this.showView = false // 通过v-if移除router-view节点
      this.$nextTick(() => {
        this.showView = true // DOM更新后再通过v-if添加router-view节点
      })
      this.$router.push('control')
      console.log(choseName + '切换项目了')
      return false
    },
    // 路由
    linkTo (path) {
      this.$router.push(path)
    },
    exit () {
      // 删除cookie数据并跳转到Login
      console.log('exit')
      this.comFun.delectCookie('roadmUserID')
      this.$router.push({ name: 'login' })
    },
    // 获取今日时间
    getCurrentDate () {
      var now = new Date()
      var year = now.getFullYear() // 得到年份
      var month = now.getMonth() // 得到月份
      var date = now.getDate() // 得到日期
      var day = now.getDay() // 得到周几
      var hour = now.getHours() // 得到小时
      var minu = now.getMinutes() // 得到分钟
      var sec = now.getSeconds() // 得到秒
      var MS = now.getMilliseconds() // 获取毫秒
      var week
      month = month + 1
      if (month < 10) month = '0' + month
      if (date < 10) date = '0' + date
      if (hour < 10) hour = '0' + hour
      if (minu < 10) minu = '0' + minu
      if (sec < 10) sec = '0' + sec
      if (MS < 100) MS = '0' + MS
      var arrWeek = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ]
      week = arrWeek[day]
      var time = ''
      time =
        year +
        '年' +
        month +
        '月' +
        date +
        '日' +
        ' ' +
        hour +
        ':' +
        minu +
        ':' +
        sec +
        ' ' +
        week
      // 当前日期赋值给当前日期输入框中（jQuery easyUI）
      this.settime = time
      // 设置得到当前日期的函数的执行间隔时间，每1000毫秒刷新一次。
    }
  }
}
</script>
