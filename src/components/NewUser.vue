<style lang="less" scoped>
  .newuser{
    .ivu-row{
      height: 40px;
    }
  }
</style>
<template>
<div class="newuser">
  <h2 style="margin-bottom:10px;">{{type? '修改' : '新建'}}管理员</h2>
    <Form ref="formDynamic" :model="formDynamic" :label-width="120" style="width: 400px">
      <FormItem label="用户名" prop="mUserName">
        <Input v-model="formDynamic.mUserName" placeholder="请输入新增的用户名"></Input>
      </FormItem>
      <FormItem label="密码" prop="mUserPwd">
        <Input type="password" v-model.number="formDynamic.mUserPwd" placeholder="请输入用户名密码"></Input>
      </FormItem>
    <!-- 选择项目 -->
      <FormItem v-for="(item, index) in formDynamicItems"
      :key="index"
              :label="'添加项目'"
              :prop="'items.' + index + '.value'">
          <Row>
              <Col span="18">
                  <!-- <Input type="text" v-model="item.value" placeholder="请输入单个项目id"></!-->
                  <Select v-model="item.value" style="width:200px" placeholder="请选择项目">
                    <Option v-for="option in selectlist" :value="option.mItemID" :key="option.mItemID">{{ option.ItemDes }}</Option>
                  </Select>
              </Col>
              <Col span="4" offset="1">
                  <Button @click="handleRemove(index)">删除该项</Button>
              </Col>
          </Row>
      </FormItem>
      <FormItem>
          <Row  style="height:200px">
              <Col span="12">
                  <Button type="dashed" long @click="handleAdd" icon="md-add">加一项</Button>
              </Col>
          </Row>
      </FormItem>
      <FormItem>
          <Button type="primary" @click="handleSubmit('formDynamic')">提交</Button>
          <Button @click="handleReset('formDynamic')" style="margin-left: 8px">重置</Button>
      </FormItem>
  </Form>
</div>
</template>
<script>
export default {
  data () {
    return {
      index: 1,
      // 0新增，1修改
      type: 0,
      selectlist: [],
      formDynamic: {
        mUserName: '',
        mUserPwd: '',
        items: [
          {
            value: '',
            index: 1,
            status: 1
          }
        ]
      }
    }
  },
  mounted () {
    // 得到所有项目列表不分页
    this.getData()
  },
  computed: {
    formDynamicItems () {
      let valarr = this.formDynamic.items.filter((item, index, arr) => {
        return item.status === 1
      })
      return valarr
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // console.log(this.formDynamic)
          console.log(1)
          let data = this.formDynamic
          // 通过检验，新增/修改用户
          let itemarr = []
          data.items.map((item, index, arr) => {
            console.log(2)
            itemarr.push(item.value)
          })
          let itemID = itemarr.join(',')
          let obj = {
            mUserID: this.comFun.getCookie('roadmUserID'),
            mUserName: data.mUserName,
            mUserPwd: data.mUserPwd,
            itemID: itemID
          }
          console.log(JSON.stringify(obj))
          this.comFun.post('/User/addUser', obj, this).then((rs) => {
            console.log(JSON.stringify(rs))
            if (rs.code === 0) {
              this.selectlist = rs.data
            }
          }, (err) => { console.log(err) })
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    handleAdd () {
      this.index++
      this.formDynamic.items.push({
        value: '',
        index: this.index,
        status: 1
      })
    },
    handleRemove (index) {
      this.formDynamic.items[index].status = 0
    },
    getData () {
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID')
      }
      this.comFun.post('/User/getUserItem', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.selectlist = rs.data
        }
      }, (err) => { console.log(err) })
    }
  }
}
</script>
