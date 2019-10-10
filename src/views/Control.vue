<style lang="less" scoped>
.control {
  margin: 0 40px;
  display: flex;
  .left,
  .right {
    width: 430px;
    height: 100%;
  }
  .left{
    .des{
      .content{
        color:#9FC9F7;
        .title{
          margin-bottom: 18px;
          font-size: 16px;
        }
        .body{
          .name{
            font-size: 13px;
            margin-bottom: 12px;
            span{
              color:#FEAB67;
            }
          }
        }
      }
    }
  }
  .mid {
    flex: 1;
  }
  .col {
    position: relative;
    width: 430px;
    height: 260px;
    box-sizing: border-box;
    padding:19px 20px;
    border: 2px solid rgba(32, 64, 129, .71);
    box-shadow: 0px 0px 30px rgb(54, 100, 134) inset;
    margin-bottom: 15px;
    .L{
      position: absolute;
      background-size: 100% 100%;
      width: 20px;
      height: 20px;
    }
    .L:nth-child(1){
      background-image: url(~@/assets/img/top-left.png);
      top:-4px;
      left: -4px;
    }
    .L:nth-child(2){
      background-image: url(~@/assets/img/top-right.png);
      top:-4px;
      right: -4px;
    }
    .L:nth-child(3){
      background-image: url(~@/assets/img/bot-left.png);
      bottom: -4px;
      left: -4px;
    }
    .L:nth-child(4){
      background-image: url(~@/assets/img/bot-rig.png);
      bottom:-4px;
      right: -4px;
    }

  }
}
</style>
<template>
  <!-- 项目总览--重要 -->
  <div class="control">
    <div class="left">
      <div class="des col">
        <div class="kuang">
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
        </div>
        <div class="content">
          <div class="title">项目基本信息展示</div>
          <div class="body">
            <!-- 名称 -->
            <div class="name">项目名称：<span> {{itemName}}</span></div>
            <div class="name">项目状态：<span> {{ItemData.mItemActive===1 ? '进行中' : '已完结'}}</span></div>
            <div class="name">监管单位：<span> {{ItemData.mItemJGUint}}</span></div>
            <div class="name">施工单位：<span> {{ItemData.mItemSGUint}}</span></div>
            <div class="name">最大标段数：<span> {{ItemData.mItemBidSun}}</span></div>
            <div class="name">总的里程数：<span> {{ItemData.mItemTotalLength}}</span></div>

          </div>
        </div>
      </div>
      <div class="pie col">
        <div class="kuang">
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
        </div>
        <!-- <PieChart></PieChart> -->
      </div>
      <div class="pie col">
        <div class="kuang">
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
        </div>
      </div>
    </div>
    <div class="mid"></div>
    <div class="right">
      <div class="columnar col"></div>
      <div class="curve col"></div>
      <div class="columnar col"></div>
    </div>
  </div>
</template>

<script>
// import PieChart from '@/components/PieChart.vue'
export default {
  data () {
    return {
      itemName: '',
      itemId: 1,
      // 项目信息
      ItemData: {},
      // 预警类型饼图
      AlarmData: []
    }
  },
  created () {
    // 得到当前项目id.目前用的300延迟，之后可用其他方案代替
    setTimeout(() => {
      let itemId = this.$store.state.mItemID
      this.itemId = itemId
      this.itemName = this.$store.state.mItemDes
      console.log('control刷新了，当前项目是：' + itemId)
      // 取得数据
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: itemId
      }
      console.log(obj)
      this.comFun.post('/Index/getHomePageData', obj, this).then(
        rs => {
          // console.log(rs)
          if (rs.code === 0) {
            //  项目信息
            this.ItemData = rs.data.ItemData
            // 预警分类饼图
            this.AlarmData = rs.data.AlarmData.data
            // console.log(JSON.stringify(this.allData))
          } else {
          }
        },
        err => {
          console.log(err)
        }
      )
    }, 300)
  }
  // components: {
  //   PieChart
  // }
}
</script>
