<template>
  <div class="wrapper">
    <!-- 头部 -->
    <div class="header">
      <div class="left"  @touchstart.stop='$router.push("/details?id="+backId)'>
        <v-back class="back" ></v-back>
        <span>{{allNum}}&nbsp;条点评</span>
      </div>
      <div class="right" @touchstart='notComplete'>
        <span class="iconfont icon-pingfen"></span>
      </div>
    </div>

    <!-- 长评论 -->
    <div class="longCom com">
      <div class="top">
        <span>{{longNum}}&nbsp;条长评</span>
      </div>
      <!-- 具体长评论 -->
      <div class="short-con" v-for="item in longArr" :key="item.id">
        <!-- 头像 -->
        <div class="head-pic">
          <img :src="item.avatar" alt />
        </div>
        <!-- 内容+作者+事件 -->
        <div class="con-detail">
          <div class="author">{{item.author}}</div>
          <div class="main-con">{{item.content}}</div>
          <div class="time">{{item.time|time}}</div>
        </div>
        <!-- 点赞 -->
        <div class="like">
          <i class="iconfont icon-dianzan"></i>
          <span>{{item.likes}}</span>
        </div>
      </div>
    </div>

    <!-- 短评论 -->
    <div class="com">
      <div class="top">
        <span>{{shortNum}}&nbsp;条短评</span>
      </div>
      <!-- 具体短评论 -->
      <div class="short-con" v-for="item in shortArr" :key="item.id">
        <!-- 头像 -->
        <div class="head-pic">
          <img :src="item.avatar" alt />
        </div>
        <!-- 内容+作者+事件 -->
        <div class="con-detail">
          <div class="author">{{item.author}}</div>
          <div class="main-con">{{item.content}}</div>
          <div class="time">{{item.time|time}}</div>
        </div>
        <!-- 点赞 -->
        <div class="like">
          <i class="iconfont icon-dianzan"></i>
          <span>{{item.likes}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import API from "../../common/API";
export default {
  components: {},
  props: {},
  data() {
    return {
      longArr: [],
      shortArr: [],
      shortNum: "", // 短评论
      longNum: "",  // 长评论
      allNum: "",   // 总评论数
      time: "",
      backId:''
    };
  },
  watch: {},
  computed: {},
  filters: {
    time(t) {
      var date = new Date(t);
      var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate();
      var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return `${month}-${day} ${hour}:${minute}:${second}`;
    }
  },
  methods: {
    notComplete() {
      this.$toast({
        message: "别点啦，我不会的，（づ￣3￣）づ╭❤～",
        duration: 600
      });
    }
  },
  mounted() {
    this.backId = this.$route.query.id;
    var id = this.$route.query.id;
    this.$http({
      url: API.longComment + "/" + id + "/" + "long-comments"
    }).then(d => {
      this.longArr = d.data.comments;
      // console.log(d);
    });
    this.$http({
      url: API.shortComment + "/" + id + "/" + "short-comments"
    }).then(d => {
      this.shortArr = d.data.comments;
    });
    this.$http({
      url:API.extraNews +'/'+id
    }).then(d=>{
      // console.log(d)
      this.allNum = d.data.comments
      this.longNum = d.data.long_comments
      this.shortNum = d.data.short_comments
    })
  }
};
</script>
<style lang='stylus' scoped>
@import '../../stylus/index.styl';

.wrapper {
  .left {
    width: 2.7rem;
    text-align: center;

    .back {
      display: inline-block;
      margin-right: 0.5rem;
      padding-left: 0.2rem;
    }

    span {
      font-size: 0.35rem;
    }
  }

  .right {
    flex: 1;
    text-align: right;
    margin-right: 0.3rem;

    span {
      font-size: 0.5rem;
    }
  }

  .longCom {
    width: 100%;
    // height: 100vh;
    margin-top: 1.1rem;

    .top {
      border-top: none !important;
    }
  }

  .com {
    .top {
      height: 1rem;
      font-size: 0.35rem;
      line-height: 0.4rem;
      padding-left: 0.4rem;
      display: flex;
      align-items: center;
      border-top: 0.02666667rem solid #dcdcdc;
      border-bottom: 0.02666667rem solid #dcdcdc;
      color: #333333;
    }

    .short-con {
      display: flex;
      padding: 0.4rem 0.8rem 0.4rem 0.4rem;
      font-size: 0.3rem;
      line-height: 0.7rem;
      position: relative;

      .head-pic {
        width: 0.6rem;
        margin-right: 0.5rem;

        img {
          display: inline-block;
          border-radius: 50%;
          width: 100%;
        }
      }

      .con-detail {
        webkit-box-flex: 1;
        flex-grow: 1;
        width: 0.01333333rem;

        .author {
          font-weight: bold;
          margin-bottom: 0.26666667rem;
        }

        .time {
          font-size: 0.3rem;
          color: #afafaf;
          margin-top: 0.53333333rem;
        }
      }

      .like {
        position: absolute;
        right: 0.4rem;
        top: 0.45333333rem;
        font-size: 0.3rem;
        line-height: 0.4rem;
        color: #b8b8b8;
      }
    }
  }
}
</style>