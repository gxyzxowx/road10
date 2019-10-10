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
    .des,.pie{
      .content{
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
    .content{
       color:#9FC9F7;
        .title{
          margin-bottom: 18px;
          font-size: 16px;
        }
    }
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
            <div class="name">项目状态：<span> {{datas.ItemData.mItemActive===1 ? '进行中' : '已完结'}}</span></div>
            <div class="name">监管单位：<span> {{datas.ItemData.mItemJGUint}}</span></div>
            <div class="name">施工单位：<span> {{datas.ItemData.mItemSGUint}}</span></div>
            <div class="name">最大标段数：<span> {{datas.ItemData.mItemBidSun}}</span></div>
            <div class="name">总的里程数：<span> {{datas.ItemData.mItemTotalLength}}</span></div>

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
        <div class="content">
          <div class="title">预警按类型分类统计</div>
          <PieChart :id="'pie1'" :data="dataPie1" style="height:180px"></PieChart>
        </div>

      </div>
      <div class="pie col">
        <div class="kuang">
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
        </div>
        <div class="content">
          <div class="title">预警按预警级别分类统计</div>
          <PieChart :id="'pie2'" :data="dataPie2" style="height:180px"></PieChart>
        </div>
      </div>
    </div>
    <div class="mid"></div>
    <div class="right">
      <div class="columnar col">
        <div class="kuang">
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
        </div>
        <div class="content">
          <div class="title">拌合站产量统计</div>
          <!-- <PieChart :id="'pie2'" :data="dataPie2" style="height:180px"></PieChart> -->
          <BarChart style="height:180px"></BarChart>
        </div>
      </div>
      <div class="curve col"></div>
      <div class="columnar col"></div>
    </div>
  </div>
</template>

<script>
import PieChart from '@/components/PieChart.vue'
import BarChart from '@/components/BarChart.vue'
export default {
  data () {
    return {
      itemName: '',
      // itemId页面生成时取得，没有取到就监听，直到取到了再ajax再呈现页面信息
      itemId: 1,
      // 项目信息
      ItemData: {},
      // 预警类型饼图
      AlarmData: [],
      // hello: this.isF
      datas: {
        ItemData: {},
        AlarmData: [],
        AlarmLevelData: []
      },
      dataPie1: null,
      dataPie2: null
    }
  },
  computed: {

  },
  watch: {
    // '$store.state.mItemID': function (newVal, oldVal) {
    //   console.log('watch到了' + oldVal + '变成：' + newVal)
    // },
  },
  created () {
    // 得到当前项目id.目前用的300延迟，之后可用其他方案代替

    setTimeout(() => {
      this.itemId = this.$store.state.mItemID
      this.itemName = this.$store.state.mItemDes
      console.log('control刷新了，当前项目是：' + this.itemId)
      // 取得数据
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.itemId
      }
      // console.log(obj)
      this.comFun.post('/Index/getHomePageData', obj, this).then(
        rs => {
          // console.log(rs)
          if (rs.code === 0) {
            //  项目信息
            this.datas.ItemData = rs.data.ItemData
            // 预警类型饼图
            this.dataPie1 = this.handlePieData(rs.data.AlarmData.data, 'type_name', 'rep', '预警类型分类统计')
            // 预警级别分类
            this.dataPie2 = this.handlePieData(rs.data.AlarmLevelData.data, 'level_name', 'rep', '预警级别分类统计')

            // console.log(JSON.stringify(rs.data))
            // console.log(JSON.stringify(this.datas.AlarmLevelData))
            // 预警级别饼图
          } else {
          }
        },
        err => {
          console.log(err)
        }
      )
    }, 400)
  },
  methods: {
    handlePieData (data, name, rep, title) {
      let legenddata = []
      let seriesdata = []
      for (var i = 0; i < data.length; i++) {
        legenddata.push(data[i][name])
        seriesdata.push({
          value: data[i][rep],
          name: data[i][name]
        })
      }
      // 给饼图赋值
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: {
            color: '#CCE2FB'
          },
          data: legenddata
        },
        color: ['#14C6CA', '#6996F3', '#DA6C75', '#FEAB67', '#41A8F2', '#AB90DF'],
        series: [
          {
            name: title,
            type: 'pie',
            radius: ['24%', '55%'],
            center: ['55%', '50%'],
            data: seriesdata,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      return option
    }

  },
  components: {
    PieChart,
    BarChart
  }
}
</script>
