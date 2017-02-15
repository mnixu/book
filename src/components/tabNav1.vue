<template>
  <div class="book">
  <div v-if="thed" class="t_thed">
    <h4>{{thed}}</h4>
  </div>
  <div class="tab-nav">
    <div class="nav-item" v-for="(item,idx) in classItem" :class="{active: index==idx }" @click="addActive(idx)">
      {{ item }}
    </div>
    <div class="tab-ink-bar" :class="barClass" :style="barStyle"></div>
  </div>
  </div> 
</template>

<script>
 
export default { 
  props: ['thed','classItem'],
  ready () {
    // stop bar anmination on first loading
    setTimeout(() => {
      this.hasReady = true
    }, 0)
  },
  computed: {
    barLeft () {
      return `${this.index * (100 / this.length )}%`
    },
    barRight () {
      return `${(this.length - this.index - 1) * (100 / this.length)}%`
    },
    barStyle () {
      return {
        left: this.barLeft,
        right: this.barRight,
        display: 'block',
        backgroundColor: "rgb(4, 190, 2)",
        height:  '3px', 
      }
    },
    barClass () {
      return {
        'tab-ink-bar-transition-forward': this.direction === 'forward',
        'tab-ink-bar-transition-backward': this.direction === 'backward'
      }
    }
  }, 
  data () {
    return {
      direction: 'forward',
      right: '100%',
      hasReady: false,
      index: 0,
      length: this.classItem.length
    }
  },  
  watch: {
    index (newIndex, oldIndex) {
      this.direction = newIndex > oldIndex ? 'forward' : 'backward' 
    }
  },
  methods: {
    addActive (index){
      this.index = index; 
      this.$emit("clickTab",index)
    }
  }
}

</script>

<style lang="less" scoped>
  @prefixClass: tab;
  @easing-in-out: cubic-bezier(0.35, 0, 0.25, 1);
  @effect-duration: .3s;
  .@{prefixClass}{
    &-ink-bar {
      position: absolute;
      height: 2px;
      bottom: 0;
      left: 0;
      &-transition-forward {
        transition: right @effect-duration @easing-in-out, left @effect-duration @easing-in-out @effect-duration * 0.3;
      }
      &-transition-backward {
        transition: right @effect-duration @easing-in-out @effect-duration * 0.3, left @effect-duration @easing-in-out;
      }
    }
  }
  .book {
    width: 100%;
    background: #fff;
  }

  .t_thed {
    text-align: left;
    font-size: 13px;
    padding: 15px 10px 15px 10px;
  }
  
  .active {
    border: none;
    color: rgb(4, 190, 2) !important;
  }
  
  .tab-nav {
    display: flex;
    background-color: #fff;
    height: 44px;
    position: relative;
  }
  
  .nav-item {
    flex: 1;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: -webkit-linear-gradient(top, #e5e5e5, #e5e5e5, hsla(0, 0%, 90%, 0)) 0 100% no-repeat;
    background: linear-gradient(180deg, #e5e5e5, #e5e5e5, hsla(0, 0%, 90%, 0)) 0 100% no-repeat;
    background-size: 100% 1px;
    font-size: 16px;
    text-align: center;
    line-height: 44px;
    color: #666;
  }
  
  .tab-ink-bar {
    position: absolute;
    height: 2px;
    bottom: 0;
    left: 0;
  }
  
  .content {
    position: relative;
    width: 100%;
  }
  
  .vue-swip {
    overflow: hidden;
    position: relative;
  }
  
  .vux-swiper-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .tab-swiper {
    background-color: #fff;
    height: 100px;
  }
  
  .vux-center {
    justify-content: center;
  }
</style>