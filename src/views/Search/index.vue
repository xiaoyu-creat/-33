<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('/')"
      />
    </form>
    <!-- 搜索历史、建议、搜索结果 -->
    <!-- <search-history></search-history>
    <search-suggestion></search-suggestion>
    <search-result></search-result> -->
    <component
      :keywords="keywords"
      :is="componentName"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
// class和style属性的特殊
// -vue自动帮你把class和style合并到组件的根节点上
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'

import { mapMutations, mapState } from 'vuex'
export default {
  components: { SearchHistory, SearchSuggestion, SearchResult },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      // 搜索历史:搜索框的值为空
      // 搜索建议：搜索框有值，并且不渲染搜索结果
      // 搜索结果：触发搜索时，显示搜索结果
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      // this.keywords一定有值
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      // 及不渲染搜索结果也不渲染搜索历史
      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      // 把keywords关键词存起来
      // 1.用户手动敲回车 2.点击搜索建议
      // 存储历史
      // 去重: 1.获取没有去重的数组 2.放在new Set(arr) 3.[...new Set(arr)]
      // this.$store.commit('SET_HISTORIES', distinctHostories)
      const distinctHostories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distinctHostories)

      this.keywords = keywords
      this.isShowSearchResult = true
    }
  }
}
</script>

<style scoped lang="less">
.search {
  // 属性选择器
  [role='button'] {
    color: #fff;
  }
}
</style>
