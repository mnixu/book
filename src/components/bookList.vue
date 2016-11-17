<template>
  <div class="book_list">
    <div class="book_list_detail">
      <a href="/book/showbook.aspx?bookid=2673646" title="黑铁之堡"></a>
      <div class="photo">
          <img alt="黑铁之堡" onerror="this.src='http://image.cmfu.com/Books/1.jpg'" src="http://image.cmfu.com/Books/2673646/2673646.jpg" width="80" height="100">
      </div>
      <div class="desec">
          <div class="bookname">
              黑铁之堡
          </div>
          <div class="">
              <ul class="aut_ul">
                  <li>作者：醉虎</li>
                  
                  <li>分类：玄幻/东方玄幻</li>
                  
              </ul>
          </div>
          <div class="about">
              简介：蒸汽时代，逆天征程。
          </div>
      </div> 
      </a>
    </div>
        <div class="book_list_detail">
      <a href="/book/showbook.aspx?bookid=2673646" title="黑铁之堡">
      <div class="photo">
          <img alt="黑铁之堡" onerror="this.src='http://image.cmfu.com/Books/1.jpg'" src="http://image.cmfu.com/Books/2673646/2673646.jpg" width="80" height="100">
      </div>
      <div class="desec">
          <div class="bookname">
              黑铁之堡
          </div>
          <div class="">
              <ul class="aut_ul">
                  <li>作者：醉虎</li>
                   
                  
              </ul>
          </div>
          <div class="about">
              简介：蒸汽时代，逆天征程。简介：蒸汽时代，逆天征程。
          </div>
      </div>
      </a>
    </div>
  </div>
</template>

<script>

</script>

<style scoped lang="less">
  .bookList{
    width: 100%
  }
  .book_list_detail{
    margin-bottom: 15px;
    margin-left: 10px;
    margin-right: 10px;

    a{ 
		  color: black; 
    }

    .photo{
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
    
    .desec{
      overflow: hidden;
      padding-left: 10px;
      line-height: 21px; 
      font-size: 14px; 

      .bookname{ 
        padding-bottom: 12px;
      }
      .aut_ul{
        margin: 0;
        padding: 0;
        width: 100%;
        color: #8c8c8c;
        font-size: 12px;
      }
      .about{
        padding-bottom: 8px;
        color: #8c8c8c;
        font-size: 12px;
      }
    }


  }
</style>