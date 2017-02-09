<template>
  <div class="App"> 
    <div class="main" v-show="!loading">
      <router-view></router-view>
    </div>
    <div class="loading" v-if="loading">
      <div style="text-align: center; margin-top: 150px"><p style="margin: 0; padding: 0.2em 0.3em 0.2em 0">
        <!--<img src="http://static.m.maizuo.com/v4/static/pure/image/global/loading/projector-d71dfe7c77.gif" alt="加载中..." style="zoom: 0.5">-->
        </p><p style="margin: 0; padding: 0.2em 0 0.2em 1em;font-size:12px;color: #777">正在加载，请稍候...</p>
      </div>
    </div> 
  </div> 
  
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    loading: 'getLoading'
  })
}

</script>
<style lang="less">   
  .loading{
    position: fixed;
    top:0;
    left:0;
    right:0; 
    height: 100%;
    background: #f7f7f7;
    overflow-y: hidden; 
  }
 </style>