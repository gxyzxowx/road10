<template>
  <div class='scdata'>
    <div class="title">
      <div class="selects">
        <Select v-model="select.mClTypeValue" style="width:200px" placeholder="材料类型">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="select.mItemBid" style="width:200px" placeholder="工程标段">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <DatePicker type="date" placeholder="开始时间" style="width: 200px" v-model="select.start_time"></DatePicker>
        <DatePicker type="date" placeholder="结束时间" style="width: 200px" v-model="select.end_time"></DatePicker>
      </div>
      <div class="btn">
        <span>
          <img src="@/assets/img/sc/search.png" alt />
        </span>
        <span>搜索</span>
      </div>
    </div>
    <div class="content">
<!-- 产量列表 -->
<Table :loading="loading" height="300" border :columns="listTitle" :data="datalist"></Table>
<Switch v-model="loading"></Switch>
<div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="page.totaldata" :current.sync="page.current" @on-change="changePage"></Page>
        </div>
    </div>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: true,
      select: {
        start_time: '',
        end_time: '',
        mClTypeValue: '',
        mItemBid: ''
      },
      page: {
        // 数据总条数
        totaldata: 1,
        // 当前页数
        current: 1,
        // 每页条数
        rows: 10
      },
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
      ],
      listTitle: [
        {
          title: '生产日期',
          key: 'mBhDateTime',
          width: 180
        },
        {
          title: '材料类型',
          key: 'mClTypeName'
        },
        {
          title: '生产总量',
          key: 'mBhItemNO'
        },
        {
          title: '油石比',
          key: 'mBnYSB'
        },
        {
          title: '出料温度',
          key: 'mBhItemTemp'
        },
        {
          title: '合格',
          key: 'key1'
        },
        {
          title: '温度预警',
          key: 'mBhItemTempAlarm'
        },
        {
          title: '油石比预警',
          key: 'mBhYSBAlarm'
        },
        {
          title: '级配预警',
          key: 'key2'
        }
      ],
      datalist: []
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
        mItemID: this.$store.state.mItemID,
        page: this.page.current,
        rows: this.page.rows,
        start_time: this.select.start_time,
        end_time: this.select.end_time,
        // 材料类型ID
        mClTypeValue: this.select.mClTypeValue,
        // 项目标段ID
        mItemBid: this.select.mItemBid

      }
      // console.log(JSON.stringify(obj))
      this.comFun.post('/Produce_J_G/productData', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 总页数
          this.page.totaldata = rs.data.total

          // 列表 图
          // 处理列表数据
          rs.data.data_list.map((item, index, arr) => {
            arr[index].mBhItemTemp = item.mBhItemTemp + '℃'
            // 预警：0:无预警 1:产生预警
            arr[index].mBhItemTempAlarm = item.mBhItemTempAlarm ? '是' : '否'
            arr[index].mBhYSBAlarm = item.mBhYSBAlarm ? '是' : '否'
            arr[index].mBnYSB = item.mBnYSB + '%'
          })
          this.datalist = rs.data.data_list
          // 各个标段总量统计柱状图
        // this.dataBar1 = this.handleBarData(rs.data.BhBidData, 'name', 'value')
        }
      }, (err) => { console.log(err) })
    },
    changePage () {
      // 更换页数
      this.getData()
      console.log('切换page:' + this.page.current)
    }
  }
}
</script>
