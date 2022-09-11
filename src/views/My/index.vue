<template>
  <div class="profile">
    <!-- 头部 -->
    <header>
      <!-- 已登录的结构 -->
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>

        <van-row>
          <van-col span="12">
            <van-row
              style="height: 100%"
              type="flex"
              justify="space-around"
              align="center"
            >
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="userInfo.photo"
              />
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>

          <van-col span="7"></van-col>

          <van-col span="5">
            <van-row
              type="flex"
              justify="center"
              align="center"
              style="height: 100%"
            >
              <van-button size="mini" round class="edit-button"
                >编辑按钮</van-button
              >
            </van-row>
          </van-col>
        </van-row>

        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>{{ userInfo.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ userInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录的结构 -->
      <div class="loginOut banner" v-else @click="$router.push('/login')">
        <van-image
          :src="mobileSrc"
          width="1.67rem"
          height="1.67rem"
        ></van-image>
        <span class="text">登录 / 注册</span>
      </div>
    </header>

    <!-- 主体 -->
    <main>
      <van-grid :column-num="2" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>

    <!-- 底部 -->
    <footer>
      <van-button block style="color: red" v-if="isLogin" @click="logout"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mobileSrc from '@/assets/images/mobile.png'
// 引入API
import { getUserInfo as getUserInfoAPI } from '@/api'
export default {
  name: 'My',
  data() {
    return {
      mobileSrc,
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    async logout() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '是否确认退出该账号'
      })
      this.$store.commit('SET_TOKEN', {})
    },
    // 获取用户信息
    async getUserInfo() {
      try {
        if (!this.isLogin) return
        const { data } = await getUserInfoAPI()
        // console.log(data.data)
        this.userInfo = data.data
      } catch (error) {
        // error
        // 1.js导致的 2.axios导致的
        // js和400,507给程序员提示，401来说用户提示，重新登录
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户信息认证失败，请重新登录')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.profile {
  height: 100vh;
  background-color: #f5f7f9;
  .link {
    margin: 10px 0;
  }
  .toutiao-shoucang {
    color: red;
    font-size: 40px;
  }
  .toutiao-lishi {
    color: orange;
    font-size: 40px;
  }
}
// 必须有background-position
.banner {
  width: 100%;
  height: 5.3333rem;
  background: url('@/assets/images/banner.png') no-repeat 0 0 / cover;
  // background-size: cover;
}
.loginOut {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.text {
  font-size: 30px;
  color: #fff;
  margin-top: 10px;
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 30px;
    color: #fff;
  }
  .van-col {
    height: 100%;
  }
  .edit-button {
    width: 1.6rem;
    height: 0.42677rem;
    color: #666;
  }
  :deep(.grid) {
    color: #fff;
    .van-grid-item__content {
      font-size: 30px;
      background-color: inherit;
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}
</style>
