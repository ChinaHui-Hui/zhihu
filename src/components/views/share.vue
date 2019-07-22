<template>
  <!-- 分享 -->
  <div class="share">
    <h3>分享</h3>
    <div class="shareCon">
      <div class="item" @touchstart='notComplete'>
        <i class="iconfont icon-xinlangweibo"></i>
        <p>新浪微博</p>
      </div>
      <div class="item" @touchstart='notComplete'>
        <i class="iconfont icon-weixin"></i>
        <p>微信</p>
      </div>
      <div class="item" @touchstart='notComplete'>
        <i class="iconfont icon-weixinpengyouquan"></i>
        <p>微信朋友圈</p>
      </div>
      <div class="item" @touchstart='notComplete'>
        <i class="iconfont icon-fenxiang_yinxiangbiji"></i>
        <p>印象笔记</p>
      </div>
      <div class="item" @touchstart='notComplete'>
        <i class="iconfont icon-youdaoyunbiji"></i>
        <p>有道云笔记</p>
      </div>
      <div class="item" @touchstart='notComplete'>
        <i class="iconfont icon-qq-copy"></i>
        <p>QQ</p>
      </div>
      <div class="item" @touchstart='notComplete'>
        <i class="iconfont icon-gengduo1"></i>
        <p>更多平台</p>
      </div>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
export default {
  components: {},
  props: ["isShow"],
  data() {
    return {
      closeShare: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    notComplete() {
      this.$toast({
        message: "别点啦，我不会的，（づ￣3￣）づ╭❤～",
        duration: 600
      });
    }
  },
  mounted() {}
};
</script>
<style lang='stylus' scoped>
.share {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  padding: 0.5rem;
  box-sizing: border-box;
  box-shadow: 0 0.01333333rem 0.13333333rem #000;
  width: 6rem;
  border-radius: 0.13333333rem;

  h3 {
    font-size: 0.5rem;
    margin-bottom: 0.3rem;
    display: flex;
    align-items: center;
    font-size: 0.53333333rem;
    font-weight: bold;
  }

  .shareCon {
    display: flex;
    flex-wrap: wrap;

    .item {
      width: 33.3%;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #606060;
      margin-bottom: 0.4rem;

      i {
        width: 0.5rem;
        height: 0.5rem;
        margin-bottom: 0.2rem;
        line-height: 0.5rem;
        text-align: center;
        font-size: 0.7rem;

        &.icon-xinlangweibo {
          color: tomato;
        }

        &.icon-weixin {
          color: green;
        }

        &.icon-weixinpengyouquan {
          color: green;
          font-size: 0.8rem;
        }

        &.icon-fenxiang_yinxiangbiji {
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 0.1rem;
          color: green;
        }

        &.icon-youdaoyunbiji {
          color: skyblue;
        }

        &.icon-qq-copy {
          color: blue;
        }

        &.icon-gengduo1 {
          font-size: 0.6rem;
          color: skyblue;
        }
      }

      >>> p {
        font-size: 0.25rem;
        line-height: 0;
        color: #606060;
        margin: 0.2rem !important;
      }
    }
  }
}
</style>