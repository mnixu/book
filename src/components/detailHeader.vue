<template>
    <header class="nav-header">
      <a class="return"  @click="routerBack"><span>返回</span></a>
      <h1>{{title}}</h1> 
      <a class="home" href="/"><span>首页</span></a>
    </header>
</template>

<script>
  export default {
    props:['title'],
    methods:{
      routerBack(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="less">
.nav-header{
  height: 45px;
  line-height: 45px;
  padding: 0 10px;
  background: #fcfcfc;
  border-bottom: 2px solid #e9e9e9;
  h1{  
    position: absolute;
    left: 40px;
    right: 45px;
    height: 45px;
    line-height: 45px;
    font-weight: normal;
    overflow: hidden;
    text-align: center;
    font-size: 1.125rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    top: 0;
    z-index: 2;
  }
}
.return{
    position: absolute;
    display: block;
    width: 30px;
    height: 45px;
    left: 10px;
    z-index: 3;

    span{ 
      display: block;
      width:30px;
      height: 45px; 
      background: url(http://m.qidian.com/images/2014/m_icobg.png) no-repeat scroll 0 -118px; 
      background-size: cover;
      text-indent: -9999px; 
    }
}
.home{
    position: absolute;
    right: 10px;
    width: 35px;
    color:rgb(4, 190, 2)
} 
</style>