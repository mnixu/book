<template>
  <div id="app">
    <header-nav></header-nav>

    <book-list thed='热门小说' :bookList='hotBook'></book-list>

    <book-list thed='强推小说' :bookList='hotBook'></book-list>
 
    <tab-nav :classItem="['日榜','周榜','月榜']"></tab-nav>

    <book-top></book-top>

  </div>


</template>

<script>
  import headerNav from './components/header'
  import bookList from './components/bookList'
  import tabNav from './components/tabNav1' 
  import bookTop from './components/bookTop'
   
  export default {
    
    data (){
      return { 
        hotBook:[{image:"http://image.cmfu.com/Books/2673646/2673646.jpg",title:"黑铁之堡",author:"醉虎"},
                  {image:"http://image.cmfu.com/Books/2673646/2673646.jpg",title:"黑铁之堡",author:"醉虎"},
                  {image:"http://image.cmfu.com/Books/2673646/2673646.jpg",title:"黑铁之堡",author:"醉虎"},]
      }
    },
    components: {
      headerNav,
      bookList,
      tabNav, 
      bookTop
    } 
  }
</script>

<style scoped lang="less"> 
  #app {
    background: #f7f7f7;
  }

</style>