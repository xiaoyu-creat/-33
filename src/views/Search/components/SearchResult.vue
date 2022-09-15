<template>
  <div class="result">
    <van-list
      v-model="loading"
      @load="getResults"
      :finished="finished"
      finished-text="没有更多了~"
      :error.sync="error"
      error-text="请求失败，点击重新刷新"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: { articleId: item.art_id }
          })
        "
      >
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      perPage: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResults() {
      try {
        if (Math.random() < 0.2) {
          throw new Error()
        }
        // 发送请求
        const { data } = await getResultsAPI(
          this.page++,
          this.perPage,
          this.keywords
        )
        const results = data.data.results
        // 如果results数组为空，就停止加载，提示没有更多了
        if (results.length === 0) {
          return (this.finished = true)
        }
        // 保存数据
        // this.results.push(...data.data.results)
        this.results = [...this.results, ...results]
      } catch {
        this.error = true
      } finally {
        // 关闭loading
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
// overlay和auto用法基本一致
.result {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
