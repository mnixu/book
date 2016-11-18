<template>
  <div class="content">
    <div v-if="thed" class="t_thed">
      <p>{{thed}}</p>
    </div>

    <div class="book_image_item clearfix">

      <div class="book_image" v-for="(list, index) in list">
        <a href="">
          <img onerror="this.src='http://image.cmfu.com/Books/1.jpg'" :src="list.image" width="70"
            height="90">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:["thed","list"]
  }
</script>

<style scoped lang="less">
  .content {
    background: #fff;
    margin-bottom: 20px;
  }
  
  .t_thed {
    text-align: left;
    font-size: 16px;
    padding: 10px; 
    border-bottom:2px solid rgb(4, 190, 2);
    color:rgb(4, 190, 2)
  } 
  
  .book_image_item {
    width: 100%;
    height: 100%;
    padding-bottom: 10px;
  }
  
  .book_image {
    float: left;
    width: 70px;
    height: 90px;
    background: #fff;
    padding: 10px;
    img {
      border: 0;
    }
  }
</style>