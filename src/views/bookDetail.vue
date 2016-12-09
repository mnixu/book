<template>
  <div class="book_detail"> 

    <detail-header :title="books.title"></detail-header>

    <section class="book_main">
      <div class="book_info">
          <div class="photo">
            <img :src="books.img" height="100px" width="80px"></img> 
          </div>
          <div class="desec">
            <div class="bookname">
              {{books.title}}
            </div>
            <div class="aut_about">
              <div class="aut_ul">
                <div class="aut_p">
                  <span>{{books.author}}</span> 
                  <span>分类：<a style="color:rgb(4, 190, 2)">{{books.sort ? books.sort.split("：")[1] : ''}}</a></span>
                </div>  
                <div class="aut_p"> 
                  <span>{{books.status}}</span>
                  <span>下载：<a :href="books.download_url" style="color:rgb(4, 190, 2)">TXT</a></span>
                </div>
                <div class="aut_last">
                  最新：{{books.new_info_lists ? books.new_info_lists[0].title : ''}}
                </div>
              </div> 
            </div>
          </div> 
      </div> 
      <div class="book_review">
         <p>作品简介：</p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{books.review}}
      </div> 
      <div class="boo_title_list">
          <p>《{{books.title}}》目录 </p>
          <ul>  
            <li v-for="item in books.new_info_lists">
              <a :href="item.url">
               {{item.title}}
              </a>
            </li> 
 
        </ul>
        <div class="more">
          <router-link :to='"/detailMore/"+id'>
            <a>更多目录</a>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import detailHeader from '../components/detailHeader'
  export default {
    data (){
      return {
        books: {},
        id: null
      }     
    },  
    beforeRouteEnter(to, from, next){   
      next(vm => { 
        vm.id = vm.$route.params.id.split("-")[1];
        vm.$store.commit('START_LOADING')
        vm.$http.get(`/api/book?id=${vm.$route.params.id}`).then(response =>{  
          vm.books = response.body;  
          vm.$store.commit('FINISH_LOADING') 
        }) 
      })
    },
    created () {
        //this.getBookDetail(this.$route.params.id)
    },
    methods: {
      getBookDetail (id) {  
        this.$store.commit('START_LOADING')
        this.$http.get(`/api/book?id=${id}`).then(response =>{  
          this.books = response.body;  
          this.$store.commit('FINISH_LOADING') 
        })
      }
    },
    components: {detailHeader}
  }
</script>

<style lang="less">

.book_info{
  padding:10px; 
  .photo {
    float: left;
    width: 80px;
    height: 100px;
    background: #fff;
    border: 1px solid #ccc;
    padding: 1px;
    img {
      border: 0;
    }
  } 
  
  .desec {
    overflow: hidden;
    padding-left: 10px;
    line-height: 23px;
    font-size: 15px;
    .bookname {
      padding-bottom: 12px;
    }
    .aut_about {
      height: 72px;
    }
    .aut_ul {
      margin: 0;
      padding: 0;
      width: 100%; 
      color: #8c8c8c;
      font-size: 14px;
      .aut_p span{ 
        width:50%;
        float:left;
      }
    }
    .aut_last {    
      text-overflow: ellipsis; 
      display: block; 
      overflow: hidden; 
      white-space:nowrap;
      clear:both;
    }
  }
} 

.book_review{
  padding: 0 10px 10px 10px; 
  color: #8c8c8c;
  font-size: 14px;
  p{
    color:black;
    font-size:15px;
  }
}

.boo_title_list{ 
  padding: 20px 10px 10px 10px; 
  p{
    color:black;
    font-size:18px;
  }
  ul { 
    list-style-type: none;
    padding-top:10px;
  }
  
  ul li {
    height: 35px;
    line-height: 35px;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden; 
  }
  a {
    height: 35px;
    font-size: 15px;
    color: black;
  }
  .more{
    height: 40px;
    background: #f7f7f7;
    text-align: center;
    line-height: 40px;
    a{
      color: #8c8c8c;
    }
  }
}
</style>