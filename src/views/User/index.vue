<template>
  <div>
    <!-- 个人信息导航条 -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 信息修改 -->

    <!-- 更新头像 -->
    <input
      type="file"
      ref="file"
      hidden
      accept=".png,.pdf,.jpg"
      @change="selectPhoto"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="avator" />
    </van-cell>
    <!-- 更新头像的弹出层 -->
    <van-popup
      v-model="isShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-avator
        v-if="isShow"
        :avator.sync="avator"
        :photo="photo"
      ></update-avator>
    </van-popup>
  </div>
</template>

<script>
// 1.点击修改头像
//  -手动的触发input:file的点击事件

// 2.获取用户选择的图片
// -给input:file 绑定change
// -选择的图片被保存在input:file.value属性上,保存的文件的绝对路径；files数组里，保存的file对象

// 3.如何将file对象转成base64
// - FileReader：文件阅读器
// - const fr = new FileReader(); fr.readAsDataURL(file);
// - 接收读取的结果：fr.onload = (e) =>{ e.target.result /* base64 */}

// File对象，文件的二进制对象

// input:file
//  -hidden:等于display:none
//  -accept:规定file选择文件的类型
import UpdateAvator from './components/UpdateAvator.vue'
import { resolveToBase64 } from '@/utils'
export default {
  components: { UpdateAvator },
  data() {
    return {
      isShow: false,
      photo: '',
      avator: ''
    }
  },
  methods: {
    async selectPhoto() {
      // 获取到用户选择的图片的file对象
      const file = this.$refs.file.files[0]
      // file对象转成img.src可识别的属性
      // file对象转成base64
      const base64 = await resolveToBase64(file)
      // 传递base64给组件
      this.photo = base64
      //  打开弹窗
      this.isShow = true
      //   解决不能连续选中同一张图片的bug
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
</style>
