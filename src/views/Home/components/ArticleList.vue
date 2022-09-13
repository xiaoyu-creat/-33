<template>
  <div class="article">
    <!-- 属性 -->
    <!-- @load:触底的时候触发load事件 -->
    <!-- offset:滚动条和底部的距离多少的时候触发load事件，默认值300px -->
    <!-- immediate-chec:是否在初始化时立即执行滚动位置检查，默认值为true -->
    <!-- v-model="loading" -->
    <!-- loading为true，load事件不会被触发 -->
    <!-- loading为false，load事件会被触发 -->
    <!-- loading会在load事件执行之后，被van-list自动设置为true后不会被触发 -->
    <!-- finished:Boolean,是否已加载完成，加载完成后不再触发load事件,false:load事件会被触发，true：load事件不会被触发，并且显示finished-text文本 -->
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticle">
      <van-list
        v-model="loading"
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        :finished="finished"
        finished-text="没有更多了~"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 发送请求 拿到当前文章的详情数据
import { getArticles } from '@/api'
import ArticleItem from './ArticleItem'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      articles: [],
      preTimestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    // 获取当前字段的时间戳
    // 1.new Date().valueof()
    // Date.now()
    // +new Date()
    async getFirstPageArticle() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        this.articles = data.data.results

        // 保存下一页的时间戳，用于分页
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        // js的错误，上抛，507 原封不动上抛，400上抛中文
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.message)
          }
        }
      }
    },
    async getNextPageArticle() {
      try {
        // 测试是否出现加载错误
        //   if (Math.random() < 0.5) {
        //     throw new Error()
        //   }
        // 1.发送请求
        const { data } = await getArticles(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.loading) {
          // 2.添加到articles
          this.articles.push(...data.data.results)
        } else {
          this.articles.unshift(...data.data.results)
        }
        // 3.更新时间戳
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        // 错误进行处理
        this.error = true
      } finally {
        // finally语句最后一定会执行
        // 4.更新loading
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
// 如何让盒子拥有自己的滚动条
// -1.定高
// -2.overflow:auto/scroll/overlay
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;

  // &:代表当前元素的父级
  // ::-webkit-scrollbar:滚动槽
  // ::-webkit-scrollbar-thumb:滚动的滑块
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }
}
</style>
