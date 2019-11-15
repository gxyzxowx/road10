<style scoped>
  .chart2{
    height: 100%;
    background: #fff;
  }
</style>
<template>
  <div class="chart2" v-bind:id=id v-bind:data=data>

  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      chartBar: null
    }
  },
  props: ['id', 'data'],
  //  深度监听 父组件刚开始没有值，只有图标的配置项
  //  父组件ajax请求后改变数据的值，传递过来，图标已生成，监听传过来的值的改变
  watch: {
    data: {
      handler (newVal, oldVal) {
        console.log(JSON.stringify(newVal))
        this.drawBar(this.id, newVal)
      }
    },
    deep: true
  },
  methods: {
    drawBar (id, _data) {
      let seriesData = []
      _data.map((item, index, arr) => {
        seriesData.push({
          name: 'A' + index,
          type: 'scatter',
          symbol: 'rect',
          itemStyle: {
            color: 'rgba(0,0,0,0)'
          },
          data: [[item[0].x, item[0].y], [item[1].x, item[1].y], [item[2].x, item[2].y], [item[3].x, item[3].y]
          ],
          markArea: {
            silent: true,
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,.05)',
                borderWidth: 1,
                borderType: 'dashed'
              }
            },
            data: [[{
              xAxis: 'min',
              yAxis: 'min'
            }, {
              xAxis: 'max',
              yAxis: 'max'
            }]]
          }
        })
      })
      // 处理数据
      let option = {
        title: {
          text: '分布',
          subtext: '介绍'
        },
        grid: {
          left: '3%',
          right: '7%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
        // trigger: 'axis',
          showDelay: 0,
          formatter: function (params) {
            if (params.value.length > 1) {
              return params.seriesName + ' :<br/>' +
                params.value[0] + 'm(X) ' +
                params.value[1] + 'm(Y)'
            } else {
              return params.seriesName + ' :<br/>' +
                params.name + ' : ' +
                params.value + 'm '
            }
          },
          axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
              type: 'dashed',
              width: 1
            }
          }
        },
        legend: {
          data: ['A', 'B'],
          left: 'center'
        },
        xAxis: [
          {
            type: 'value',
            // max: '5412360',
            // min: '5412650',
            scale: true,
            axisLabel: {
              formatter: '{value} m'
            },
            splitLine: {
              show: true
            }
          }
        ],
        yAxis: [
          {
            // max: '11851600',
            // min: '40',
            type: 'value',
            scale: true,
            axisLabel: {
              formatter: '{value} m'
            },
            splitLine: {
              show: true
            }
          }
        ],
        series: seriesData
      }
      let myChart = echarts.init(document.getElementById(id))
      this.chartBar = myChart.setOption(option, true)
    }
  },
  mounted () {

  },
  beforeDestroy () {
    if (this.chartBar) {
      this.chartBar.clear()
    }
  }
}
</script>
