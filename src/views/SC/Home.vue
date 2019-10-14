<style lang="less" scoped>
.main {
  display: flex;
  margin: 0 40px;
  height: 100%;
  border: 2px solid rgba(32, 64, 129, .71);
  box-shadow: 0px 0px 30px rgb(54, 100, 134) inset;
  .nav{
    width: 430px;
    height: 808px;
    background: #060B36;
    .title{
      background:linear-gradient(to right,rgba(54,94,165,0),rgba(34,136,214,.7),rgba(54,94,165,0));
      height: 82px;
      line-height: 82px;
      text-align: center;
      color:#9FC9F7;
      font-size: 30px;
    }
    ul{
      margin-top: 30px;
      li{
        display: flex;
        height: 78px;
        line-height: 78px;
        justify-content: space-between;
        color:#fff;
        font-size: 27px;
        padding: 0 40px;
        border-bottom:#112A5D solid 1px ;
        cursor: pointer;
        .left{
          display: flex;
          span.icon{
            width:30px;
            line-height: 88px;
            img{
              width:30px;
              height: 30px;
            }
          }
          span:nth-of-type(2){
            width: 115px;
            text-align: justify;
            text-align-last: justify;
            margin-left: 30px;
          }
        }
      }
      li:last-of-type{
        border-bottom:none;
      }
      li.actived{
        background: #3377FE;
      }
    }
  }
  .content{
    flex:1;
  }

}
li {
  list-style: none;
}
</style>
<template>
  <div class="main">
    <div class="nav">
      <div class="title">拌合站总监管</div>
      <ul>
        <li v-for="(item, index) in items" :key="index" :class="{actived :item.isActive}" @click="handler(index, item.routePath )">
          <div class="left">
            <span class="icon"><img :src="item.iconpath" alt=""></span>
            <span>{{item.name}}</span>
          </div>
          <div class="right">
            <span>
              <img src="@/assets/img/sc/rig.png" alt />
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      items: [
        {
          routePath: '/sc/home',
          iconpath: require('@/assets/img/sc/home.png'),
          name: '总览',
          isActive: true
        },
        {
          routePath: '/sc/SCdata',
          iconpath: require('@/assets/img/sc/sc.png'),
          name: '生产数据',
          isActive: false
        },
        {
          routePath: '/sc/SCquality',
          iconpath: require('@/assets/img/sc/zl.png'),
          name: '生产质量',
          isActive: false
        },
        {
          routePath: '/sc/SCgrade',
          iconpath: require('@/assets/img/sc/jp.png'),
          name: '级配统计',
          isActive: false
        },
        {
          routePath: '/sc/SCwarn',
          iconpath: require('@/assets/img/sc/yj.png'),
          name: '预警统计',
          isActive: false
        }
      ],
      oldIndex: 0
    }
  },
  mounted () {
    this.$router.push(this.items[0].routePath)
  },
  methods: {
    handler (index, path) {
      // console.log('index' + index + 'status:' + isActive)
      // 切换样式
      if (index === this.oldIndex) return
      this.items[index].isActive = true
      this.items[this.oldIndex].isActive = false
      this.oldIndex = index
      // 路由切换
      this.$router.push(path)
    }
  }
}
</script>
