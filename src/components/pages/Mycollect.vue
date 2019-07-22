<template>
  <div class="wrapper">
    <div class="header">
      <i class="iconfont icon-mulu" @touchstart="isShow=true"></i>
      <span>{{collectArr.length}}&nbsp;条收藏</span>
    </div>

    <!-- 收藏列表 -->
    <div class="new">
      <ul class="layout">
        <v-list  v-for="item in collectArr" :key="item.id" :li="item"></v-list>
      </ul>
    </div>

    <!-- 侧边栏 -->
    <transition>
      <div enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
        <div class="sideMask" v-if="isShow" @touchstart.self="isShow=false">
          <v-sider></v-sider>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type='text/ecmascript-6'>
import API from "../../common/API";
import vSider from "../views/sider";
import vList from '../views/list'
export default {
  components: {
    vSider,
    vList
  },
  props: {},
  data() {
    return {
      collectArr: [],
      isShow:false,
      id:''
    };
  },
  watch: {},
  computed: {},
  methods: {
    // toDetail(id) {
    //   this.$router.push("/details?id=" + id);
    // },
    start(e) {
      this.startY = e.touches[0].clientY;
      this.endY = 0;
    },
    move(e) {
      // console.log('移动')
      this.endY = e.touches[0].clientY;
    },
    end(comId) {
      // console.log("点击");
      if (this.endY == 0) {
        this.$router.push("/details?id=" + comId);
        return;
      }
    }
  },
  mounted() {
    var arr = localStorage.getItem("collect");
    arr = JSON.parse(arr);
    // console.log(arr)
    this.collectArr = arr;
    // console.log(this.collectArr)
    for(let i=0;i<this.collectArr.length;i++){
      return this.id=this.collectArr[i].id
      // console.log(this.id)
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../stylus/index.styl';

.wrapper {
  .header {
    i {
      font-size: 0.5rem;
      margin-left: 0.4rem;
      margin-right: 0.5rem;
    }

    span {
      font-size: 0.35rem;
    }
  }

  .new {
    background: #f3f3f3;
    padding-bottom: 0.25rem;
    margin-top: 1rem;
    padding-top 0.2rem

    .layout {
      margin: 0 0.23rem;

      li {
        background: #fff;
        margin-bottom: 0.21rem;
        padding: 0.39rem 0.45rem;
        box-shadow: 0rem 0.01rem 0.01rem #dad9d9;
        display: flex;
        box-sizing: border-box;
        border-radius: 0.2rem;

        p {
          flex: 1;
          font-size: 0.35rem;
          line-height: 0.5rem;
          color: #737373;
          height: 1.6rem;
        }

        img {
          width: 1.8rem;
          height: 1.6rem;
        }
      }
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
}
</style>