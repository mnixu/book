<template>

  <div class="book">
    <div v-if="thed" class="t_thed">
      <p>{{thed}}</p>
    </div>
    <div class="book_list">
      <div class="book_list_detail" v-for="bookList in bookList">
        <router-link :to='"/detail/"+bookList.url'> 
            <div class="photo">
              <image-placeholder :src="bookList.image"
                            placeholder="http://static.m.maizuo.com/v4/static/app/asset/3d2cdb3bd9a23609aa2d84e7c2bfd035.png"></image-placeholder>
            </div>
            <div class="desec">
              <div class="bookname">
                {{bookList.title}}
              </div>
              <div class="aut_about">
                <ul class="aut_ul">
                  <li>{{bookList.author}}</li>

                  <!--<li>分类：玄幻/东方玄幻</li>-->

                </ul>
                <div class="about" v-html="bookList.review"> 
                </div> 
              </div>
            </div> 
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

import ImagePlaceholder from './image-placeholder'

export default { 
  components: {
    ImagePlaceholder
  },
  props: ['thed','bookList']
  
}
</script>

<style scoped lang="less">
  .book {
    width: 100%;
    background: #fff;
  } 
  .t_thed {
    text-align: left;
    font-size: 16px;
    padding: 10px; 
    border-bottom:2px solid rgb(4, 190, 2);
    color:rgb(4, 190, 2)
  } 
  .bookList {
    width: 100%
  } 
  .book_list {
    padding-bottom: 5px;
    margin-bottom: 20px;
  } 
  .book_list_detail {
    border-top:2px solid #f7f7f7;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    a {
      color: black;
    }
    .photo {
      float: left;
      width: 80px;
      height: 100px;
      background: #fff;
      border: 1px solid #ccc;
      padding: 1px;
      img {
        border: 0;
        max-height: 100px;
      }
    }
    .desec {
      overflow: hidden;
      padding-left: 10px;
      line-height: 21px;
      font-size: 14px;
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
        font-size: 12px;
      }
      .about {
        padding-bottom: 8px;
        color: #8c8c8c;
        font-size: 12px;  
        
        text-overflow: ellipsis; 
        display: -webkit-box; 
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; 
        overflow: hidden;
      }
    }
  }
</style>