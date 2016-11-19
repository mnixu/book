<template>
  <div id="app">
    <header class="indexNav">
      <a href="/sort.html">首页</a>
      <a href="/sort.html">分类</a>
      <a href="/ph/week.html">排行</a>
      <a href="/quanben.html">全本</a>
    </header>

    <search></search>

    <book-list thed='热门小说' :bookList='hotBook'></book-list>

    <book-image thed='猜你喜欢' :list="listImage"></book-image>

    <book-list thed='强推小说' :bookList='hotBook'></book-list>

    <tab-nav :classItem="['日榜','周榜','月榜']" @clickTab="clickTab1"></tab-nav>
    <book-top :list="list1"></book-top>

    <book-image thed='猜你喜欢' :list="listImage"></book-image>

    <tab-nav :classItem="['玄幻','武侠']" @clickTab="clickTab2"></tab-nav>
    <book-top :list="list2"></book-top>

  </div>


</template>

<script> 
  import bookList from './components/bookList'
  import tabNav from './components/tabNav1' 
  import bookTop from './components/bookTop'
  import bookImage from './components/bookImage' 
  import search from './components/search'
   
    var list2 =  [[{title:"我真是大明星"},{title:"我真是大明星"},{title:"我真是大明星"},{title:"我真是大明星"},{title:"我真是大明星"}],
                          [{title:"我真是大明星1"},{title:"我真是大明星1"},{title:"我真是大明星1"},{title:"我真是大明星1"},{title:"我真是大明星1"}],
                          [{title:"我真是大明星2"},{title:"我真是大明星2"},{title:"我真是大明星2"},{title:"我真是大明星2"},{title:"我真是大明星2"}]]
    var list3 = [[{title:"这是月榜一"},{title:"这是月榜一"},{title:"这是月榜一"}],[{title:"这是月榜二"},{title:"这是月榜二"},{title:"这是月榜二"}]] 
    var listImage = [{image:"http://image.cmfu.com/Books/2673646/2673646.jpg",title:"黑铁之堡",author:"醉虎"},
                      {image:"http://image.cmfu.com/Books/2673646/2673646.jpg",title:"黑铁之堡",author:"醉虎"},
                      {image:"http://image.cmfu.com/Books/2673646/2673646.jpg",title:"黑铁之堡",author:"醉虎"},
                      {image:"http://image.cmfu.com/Books/2673646/2673646.jpg",title:"黑铁之堡",author:"醉虎"},
                      {image:"http://image.cmfu.com/Books/2673646/2673646.jpg",title:"黑铁之堡",author:"醉虎"},
                      {image:"http://image.cmfu.com/Books/2673646/2673646.jpg",title:"黑铁之堡",author:"醉虎"},
                      {image:"http://image.cmfu.com/Books/2673646/2673646.jpg",title:"黑铁之堡",author:"醉虎"},
                      {image:"http://image.cmfu.com/Books/2673646/2673646.jpg",title:"黑铁之堡",author:"醉虎"},]

  export default {
    data (){
      return { 
        hotBook:[{image:"http://image.cmfu.com/Books/2673646/2673646.jpg",title:"黑铁之堡",author:"醉虎"},
                  {image:"http://image.cmfu.com/Books/2673646/2673646.jpg",title:"黑铁之堡",author:"醉虎"},
                  {image:"http://image.cmfu.com/Books/2673646/2673646.jpg",title:"黑铁之堡",author:"醉虎"},],
        lists2:list2,
        lists3:list3,
        list1:list2[0],
        list2:list3[0],
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
      getList(){ 
        this.$http.get('./test').then(response =>{ 
          console.log(response)
        })
      },
      clickTab1(index){
        this.list1=this.lists2[index];
      },
      clickTab2(index){
        this.list2=this.lists3[index];
      }
    }
  }
</script>

<style scoped lang="less">
  #app {
    background: #f7f7f7;
  }
  
  .indexNav {
    height: 40px;
    background: rgb(4, 190, 2);
    ;
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