<template>
  <div class="content">
    <h3>{{books.title}}</h3> 
    <div v-html="books.content">
    </div> 
    <div class="book_switch" style="">
      <ul class="clearfix">
          <li><router-link :to='"/detailMore/book/"+books.lastBook'>上一章</router-link></li> 
          <li><router-link :to='"/detailMore/"+books.allBooks'>查看目录</router-link></li>
          <li><router-link :to='"/detailMore/book/"+books.nextBook'>下一章</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import detailHeader from '../components/detailHeader'
  export default {
    data (){
      return {
        books: {} 
      }     
    },  
    // beforeRouteEnter(to, from, next){   
    //   next(vm => {  
    //     vm.$store.commit('START_LOADING')
    //     vm.$http.get(`/api/content?id=${vm.$route.params.id}`).then(response =>{  
    //       vm.books = response.body;   
    //       vm.$store.commit('FINISH_LOADING') 
    //     }) 
    //   })
    // }, 
    
    created () {
        this.getBookDetail(this.$route.params.id)
    },
    methods: {
      getBookDetail (id) {
        this.$store.commit('START_LOADING') 
        this.$http.get(`/api/content?id=${id}`).then(response =>{  
          this.books = response.body;   
          this.$store.commit('FINISH_LOADING') 
        })
      }, 
    },
    watch: {
      // 切换页面
      '$route' (to, from) { 
        if(to.params && to.params.id){
          this.getBookDetail (to.params.id)
        } 
          // 如果是当前页面切换分类的情况 
      }
    } 
  }
</script>

<style scoped lang="less">
.content{
  padding:0 10px 10px 10px;
      word-break: break-all;
 h3 {
    text-align: center;
    padding: 30px 5px 10px 5px;
  }
}
.book_switch{
  
  padding:10px 0 0 0;
  ul { 
    list-style-type: none; 
  } 
  ul li { 
    float: left;
    width: 33%;
    text-align: center
  }
  a{
    color: #09b396;
    border: 1px solid #09b396;
    display: block;
    font-size: .875rem;
    margin-right: 10px;
    height: 35px;
    line-height: 35px;
  }
}
 
</style>