<template>
  <div id="app">
    <header-nav></header-nav>

    <div class="hotBook">
      <div class="t_thed">
        <h4>热门小说 </h4>
      </div>
      <book-list></book-list>
    </div>
  </div>
</template>

<script>
  import headerNav from './components/header'
  import bookList from './components/bookList'

  export default {
    components: {
      headerNav,
      bookList
    }
  }
</script>

<style scoped lang="less">
  .hotBook{
    width: 100%;  

  }

  .block_bd_box {
    clear: both;
    padding: 0 0 0 10px;
  }

  .t_thed{
    text-align: left;
    font-size: 13px;
    padding: 15px 10px 15px 10px;
  }
</style>
