<template>
  <div class="content">
    <div v-if="thed" class="t_thed">
      <p>
      {{thed}} 

      <span style="    display: block;
    float: right;
    width: 30%;
    text-align: right;"><a class="huan"><em></em>换一换</a></span>
      </p>
    </div>

    <div class="book_image_item clearfix ">

      <div class="book_image" v-for="(list, index) in list">
        <a href="">
          <img onerror="this.src='http://image.cmfu.com/Books/1.jpg'" :src="list.image" width="80"
            height="100">
        </a>
            <p>钢铁之宝</p>
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
    text-align: center
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
    width: 80px;
    height: 100px;
    background: #fff;
    border: 1px solid #ccc;
    padding: 1px;
    margin:5%;
    p{ 
      color: #8c8c8c;
      font-size: 12px;
    }
    img {
      border: 0;
    }
    
  }
  em{
    width: 22px;
    height: 22px;
    display: inline-block;
    background: url("http://m.qidian.com/images/2014/m_icobg.png") no-repeat scroll 0 -71px;
    background-size: cover;
    vertical-align: middle;
    overflow: hidden;
  }
</style>