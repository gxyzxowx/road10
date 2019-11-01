<style lang="less" scoped>
.mitem {
  margin: .15rem;
  .title {
    display: flex;
    justify-content: space-between;
    .right {
      display: flex;
    }
    .right {
      margin: .10rem 0;
    }
  }
}
</style>
<template>
<!-- 某个材料的矿料列表 -->
  <div class="mitem">
    <div class="title">

      <div class="right">
        <Button type="success" size="large" icon="md-add" @click="createNewItem()">新建矿料</Button>
      </div>
    </div>
    <div class="bottom">
      <Table border :columns="itemTitle" :data="itemlist" no-data-text="暂无数据，请切换查看条件查看数据">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: .05rem" @click="modify(index)">修改</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
        <Modal v-model="delectmodal" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>删除矿料:{{delectItemDes}}</span>
          </p>
          <div style="text-align:center">
            <p>删除后不可恢复</p>
            <p>你确定删除吗?</p>
          </div>
          <div slot="footer">
            <Button type="error" size="large" long :loading="modal_loading" @click="delItem">删除</Button>
          </div>
        </Modal>
      </template>
    </Table>
    </div>

    <!-- 新建矿料模态框 -->
    <Modal v-model="showNewModal" width="900">
        <p slot="header" style="color:#333;text-align:center">
            <Icon type="md-add"></Icon>
            <span>新建矿料</span>
        </p>
        <NewKl v-if="showNewModal"></NewKl>
        <div slot="footer"></div>
    </Modal>
    <!-- 修改项目模态框 -->
       <Modal v-model="showModifyModal" width="900" >
        <p slot="header" style="color:#333;text-align:center">
            <Icon type="md-add"></Icon>
            <span>修改矿料</span>
        </p>
        <NewKl v-if="showModifyModal"></NewKl>
    </Modal>
  </div>
</template>
<script>
import NewKl from '@/components/NewKl.vue'
import RecipeKlList from '@/components/RecipeKlList.vue'
export default {
  data () {
    return {
      modal_loading: false,
      // 该矿料属于某个材料的ID
      mClID: '',
      delectmodal: false,
      // 删除的索引
      selectIndex: null,

      delectItemDes: '',
      showNewModal: false,
      showModifyModal: false,
      percentTitle: ['mKlYLB', 'mJP375', 'mJP315', 'mJP265', 'mJP190', 'mJP095', 'mJP0475', 'mJP0236', 'mJP0118', 'mJP006', 'mJP003', 'mJP0015', 'mJP00075'],
      itemTitle: [
        {
          'title': '矿料ID',
          'key': 'mKlID',
          'width': 80,
          'fixed': 'left'
        },
        {
          'title': '编号',
          'key': 'tBhKlTable',
          'width': 100
        }, {
          'title': '材料ID',
          'key': 'mClID',
          'width': 80
        }, {
          'title': '项目ID',
          'key': 'mItemID',
          'width': 80
        }, {
          'title': '项目标段',
          'key': 'mItemBid',
          'width': 80
        }, {
          'title': '项目描述',
          'key': 'mItemDes',
          'width': 140
        },
        {
          'title': '矿料用量比',
          'key': 'mKlYLB',
          'width': 100
        },
        {
          'title': '孔径37.5通过率',
          'key': 'mJP375',
          'width': 110
        },
        {
          'title': '孔径31.5通过率',
          'key': 'mJP315',
          'width': 110
        },
        {
          'title': '孔径26.5通过率',
          'key': 'mJP265',
          'width': 110
        },
        {
          'title': '孔径19.0通过率',
          'key': 'mJP190',
          'width': 110
        },
        {
          'title': '孔径0.95通过率',
          'key': 'mJP095',
          'width': 110
        },
        {
          'title': '孔径0.475通过率',
          'key': 'mJP0475',
          'width': 110
        },
        {
          'title': '孔径0.263通过率',
          'key': 'mJP0236',
          'width': 110
        },
        {
          'title': '孔径0.118通过率',
          'key': 'mJP0118',
          'width': 110
        },
        {
          'title': '孔径0.06通过率',
          'key': 'mJP006',
          'width': 110
        },
        {
          'title': '孔径0.03通过率',
          'key': 'mJP003',
          'width': 110
        },
        {
          'title': '孔径0.015通过率',
          'key': 'mJP0015',
          'width': 110
        },
        {
          'title': '孔径0.0075通过率',
          'key': 'mJP00075',
          'width': 110
        },
        {
          'title': '操作',
          'slot': 'action',
          'width': 140,
          'align': 'center',
          'fixed': 'right'
        }
      ],
      // 列表数据
      itemlist: [
        // {
        //   'mClID': 1,
        //   'mKlID': 1,
        //   'mItemID': 1,
        //   'mItemBid': 1,
        //   'mKlYLB': 17,
        //   'mJP375': 100,
        //   'mJP315': 100,
        //   'mJP265': 74.7,
        //   'mJP190': 3.9,
        //   'mJP095': 0.1,
        //   'mJP0475': 0.1,
        //   'mJP0236': 0.1,
        //   'mJP0118': 0.1,
        //   'mJP006': 0.1,
        //   'mJP003': 0.1,
        //   'mJP0015': 0.1,
        //   'mJP00075': 0.1,
        //   'tBhKlTable': '1#(24-32',
        //   'mItemDes': 'AAA'
        // }
      ]
    }
  },
  watch: {
    showModifyModal: function (newVal, oldVal) {
      if (!newVal) {
        this.clearStoreSelectItemID()
      }
    },
    // 监听模态框的状态
    storeModalState: function (newVal) {
      console.log('监听到关闭modal')
      if (newVal === false) {
        this.showNewModal = false
        this.showModifyModal = false
        // 重新刷新数据
        this.getData()
        // 重新展示数据
        this.showTable = false
        this.$nextTick(() => {
          this.showTable = true
        })
        // 模态框状态归零
        this.$store.commit('setModalStateKl', '')
      }
    }
  },
  computed: {
    // 监听模态框的状态
    storeModalState: function () {
      return this.$store.state.modalStateKl
    }
  },
  mounted () {
    this.mClID = this.$store.state.selectItemID
    this.getData()
  },
  methods: {
    // 查看list
    getData () {
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mClID: this.mClID
      }
      console.log(JSON.stringify(obj))

      this.comFun.post('/Cl/getBhClRepiceList', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          if (!rs.data || rs.data.length === 0) return
          // 处理数据

          let titles = this.percentTitle
          rs.data.map((item, index, arr) => {
          // 所有的级配数据加上%
            for (let i = 0; i < titles.length; i++) {
              arr[index][titles[i]] = item[titles[i]] + '%'
            }
          })
          this.itemlist = rs.data
        } else {
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    },
    // 修改，编辑矿料
    modify (index) {
      this.selectIndex = index
      this.selectItemID = this.itemlist[this.selectIndex].mKlID
      // 把标段和项目ID,矿料ID存入store
      let KlUse = {
        itemID: this.itemlist[0]['mItemID'],
        bd: this.itemlist[0]['mItemBid'],
        mKlID: this.selectItemID
      }
      this.$store.commit('setKlUse', KlUse)
      this.showModifyModal = true
    },
    // 新建设备
    createNewItem () {
      this.showNewModal = true
    },
    // 准备删除
    remove (index) {
      this.delectItemDes = this.itemlist[index].tBhKlTable
      this.delectmodal = true
      this.selectIndex = index
    },
    // 确认删除
    delItem () {
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.itemlist[this.selectIndex].mItemID,
        mItemBid: this.itemlist[this.selectIndex].mItemBid,
        mClID: this.itemlist[this.selectIndex].mClID,
        mKlID: this.itemlist[this.selectIndex].mKlID
      }
      console.log(JSON.stringify(obj))
      this.comFun.post('/Cl/delRepice', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.modal_loading = true
          setTimeout(() => {
            this.modal_loading = false
            this.delectmodal = false
            this.itemlist.splice(this.selectIndex, 1)
            this.$Message.success('成功删除矿料')
          }, 1000)
        } else {
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    },
    // 修改项目关闭的时候清空store
    clearStoreSelectItemID () {
      this.$store.commit('setKlUse', {})
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    RecipeKlList,
    // eslint-disable-next-line vue/no-unused-components
    NewKl
  }
}
</script>
