
<style lang="less" scoped>
.mitem {
  .header{
    margin-bottom: .3rem;
  }
 .title{
   margin-bottom: .2rem;
 }
 h3{
   margin-bottom: .1rem;
 }
}
</style>
<template>
  <!-- 某个材料的矿料列表 -->
  <div class="mitem newform">
    <h3 class="header">修改管理员( {{formDynamic.mUserName}} )信息：</h3>
    <div class="title">
      <Button type="success" size="large" icon="md-add" @click="createNewItem()">为管理员新增项目</Button>
    </div>

    <div class="bottom">
      <h3>拥有项目列表：</h3>
      <Table border :columns="itemTitle" :data="itemlist" no-data-text="暂无项目" height="400">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="error" size="small" @click="remove(index)">移除项目</Button>
          <Modal v-model="delectmodal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
              <Icon type="ios-information-circle"></Icon>
              <span>为该管理员移除项目ID:{{delectItemDes}}</span>
            </p>
            <div style="text-align:center">
              <p>移除后不可恢复</p>
              <p>你确定移除吗?</p>
            </div>
            <div slot="footer">
              <Button type="error" size="large" long :loading="modal_loading" @click="delItem">删除</Button>
            </div>
          </Modal>
        </template>
      </Table>
      <h3 style="margin-top:.3rem">密码设置</h3>
      <Form ref="formDynamic" :model="formDynamic" :label-width="60" style="width: 4rem">
        <FormItem label="用户名" prop="mUserName">
          <Input v-model="formDynamic.mUserName" disabled></Input>
        </FormItem>
        <FormItem label="密码" prop="mUserPwd">
          <Input type="password" v-model.number="formDynamic.mUserPwd" placeholder="请输入新设置的密码"></Input>
        </FormItem>
         <FormItem>
          <Button type="primary" @click="handleSubmit('formDynamic')">提交新密码</Button>
      </FormItem>
      </Form>
    </div>

    <!-- 新增项目模态框 -->
    <Modal v-model="showNewModal" width="900">
      <p slot="header" style="color:#333;text-align:center">
        <Icon type="md-add"></Icon>
        <span>新增项目</span>
      </p>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      modal_loading: false,
      formDynamic: {},
      // 选择的某个管理员ID
      selectItemID: '',
      delectmodal: false,
      // 删除的索引
      selectIndex: null,

      delectItemDes: '',
      showNewModal: false,
      showModifyModal: false,
      itemTitle: [
        {
          title: '序号',
          key: 'num',
          width: 80
        },
        {
          title: '项目ID',
          key: 'mItemID'
        },
        {
          title: '项目名',
          key: 'mItemDes'
        },
        {
          title: '项目状态',
          key: 'mItemActive'
        },
        {
          title: '操作',
          slot: 'action',
          width: 140,
          align: 'center'
        }
      ],
      // 列表数据
      itemlist: [],
      titletxt: {
        name: '',
        type: '',
        item: ''
      }
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
    this.selectItemID = this.$store.state.selectItemID

    this.getData()
  },
  methods: {
    // 得到用户的数据
    getData () {
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        editUserID: this.selectItemID
      }
      console.log(JSON.stringify(obj))

      this.comFun.post('/User/getAdminInfo', obj, this).then(
        (rs) => {
          console.log(JSON.stringify(rs))
          if (rs.code === 0) {
            this.formDynamic.mUserName = rs.data.mUserName
            // mItemActive
            rs.data.itemList.map((item, index, arr) => {
              arr[index]['mItemActive'] = item['mItemActive'] ? '施工中' : '完结'
              arr[index]['num'] = index + 1
            })
            this.itemlist = rs.data.itemList
          } else {
            this.$Message.error(rs.message)
          }
        },
        err => {
          console.log(err)
        }
      )
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
      this.comFun.post('/Cl/delRepice', obj, this).then(
        rs => {
          console.log(JSON.stringify(rs))
          if (rs.code === 0) {
            this.modal_loading = true
            setTimeout(() => {
              this.modal_loading = false
              this.delectmodal = false
              this.itemlist.splice(this.selectIndex, 1)
              this.$Message.success('成功移除项目')
            }, 1000)
          } else {
            this.$Message.error(rs.message)
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    // 修改项目关闭的时候清空store
    clearStoreSelectItemID () {
      this.$store.commit('setKlUse', {})
    }
  },
  components: {}
}
</script>
