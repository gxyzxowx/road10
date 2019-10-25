<style scoped>
.newform {
  width: 800px;
  height:900px;
  margin: 50px auto;
  overflow-y: scroll;
}

</style>
<template>
  <div class="newform">
    <h2 style="margin-bottom:10px;">{{type? '修改' : '新建'}}矿料</h2>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
      <FormItem label="选择矿料">
        <Select v-model="formValidate.mKlID" style="width:150px;margin-right:10px;" size="large" placeholder="请选择矿料ID">
          <Option v-for="item in selectlist" :value="item.mKlID" :key="item.mKlID">{{ item.tBhKlTable }}</Option>
        </Select>
      </FormItem>
      <FormItem v-for="(item, index) in kltablelist" :key="index" :label="item.title" :prop="item.key">
        <Input v-model="formValidate[item.key]" :placeholder="'请输入' + item.title + '（输入0-1之间的小数）'"></Input>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">确认{{type? '修改' : '新建'}}</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
    <Row>
      <Col class="demo-spin-col" v-if="loading">
          <Spin fix>
              <Icon type="ios-loading"  class="demo-spin-icon-load"></Icon>
              <div>Loading</div>
          </Spin>
      </Col>
    </Row>
  </div>
</template>
<script>
import kltablelist from '@/data/recipeKl.json'
export default {
  data () {
    return {
      kltablelist: kltablelist,
      loading: false,
      // 0新增项目；1修改项目
      type: 0,
      // 选择矿料ID列表
      selectlist: [],
      // 选择操作的材料ID，从store中selectItemID获取
      selectmClID: '',
      // 编辑时才有：选择操作的矿料，项目ID,标段，从store中klUse获取
      klUse: {
        bd: '',
        itemID: '',
        mKlID: ''
      },
      formValidate: {
        // 该材料的ID
        mClID: '',
        // 用户ID
        mUserID: '',
        // 选择矿料的ID
        mKlID: ''
      },
      ruleValidate: {
        mItemDes: [
          {
            required: true,
            message: '项目描述不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    // 取得某个材料中选择矿料ID的数据
    this.getSelectlist()
    this.selectmClID = this.$store.state.selectItemID
    // 确定是修改矿料还是新增矿料
    // this.selectItemID = this.$store.state.selectKlID
    // if (this.selectItemID) {
    //   // 编辑
    //   this.type = 1
    //   console.log('是修改' + this.selectItemID)
    //   this.getItemInfo()
    // }
  },
  methods: {
    getSelectlist () {
      let obj = {
        mClID: this.selectmClID,
        mUserID: this.comFun.getCookie('roadmUserID')
      }
      this.comFun.post('/Cl/getAvailableKlList', obj, this).then((rs) => {
        // console.log(rs)
        if (rs.code === 0) {
          this.selectlist = rs.data
        } else {
          //  失败
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    },
    handleSubmit (formValidate) {
      this.$refs[formValidate].validate(valid => {
        let obj = this.formValidate
        obj['mUserID'] = this.comFun.getCookie('roadmUserID')
        obj['mClID'] = this.selectmClID

        if (valid) {
          // 判断是新增还是修改
          if (this.type === 1) {
            // 1是编辑 ，需要添加mItemID
            obj['mClID'] = this.selectItemID
          }
          console.log(obj)
          this.comFun.post('/Cl/addRepice', obj, this).then((rs) => {
            console.log(rs)
            if (rs.code === 0) {
              // 成功,提示后返回控制台
              this.$Message.success(rs.message)
              this.$router.push('/manage/item')
              return false
            } else {
              //  失败
              this.$Message.error(rs.message)
            }
          }, (err) => { console.log(err) })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (formValidate) {
      this.$refs[formValidate].resetFields()
    },
    getItemInfo () {
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.selectItemID
      }
      this.comFun.post('/Item/getItemInfo', obj, this).then((rs) => {
        // console.log(rs)
        if (rs.code === 0) {
          // 处理数据呈现
          rs.data.mItemActive = rs.data.mItemActive + ''
          if (rs.data.mItemPhoneNo) rs.data.mItemPhoneNo = parseInt(rs.data.mItemPhoneNo)
          if (rs.data.mAlarmLev1PhoneNo) rs.data.mAlarmLev1PhoneNo = parseInt(rs.data.mAlarmLev1PhoneNo)
          if (rs.data.mAlarmLev2PhoneNo) rs.data.mAlarmLev2PhoneNo = parseInt(rs.data.mAlarmLev2PhoneNo)
          if (rs.data.mAlarmLev3PhoneNo) rs.data.mAlarmLev3PhoneNo = parseInt(rs.data.mAlarmLev3PhoneNo)
          this.formValidate = rs.data
        } else {
          //  失败
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    }
  }
}
</script>
