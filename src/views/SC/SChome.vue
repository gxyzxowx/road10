<style lang="less">
.content{
  margin-top: 30px;
  .bar1{
    margin-bottom: 25px;
  }
  .bottom{
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
}
</style>
<template>
  <!-- 生产监管总览 -->
  <div class="schome">
    <div class="title">
      <div class="selects">
        <Select v-model="select.mClTypeValue" style="width:200px" placeholder="材料类型">
          <Option v-for="item in mClTypeValueList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="select.mItemBid" style="width:200px" placeholder="工程标段">
          <Option v-for="item in mItemBidList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <DatePicker type="date" placeholder="开始时间" style="width: 200px" v-model="select.start_time" @on-change="changeType0"></DatePicker>
        <DatePicker type="date" placeholder="结束时间" style="width: 200px" v-model="select.end_time" @on-change="changeType1"></DatePicker>
      </div>
      <div class="btn" @click="getData()">
        <span>
          <img src="@/assets/img/sc/search.png" alt />
        </span>
        <span>搜索</span>
      </div>
    </div>
    <div class="content">
      <div class="top">
        <div class="bar1">
<BarChart :id="'bar1'" :data="dataBar1" style="height:200px"></BarChart>
        </div>
        <div class="bar2">
<BarChart :id="'bar2'" :data="dataBar2" style="height:200px"></BarChart>
        </div>

      </div>
      <div class="bottom">

 <PieChart :id="'pie1'" :data="dataPie1" style="height:260px;width:350px"></PieChart>
 <PieChart :id="'pie2'" :data="dataPie2" style="height:260px;width:350px"></PieChart>
 <PieChart :id="'pie3'" :data="dataPie3" style="height:260px;width:350px"></PieChart>

      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/css/selects.css'
import PieChart from '@/components/PieChart.vue'
import BarChart from '@/components/BarChart.vue'
export default {
  data () {
    return {
      select: {
        start_time: '',
        end_time: '',
        mClTypeValue: '',
        mItemBid: ''
      },
      // 各个标段总量统计柱状图
      dataBar1: null,
      dataBar2: null,
      // 预警类型饼图
      dataPie1: null,
      // 预警级别分类饼图
      dataPie2: null,
      // 质量，按合格率统计饼图
      dataPie3: null,
      mClTypeValueList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        }
      ],
      mItemBidList: [
        {
          value: '标段1',
          label: '标段1'
        }
      ]
    }
  },
  mounted () {
    // 得到总览数据
    this.getData()
  },
  methods: {
    changeType0 (val) {
      console.log(val)
      this.select.start_time = val
    },
    changeType1 (val) {
      console.log(val)
      this.select.end_time = val
    },
    getData () {
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.$store.state.mItemID,
        mClTypeValue: this.select.mClTypeValue,
        mItemBid: this.select.mItemBid,
        start_time: this.select.start_time,
        end_time: this.select.end_time
      }
      console.log(typeof this.select.start_time)

      console.log(JSON.stringify(obj))
      this.comFun.post('/Produce_J_G/index', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 各个标段总量统计柱状图
          this.dataBar1 = this.handleBarData(rs.data.BhBidData, 'name', 'value')
          // 各个材料总量统计柱状图
          this.dataBar2 = this.handleBarData2(rs.data.BhClTypeData, 'name', 'value')
          // 预警类型饼图
          this.dataPie1 = this.handlePieData(rs.data.AlarmData.data, 'type_name', 'rep', '预警类型分类统计')
          // 预警级别分类饼图
          this.dataPie2 = this.handlePieData(rs.data.AlarmLevelData.data, 'level_name', 'rep', '预警级别分类统计')
          // 质量按合格率统计饼图
          this.dataPie3 = this.handlePieData(rs.data.BhStandardData, 'key', 'rep', '质量统计', 3)
        }
      }, (err) => { console.log(err) })
    },
    // 处理柱状图数据
    handleBarData (data, name, val) {
      let xAxisdata = []
      let seriesdata = []
      for (var i = 0; i < data.length; i++) {
        xAxisdata.push(data[i][name])
        seriesdata.push(data[i][val])
      }
      let option = {
        title: {
          text: '拌合站产量按标段统计',
          textVerticalAlign: 'top'
        },
        color: ['#333'],
        textStyle: {
          color: '#333'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '22%',
          left: '0%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisdata,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: { show: true, lineStyle: { color: ['#ddd'] } } // 网格线
          }
        ],
        series: [
          {
            name: '.',
            type: 'bar',
            itemStyle: {
              normal: {
                // 这里是重点
                color: function (params) {
                // 注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = ['#14C6CA', '#6996F3', '#DA6C75', '#FEAB67', '#41A8F2', '#AB90DF']
                  return colorList[params.dataIndex]
                }
              }
            },
            barWidth: '40px',
            data: seriesdata
          }
        ]
      }
      return option
    },
    handleBarData2 (data, name, val) {
      let xAxisdata = []
      let seriesdata = []
      for (var i = 0; i < data.length; i++) {
        xAxisdata.push(data[i][name])
        seriesdata.push(data[i][val])
      }
      let option = {
        title: {
          text: '拌合站产量按材料类型统计',
          textVerticalAlign: 'top'
        },
        color: ['#333'],
        textStyle: {
          color: '#333'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '22%',
          left: '0%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        dataZoom: [
          {
            show: true,
            start: 0,
            end: 40
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: xAxisdata,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: { show: true, lineStyle: { color: ['#ddd'] } } // 网格线
          }
        ],
        series: [
          {
            name: '.',
            type: 'bar',
            itemStyle: {
              normal: {
                // 这里是重点
                color: function (params) {
                // 注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = ['#14C6CA', '#6996F3']
                  return colorList[params.dataIndex]
                }
              }
            },
            barWidth: '25px',
            data: seriesdata
          }
        ]
      }
      return option
    },
    // 处理饼图数据
    handlePieData (data, name, rep, title, type, val) {
      let legenddata = []
      let seriesdata = []
      for (let i = 0; i < data.length; i++) {
        legenddata.push(data[i][name])
        seriesdata.push({
          value: data[i][rep],
          name: data[i][name]
        })
      }
      if (type === 3) {
        seriesdata = [
          { value: data[1][rep], name: '不合格：' + data[1].value },
          { value: data[2][rep], name: '合格：' + data[2].value }
        ]
      }
      // 给饼图赋值
      let option = {
        title: {
          text: title,
          textVerticalAlign: 'top'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        legend: {
          orient: 'vertical',
          left: 'left',
          top: '29',
          textStyle: {
            color: '#333'
          },
          data: legenddata
        },
        color: ['#14C6CA', '#6996F3', '#DA6C75', '#FEAB67', '#41A8F2', '#AB90DF'],
        series: [
          {
            name: title,
            type: 'pie',
            radius: ['24%', '55%'],
            center: ['55%', '70%'],
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
