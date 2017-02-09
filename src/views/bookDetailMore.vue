<template>
  <div class="title">
    <detail-header title="目录"></detail-header>
 
    <div class="title_more" v-if="books.title">
      <ul>
         <!--<li><h2>目录</h2></li>-->
         <li v-for="book in books.books"> 
          <router-link :to='"/detailMore/book/"+book.url.split("/")[3]'> 
            {{book.title}} 
          </router-link>
         </li> 
      </ul>
    </div>
  </div>
</template>

<script>
  import detailHeader from '../components/detailHeader' 
  import common from '../common.js'

  export default {
    data (){
      return {
        books: {}
      }     
    },  
    mounted() {  
      let bookContent = window.sessionStorage.bookContent
      if (bookContent && JSON.parse(bookContent).id == this.$route.params.id){
        this.books = JSON.parse(bookContent).books 

        setTimeout(() =>{
          document.body.scrollTop = (JSON.parse(bookContent).scroll)
        }, 300)
        
      }else{
        this.getBookDetail(this.$route.params.id) 
      }
    }, 
    beforeRouteEnter(to, from, next) { 
      if (from.name !== 'content') {
        // 页面切换移除之前记录的数据集
        if (window.sessionStorage.bookContent) {
            window.sessionStorage.removeItem('bookContent'); 
        }
      }
      next();
    },
    beforeRouteLeave(to, from, next) { 
      // 如果跳转到详情页面，则记录关键数据
      // 方便从详情页面返回到该页面的时候继续加载之前位置的数据
      if (to.name === 'content') { 
          // 当前页面主题数据 
        let scroll = common.getScrollTop();
        window.sessionStorage.bookContent = JSON.stringify({
          id: from.params.id,
          books: this.books,
          scroll: scroll
        }); 
          
      } 
      next();
    },
    created () {
        //this.getBookDetail(this.$route.params.id)
    },
    methods: {
      getBookDetail (id) {
        this.$store.commit('START_LOADING')  
        this.$http.get(`/api/bookDetail?id=${id}`).then(response =>{  
          this.books = response.body;  
          this.$store.commit('FINISH_LOADING') 
        })
      }
    },
    components: {detailHeader}
  }
</script>

<style scoped lang="less">
.title_more{ 
  ul { 
    list-style-type: none; 
    padding:10px
  } 
  ul li {
    height: 40px;
    line-height: 40px;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;  
    border-bottom: 1px solid #f7f7f7;
  }
  a{
    color: #8c8c8c;
  }
}
</style>