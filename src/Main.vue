<style lang="scss" scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}

.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
a {
    // font-weight: bold;
    color: #515a6e;
    &.router-link-exact-active {
      color: #2d8cf0;
    }
  }
</style>
<style>
  .control-body{
    height: 100%;
  }
</style>
<template>
    <div class="layout" style="height:100%">
        <Layout  style="height:100%">
            <HeaderR @reloadControl="reloadControl" @choseToLink="choseToLink" ></HeaderR>
            <router-view/>
        </Layout>

    </div>
</template>
<script>
import HeaderR from '@/components/HeaderR.vue'

export default {
  data () {
    return {
      keyV: ''
    }
  },
  created () {
    this.$router.push('/control')
  },
  computed: {
    // key () {
    //   console.log(this.$route.path)

    //   return this.$route.path
    // }
  },
  methods: {
    // 头部切换(子组件emit)
    choseToLink (type) {
      if (type === 0) {
        this.$router.push('/control')
      } else if (type === 1) {
        this.$router.push('/newproject')
      }
    },
    // 重新渲染（子组件emit）
    reloadControl () {
      console.log('reload control now')

      this.$router.push('/control')
    }
  },
  components: {
    HeaderR
  }
}
</script>
