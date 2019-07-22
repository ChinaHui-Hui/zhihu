<template>
  <li @touchstart="start($event)" @touchmove="move($event)" @touchend="end(li.id)">
    <p>{{li.title}}</p>
    <img :src="li.images" alt />
  </li>
</template>
<script type='text/ecmascript-6'>
export default {
  components: {},
  props: ["li"],
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    start(e) {
      this.startY = e.touches[0].clientY;
      this.endY = 0;
    },
    move(e) {
      // console.log('移动')
      this.endY = e.touches[0].clientY;
    },
    end(id) {
      // console.log("点击");
      if (this.endY == 0) {
        this.$router.push("/details?id=" + id);
        return;
      }
    }
  },
  mounted() {}
};
</script>
<style lang='stylus' scoped>
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
</style>