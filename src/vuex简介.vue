<template>
  <div>
    <!-- <router-view></router-view> -->
    <!-- 展示count -->
    <h1>{{ count }}</h1>
    <h1>count的10倍：{{ bigNum }}</h1>
    <button @click="SET_COUNT(10)">点我+1</button>
  </div>
</template>

<script>
// git log 查看commit记录
// git status 查看当前仓库的状态
// git add . 提交到暂存区
// git commit -m ''
//  -feat:新增特性
//  -style:样式的修改
//  -fixed:debug
//  -comment:添加了注释

// 2.远程仓库建立连接
// -第一次
//  - git remote add 远程仓库的小名 远程仓库的地址 建立本次仓库和远程仓库的连接
//  - git remote -v 查看远程仓库
//  - git push -u 仓库小名 本地分支名:远程分支名 //-u是第一次推送的时候添加，如果说本地分支和远程分支名一样，可省略

// 1.下载vant
// -yarn add vant@latest-v2 -S

// 2.引入组件和css
// -main.js

// 3.测试

// ren适配
// 1.让rem动起来
//  -yarn add amfe-flexible
// 2.盒子使用rem

// 1.下载yarn add postcss-pxtorem
// 2.告诉postcss，我们要使用这个插件，.postcssrc.js

// mapState --> 将vuex里面的state映射到computed
// 使用
//  -引入mapState：函数，返回一个对象
//  -参数：['映射的属性']

// mapGetters -->将vuex里面getters映射到computed

// mapMutations --> 将vuex的mutations方法映射到methods
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  methods: {
    // increment() {
    //   this.$store.commit('SET_COUNT', 10)
    // }
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped>
.box {
  width: 2rem;
  height: 2rem;
  background-color: hotpink;
}
</style>
