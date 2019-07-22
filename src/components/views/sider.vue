<template>
  <div class="sidebar" @touchmove="move($event)">
    <div class="top">
      <div class="user" @touchstart='notComplete1'>
        <i class="iconfont icon-denglu"></i>
        <span>请登录</span>
      </div>
      <div class="content">
        <div class="collect" @touchstart="toCollect()">
          <i class="iconfont icon-shoucang"></i>
          <span>我的收藏</span>
        </div>
        <div class="download" @touchstart='notComplete'>
          <i class="iconfont icon-xiazai"></i>
          <span>离线下载</span>
        </div>
      </div>
    </div>
    <div class="homepage" @touchstart="toIndex()">
      <i class="iconfont icon-Home"></i>
      <span>首页</span>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    toCollect() {
        this.$router.push('/collect')
    },
    toIndex(){
      this.$router.push('/index')
    },
    move(e){
      e.preventDefault()
    },
    notComplete () {
      this.$toast({
        message: '你对本仙女要求也太高了叭！！！哼(￣——￣)～',
        duration: 600
      })
    },
    notComplete1(){
      this.$toast({
        message: '小傻逼，叫你登你还真的登录啊！笨蛋',
        duration: 600
      })
    }
  },
  mounted() {}
};
</script>
<style lang='stylus' scoped>
.sidebar {
  position: absolute;
  left: 0;
  top: 0;
  background: #ffffff;
  width: 6rem;
  height: 100vh;
  overflow: scroll;
  z-index: 30;

  .top {
    height: 2.5rem;
    background: #00a2ed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .user {
      display: flex;
      align-items: center;
      padding-left: 0.3rem;
      height: 1rem;

      .icon-denglu {
        font-size: 0.78rem;
        background: #e0e0e0;
        color: #fff;
        border-radius: 50%;
        margin-right: 0.3rem;
        display: inline-block;
        width: 0.7rem;
        height: 0.7rem;
        text-align: left;
        line-height: 0.56rem;
        vertical-align: top;
      }

      span {
        color: #ffffff;
        font-size: 0.4rem;
      }
    }

    .content {
      display: flex;
      align-items: center;
      height: 1.4rem;
      padding-left: 0.5rem;

      .collect {
        color: #ffffff;

        i {
          font-size: 0.35rem;
          margin-right: 0.35rem;
        }

        span {
          font-size: 0.35rem;
        }
      }

      .download {
        color: #ffffff;
        margin-left: 0.7rem;

        .icon-xiazai {
          font-size: 0.35rem;
          margin-right: 0.35rem;
        }

        span {
          font-size: 0.35rem;
        }
      }
    }
  }

  .homepage {
    height: 1rem;
    padding-left: 0.5rem;
    display: flex;
    align-items: center;
    background: #f0f0f0;
    color: #00a2ed;

    .icon-Home {
      font-size: 0.65rem;
      margin-right: 0.35rem;
    }

    span {
      font-size: 0.4rem;
    }
  }
}
</style>