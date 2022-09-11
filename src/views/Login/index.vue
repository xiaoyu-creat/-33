<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <!-- 表单 -->
    <!-- van-field：输入框，text，password，文本域。。。 -->
    <!-- v-model：用户输入的值 -->
    <!-- name：表示表单项 -->
    <!-- rules是一个数组 -->
    <!-- rule:{required:是否必选,message:错误的提示信息，pattern:正则,trigger:规定的触发时机onChange,onBlur} -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <!-- 字体图标 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 发送验证码 -->
        <template #button>
          <van-button
            class="btn"
            v-if="isShowCodeBtn"
            block
            round
            type="default"
            size="small"
            native-type="button"
            @click="sendCode"
            >获取验证码</van-button
          >
          <!-- native-type="button" 点击时只验证手机，不触发表单submit事件 -->
          <van-count-down
            v-else
            :time="3 * 1000"
            format=" ss 秒"
            @finish="isShowCodeBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rule.js'
// 1.引入API
import { login, sendCodeAPI } from '@/api'
// 引入mapMutations
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCodeBtn: true
    }
  },
  methods: {
    // submit事件只有表单通过验证之后才会通过

    // loading
    // message：文本内容，支持通过\n换行
    // forbidClick：是否禁止背景点击
    // duration：展示时长(ms)，值为 0 时，toast 不会消失
    ...mapMutations(['SET_TOKEN']),
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async onSubmit() {
      this.loading()
      try {
        // 登录
        const { data } = await login(this.mobile, this.code)
        // 将token存进vuex
        this.SET_TOKEN(data.data)

        this.$router.push('/profile')
        // 成功的提示
        this.$toast.success('登录成功')
      } catch (error) {
        console.log(error)
        // 细分一下失败：提示用户手机号和验证码
        // 如果是手机号或验证码错了，用户能知道
        // error:1.js抛的错 2.axios封装的error对象

        // axios封装的error对象
        // error.response.data 后端返回的数据
        // error.response.status 后端返回的状态码
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          // 1.js导致错误 2.507
          console.dir(error)
          this.$toast.clear()
        }
        // this.$toast.fail('登录失败')
      }
    },
    async sendCode() {
      // 0.验证用户是否输入有效手机号
      // - 1 form绑定ref
      // -$refs.form.validate(name)
      await this.$refs.form.validate('mobile')

      this.loading()
      // 1.发送请求
      try {
        await sendCodeAPI(this.mobile)
        // 显示倒计时组件
        this.isShowCodeBtn = false

        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 404)
        ) {
          // axios的错误
          this.$toast.fail(error.response.data.message)
        } else {
          // 清除loading
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
// scoped 样式作用于当前的组件
// vue-cli 提供语法 :deep() 深度选择器
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>
