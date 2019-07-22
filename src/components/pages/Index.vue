<template>
  <div class="wrapper" v-if="newsArr.length>0">
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <span class="iconfont icon-mulu" @touchstart.self="isShow=true"></span>
        <span class="message">{{title}}</span>
      </div>
      <div class="right">
        <span class="iconfont icon-tongzhi" @touchstart='notComplete1'></span>
        <span class="iconfont icon-gengduo" @touchstart.self='isClose=true'></span>
      </div>
    </div>

    <!-- 轮播 -->
    <mt-swipe :auto="4000" class="swiper">
      <mt-swipe-item v-for="item in swiper" :key="item.id">
        <img :src="item.image" alt />
        <p class="title">{{item.title}}</p>
        <div class="mask"></div>
      </mt-swipe-item>
    </mt-swipe>

    <!-- 新闻 -->
    <div class="news" v-for="item in newsArr" :key="item.id">
      <h3 class="day-title">{{item.title}}</h3>
      <ul class="layout">
        <v-list v-for="subItem in item.dStories" :key="subItem.id" :li="subItem"
       
        ></v-list>
      </ul>
    </div>

    <!-- 侧边栏 -->
    <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
      <div class="sideMask"  v-if="isShow" @touchstart.self="isShow=false">
        <v-sider v-if='isShow'></v-sider>
      </div>
    </transition>

    <!-- 夜间模式 -->
    <div class="more-mask" v-if='isClose' @touchstart.self='isClose=false'>
      <div class="more-block">
        <div class="more-item" @touchstart.stop='notComplete'>
          <span>夜间模式</span>
        </div>
        <div class="more-item" @touchstart.stop='notComplete'>
          <span>设置选项</span>
        </div>
      </div>
    </div>

  </div>
</template>
<script type='text/ecmascript-6'>
import vList from "../views/list";
import vSider from "../views/sider";
import API from "../../common/API";
Date.prototype.getWeek = function () {
  var arr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
  return arr[this.getDay()]
}
function getTime(n){
  // 今天的毫秒数
  var nowTimestamp = new Date().getTime()
  // 展示事件的毫秒数
  var showTimestamp = new Date(nowTimestamp-n*24*60*60*1000);
  var showMonth = showTimestamp.getMonth()+1<10?"0"+(showTimestamp.getMonth()+1):showTimestamp.getMonth()+1
  var showDate = showTimestamp.getDate()<10?"0"+showTimestamp.getDate(): showTimestamp.getDate()
  var showWeek = showTimestamp.getWeek()
  var show = `${showMonth}月${showDate}日 ${showWeek}`

  // 请求数据的时间
  var requestTime = new Date(showTimestamp-(n-1)*24*60*60*1000)
  var requestYear = requestTime.getFullYear();
  var requeatMonth = requestTime.getMonth()+1<10?"0"+(requestTime.getMonth()+1):requestTime.getMonth()+1
  var requestDate = requestTime.getDate()<10?"0"+requestTime.getDate():requestTime.getDate()
  var request = `${requestYear}${requeatMonth}${requestDate}`
  
  // 返回数据
  return {
    show,
    request
  }
};
function stop(){ 
  var locked = false;
  window.addEventListener('touchmove', function(ev){
    locked || (locked = true, window.addEventListener('touchend', stopTouchend, true));
  }, true);
  function stopTouchend(ev){
    ev.stopPropagation();
    window.removeEventListener('touchend', stopTouchend, true);
    locked = false;
    }
}

export default {
  components: {
    vList,
    vSider
  },
  props: {},
  data() {
    return {
      swiper: [],
      newsArr: [],
      startY: 0,
      endY: 0,
      num: 0,
      canload: true,
      isShow: false,
      newsId: "",
      isClose:false,
      title:'首页'
    };
  },
  watch: {},
  computed: {},
  methods: {
   
     getBefore(n){
      this.$http({
        url:API.oldNews+'/'+getTime(n).request
      }).then(d=>{
        // console.log(d)
        console.log(d)
        this.canload=true
        this.newsArr.push({
          title:getTime(n).show,
          dStories: d.data.stories
        })
      })
    },

    notComplete () {
      this.$toast({
        message: '要求真多，上辈子是个麻烦精吧你，我就不做，略略略~~~',
        duration: 600
      })
    },
    notComplete1 () {
      this.$toast({
        message: '_φ(❐_❐✧ 人丑就要多读书',
        duration: 600
      })
    },
  },
  mounted() {
    this.$http({
      url: API.news
    }).then(d => {
      this.swiper = d.data.top_stories;
      var json = {
        title: "今日新闻",
        dStories: d.data.stories
      };
      this.newsArr.push(json);
      this.newsId = this.newsArr.id;
      // console.log(d);
    });

    window.onscroll =()=>{
      var wh = document.documentElement.clientHeight
      var dh = document.documentElement.offsetHeight
      var sh = document.documentElement.scrollTop||document.body.scrollTop
      if(wh+sh+80>dh&&this.canload){
        this.canload=false
        this.num++
        this.getBefore(this.num)
      }

      // 改变顶部
      var dayTitle = document.querySelectorAll('.day-title')
      var header = document.querySelector('.header')
      // console.log(header.clientHeight)
      var dayTitleLen = []
      for(var i=0;i<dayTitle.length;i++){
        dayTitleLen.push(dayTitle[i].getBoundingClientRect().top)
      }
      // console.log(dayTitleLen)
      for(var i=0;i<dayTitleLen.length;i++){
        if(dayTitleLen[i]<=header.clientHeight){
          this.title = dayTitle[i].innerHTML
        }
        if(dayTitleLen[0]>header.clientHeight){
          this.title = '首页'
        }
      }
    }
    
  }
}
</script>
<style lang='stylus' scoped>
@import '../../stylus/index.styl';

.wrapper {
  width: 100%;

  .header {
    .left {
      padding-left: 0.55rem;

      span {
        margin-right: 0.55rem;
      }

      .icon-mulu {
        font-size: 0.5rem;
        vertical-align: middle;
      }

      .message {
        font-size: 0.4rem;
        vertical-align: middle;
      }
    }

    .right {
      flex: 1;
      text-align: right;
      padding-right: 0.3rem;

      .icon-tongzhi {
        vertical-align: middle;
        font-size: 0.5rem;
        margin-right: 0.4rem;
      }

      .icon-gengduo {
        vertical-align: middle;
        font-size: 0.5rem;
      }
    }
  }

  .swiper {
    margin-top: 1rem;
    width: 100vw;
    height: 4rem;
    position: relative;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5));

    img {
      width: 100%;
      height: 100%;
      vertical-align: top;
    }

    .title {
      position: absolute;
      left: 0;
      bottom: 0.5rem;
      color: #ffffff;
      font-size: 0.45rem;
      line-height: 0.6rem;
      margin: auto 0.3rem;
      z-index: 2;
    }

    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
    }

    >>> .mint-swipe-indicator {
      background: #88878d;
      opacity: 1;
      z-index: 2;
    }

    >>> .is-active {
      opacity: 1;
      background: #fff;
    }
  }

  .news {
    background: #f3f3f3;
    padding-bottom: 0.25rem;

    h3 {
      height: 1rem;
      line-height: 1rem;
      padding-left: 0.22rem;
      color: #333;
      font-size: 0.3rem;
    }
  }

  .sideMask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
  }

  .more-mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    .more-block {
      width: 3.5rem;
      background: #fff;
      border-radius: 0.1rem;
      position: absolute;
      top: 0.1rem;
      right: 0.08rem;
      font-size: 0.34rem;
      .more-item {
        height: 1rem;
        padding: 0 0.32rem;
        display: flex;
        align-items: center;
      }
    }
  }

  .layout {
    margin: 0 0.23rem;
  }
}
</style>