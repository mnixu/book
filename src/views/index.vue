<template>
  <div class="index" > 
    <header class="indexNav">
     <router-link :to='"/"'>首页</router-link>
     <router-link :to='"/"'>分类</router-link>
     <router-link :to='"/"'>排行</router-link>
     <router-link :to='"/"'>全本</router-link>
    </header>

    <search></search>

    <book-list thed='热门小说' :bookList='books.host_novels'></book-list>

    <!--<book-image thed='猜你喜欢' :list="listImage"></book-image>-->

    <book-top thed='玄幻奇幻' :list="books.fantasy_novels"></book-top>

    <book-top thed='武侠仙侠' :list="books.swordsman_novels"></book-top>

    <book-top thed='都市言情' :list="books.romantic_novels"></book-top>

    <book-top thed='历史军事' :list="books.history_novels"></book-top>

    <!--<tab-nav :classItem="['日榜','周榜','月榜']" @clickTab="clickTab1"></tab-nav> 
    <book-top :list="list1"></book-top>
 

    <tab-nav :classItem="['玄幻','武侠']" @clickTab="clickTab2"></tab-nav>
    <book-top :list="list2"></book-top>-->
  </div>

</template>

<script> 
  import bookList from '../components/bookList'
  import tabNav from '../components/tabNav1' 
  import bookTop from '../components/bookTop'
  import bookImage from '../components/bookImage' 
  import search from '../components/search'
   
  import { mapGetters } from 'vuex'
  
  var listImage = [
    {image:"http://image.cmfu.com/Books/2673646/2673646.jpg",title:"黑铁之堡",author:"醉虎"},
    {image:"http://image.cmfu.com/Books/2673646/2673646.jpg",title:"黑铁之堡",author:"醉虎"},
    {image:"http://image.cmfu.com/Books/2673646/2673646.jpg",title:"黑铁之堡",author:"醉虎"},
    {image:"http://image.cmfu.com/Books/2673646/2673646.jpg",title:"黑铁之堡",author:"醉虎"},
    {image:"http://image.cmfu.com/Books/2673646/2673646.jpg",title:"黑铁之堡",author:"醉虎"},  
    {image:"http://image.cmfu.com/Books/2673646/2673646.jpg",title:"黑铁之堡",author:"醉虎"}, 
  ]

  export default {
    data (){
      return {  
        books:{ 
          host_novels: null, 
          fantasy_novels: null,
          swordsman_novels:null,
          romantic_novels:null,
          history_novels:null
        },
        listImage:listImage
      }
    },
    components: { 
      bookList,
      tabNav, 
      bookTop,
      bookImage,
      search
    }, 
    created () {
      this.getList()
    },
    methods: {
      getList () { 
        var _this = this
        this.$store.commit('START_LOADING')
        this.$http.get('/api/index').then(response =>{  
          this.books = response.body; 
          this.$store.commit('FINISH_LOADING') 
        })
      } 
    }
  }
</script>

<style scoped lang="less">
  .index{ 
    background: #f7f7f7; 
  }
  .indexNav {
    height: 40px;
    background: rgb(4, 190, 2);
    line-height: 40px;
    text-align: center;
    border-bottom: 1px rgb(4, 190, 2) solid;
    font-size: 16px;
    padding: 0 10px;
    border-top: 1px rgb(4, 190, 2) solid;
    font-weight: bold;
    a {
      color: #fff;
      float: left;
      width: 25%;
    }
  }

</style>