<template>
  <div class="book_detail"> 

    <detail-header :title="title"></detail-header>

    <search></search>
  
    <book-list  :bookList='books'></book-list>

  </div>
</template>

<script>
  import detailHeader from '../components/detailHeader' 
  import bookList from '../components/bookList' 
  import search from '../components/search'

  export default {
    data (){
      return {
        books: {},
        title: null
      }     
    },   
    created () { 
      this.title = this.$route.query.title;
      this.getBookDetail(this.title)
    },
    methods: {
      getBookDetail (title) {    
        this.$http.get(`/api/search?title=${title}`).then(response =>{  
          this.books = response.body;    
        })
      }
    },
    watch: {
      // 切换页面
      '$route' (to, from) {  
        if(to.params && to.query.title){
          this.getBookDetail (to.query.title)
        } 
          // 如果是当前页面切换分类的情况 
      }
    },
    components: {detailHeader,bookList,search}
  }
</script>

<style lang="less">

 
</style>