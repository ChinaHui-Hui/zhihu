<template>
  <div class="wrapper">
    <link rel="stylesheet" href="http://news.at.zhihu.com/css/news_qa.auto.css?v=1edab" />
    <!-- 头部 -->
    <transition>
      <div class="header">
        <div class="left"  @click='$router.push("/index")'>
          <v-back></v-back>
        </div>
        <div class="right">
          <div class="icon">
            <span class="iconfont icon-fenxiang" @touchstart.stop="shareIsShow=true"></span>
            <span :class="[isCollect?'iconfont icon-shoucang-copy collect' : 'iconfont icon-shoucang-copy']"
              @touchstart.stop="collect()" @touchstart='notComplete'></span>
            <span class="iconfont icon-pinglun-copy" @touchstart="toComent"><i>{{allComtents}}</i></span>
            <span class="iconfont icon-dianzan" @touchstart='dianzan'><i>{{popularity}}</i></span>
          </div>
        </div>
      </div>
    </transition>

    <!-- 展示图 -->
    <div class="banner">
      <img :src="list.image" alt />
      <p class="title">{{list.title}}</p>
      <span class="source">{{list.image_source}}</span>
      <div class="mask"></div>
    </div>

    <!-- 内容详情 -->
    <div v-html="body"></div>

    <!-- 分享 -->
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="maskShare" v-show="shareIsShow" @touchstart.self="show">
        <v-share v-show="shareIsShow"></v-share>
      </div>
    </transition>
  </div>
</template>
<script type='text/ecmascript-6'>
import API from "../../common/API";
import vShare from "../views/share";
export default {
  components: {
    vShare
  },
  props: {},
  data() {
    return {
      body: "",
      list: [],
      isCollect: false,
      info: {},
      shareIsShow: false,
      allComtents:'', // 总评论数
      popularity:'', // 点赞总数
    };
  },
  watch: {

  },
  computed: {},
  methods: {
    // 点击收藏
    collect() {
      this.isCollect = !this.isCollect;
      if (this.isCollect) {
        // 如果收藏
        var arr = localStorage.getItem("collect") ? JSON.parse(localStorage.getItem("collect")) : [];
        arr.push({
          id: this.info.id,
          title: this.info.title,
          images: this.info.images
        });
        localStorage.setItem("collect", JSON.stringify(arr));
      } else {
        // 取消收藏
        var arr = localStorage.getItem("collect") ? JSON.parse(localStorage.getItem("collect")) : [];
        var num = -1;
        for (var i = 0; i < arr.length; i++) {
          // 遍历这个数组
          if (arr[i].id == this.info.id) {
            // 如果遍历数组中，发现这个数组中的某一个的id就等于info的id,那么就删掉这个
            num = i;
            break;
          }
        }
        arr.splice(num, 1);
        localStorage.setItem("collect", JSON.stringify(arr));
      }
    },
    // 点击展示分享
    show() {
      this.shareIsShow = false;
    },
    // 去评论页面
    toComent() {
      var id = this.$route.query.id;
      // console.log(id)
      this.$router.push("/comment?id=" + id);
    },
    // 收藏成功提示信息
    notComplete () {
      this.$toast({
        message: '收藏成功',
        duration: 600
      })
    },
    // 点赞
    dianzan(){
      this.$toast({
        message: '+1',
        iconClass: 'iconfont icon-dianzan'
      });
      // this.popularity = this.popularity+1;
      
    }
  },
  mounted() {
    var id = this.$route.query.id;
    this.$http({
      url: API.newsDetails + "/" + id
    }).then(d => {
      this.body = d.data.body;
      this.list = d.data;
      // console.log(d);
      if (id == d.data.id) {
        this.info = {
          id: d.data.id,
          title: d.data.title,
          images: d.data.image
        };
      }
      // 首先看localStorage中有没有collect
      var arr = localStorage.getItem("collect")
        ? JSON.parse(localStorage.getItem("collect"))
        : [];
      this.isCollect = arr.some(item => item.id == id);
    });
    this.$http({
      url:API.extraNews +'/'+id
    }).then(d=>{
      // console.log(d)
      this.allComtents = d.data.comments
      this.popularity = d.data.popularity
    })
  }
};
</script>
<style lang='stylus' scoped>
@import '../../stylus/index.styl';

.wrapper {
  .header {
    .left {
      flex: 0 0 50px;
      width: 50px;
      text-align: center;
    }

    .right {
      flex: 1;
      margin-right: 0.3rem;

      .icon {
        float: right;
        line-height: 1rem;
        height: 100%;

        span {
          display: inline-block;
          margin: 0 0.2rem;
          font-size: 0.4rem;
          vertical-align: middle;
          height: 100%;

          &:nth-child(2) {
            font-size: 0.7rem;
          }

          &:nth-child(3) {
            font-size: 0.35rem;
          }

          i {
            vertical-align: baseline;
            font-size: 0.3rem;
            padding-left: 0.15rem;
          }
        }

        .collect {
          color: yellow;
        }

       
      }
    }
  }

  .banner {
    width: 100vw;
    height: 4rem;
    margin-top: 1rem;
    position: relative;

    // margin-top 1rem
    img {
      width: 100%;
      height: 100%;
    }

    .title {
      position: absolute;
      left: 0;
      bottom: 0.6rem;
      color: #fff;
      font-size: 0.45rem;
      line-height: 0.6rem;
      padding-left: 0.4rem;
      z-index: 3;
      margin: 0 !important;
    }

    .source {
      position: absolute;
      right: 0.2rem;
      bottom: 0.2rem;
      font-size: 0.32rem;
      opacity: 0.7;
      color: #fff;
      z-index: 3;
    }

    .mask {
      position: absolute;
      width: 100%;
      height: 4rem;
      left: 0;
      top: 0;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
      z-index: 2;
    }
  }

  >>> .headline {
    display: none;
  }

  .maskShare {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    z-index: 15;
  }
}
</style>