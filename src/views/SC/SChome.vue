<style lang="less">
.schome {
  background: #fff;
  height: 100%;
  padding:40px;
  .title{
    display: flex;
    .selects{
      width: 900px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // 选择器样式修改
      .ivu-select-single .ivu-select-selection{
        height: 58px;
        line-height: 58px;
        background: #00C4C0FF;
        .ivu-select-placeholder{
          line-height: 58px;
          height: 58px;
          color:#fff;
          font-size: 25px;
        }
        .ivu-select-selected-value{
          height: 58px;
          color:#fff;
          font-size: 25px;
          line-height: 58px;
        }
        .ivu-select{
          color:#fff;
          font-size: 25px;
        }
        // 箭头
        .ivu-select-arrow{
          font-size: 28px;
          color:#fff;
        }
      }
      // 选择日期样式修改
      .ivu-input{
        background: #00C4C0FF;
        color:#fff;
         height: 58px;
         font-size: 27px;

      }
      input::-webkit-input-placeholder{color:#fff!important;}
      .ivu-input-suffix{
        margin-right: 10px;
      }
      .ivu-input-suffix i{
        font-size: 28px;
        color:#fff;
        line-height: 58px;
      }
    }
    .btn{
      width:154px;
      box-sizing: border-box;
      height:60px;
      background:rgba(28,106,171,1);
      border-radius:30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:18px 22px;
      margin-left: 60px;
      img{
        margin-top: 5px;
        width: 40px;
        height: 40px;
      }
      span{
        font-size: 27px;
        color:#fff;
        margin-top: 4px;
      }
    }
  }
}
</style>
<template>
  <!-- 生产监管总览 -->
  <div class="schome">
    <div class="title">
      <div class="selects">
        <Select v-model="bd" style="width:200px" placeholder="工程标段">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="material" style="width:200px" placeholder="材料类型">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <DatePicker type="date" placeholder="开始时间" style="width: 200px" v-model="time.begin"></DatePicker>
        <DatePicker type="date" placeholder="结束时间" style="width: 200px" v-model="time.end"></DatePicker>
      </div>
      <div class="btn">
        <span>
          <img src="@/assets/img/sc/search.png" alt />
        </span>
        <span>搜索</span>
      </div>
    </div>
    <div class="content">
      <div class="top">
<BarChart :id="'bar1'" :data="dataBar1" style="height:180px"></BarChart>
      </div>
      <div class="bottom">
        <div class="left">
 <PieChart :id="'pie1'" :data="dataPie1" style="height:180px"></PieChart>
 <PieChart :id="'pie2'" :data="dataPie2" style="height:180px"></PieChart>
        </div>
        <div class="right">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PieChart from '@/components/PieChart.vue'
import BarChart from '@/components/BarChart.vue'
export default {
  data () {
    return {
      time: {
        begin: '',
        end: ''
      },
      material: '',
      bd: '',
      // 各个标段总量统计柱状图
      dataBar1: null,
      // 预警类型饼图
      dataPie1: null,
      // 预警级别分类饼图
      dataPie2: null,
      // 质量，按合格率统计饼图
      dataPie3: null,
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ]
    }
  },
  mounted () {
    // 得到总览数据
    this.getData()
  },
  methods: {
    getData () {
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.$store.state.mItemID
      }
      console.log(JSON.stringify(obj))
      this.comFun.post('/Produce_J_G/index', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 各个标段总量统计柱状图
        // this.dataBar1 = this.handleBarData(rs.data.BhBidData, 'name', 'value')
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
        color: ['#6996F3'],
        textStyle: {
          color: '#9FC9F7'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '3%',
          left: '3%',
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
            splitLine: { show: true, lineStyle: { color: ['#333'] } } // 网格线
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
            barWidth: '60%',
            data: seriesdata
          }
        ]
      }
      return option
    },
    // 处理饼图数据
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
            color: '#9FC9F7'
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
