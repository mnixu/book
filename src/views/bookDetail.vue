<template>
  <div class="book_detail">
    <header class="nav-header">
      <a class="return" href="javascript:history.go(-1);"><span>返回</span></a>
      <h1>大主宰</h1> 
      <a class="home" href="/"><span>首页</span></a>
    </header>

    <section class="book_main">
      <div class="boo_info">
          <div class="photo">
            <img src="http://image.qidian.com/books/1004144362/1004144362.jpg" height="100px" width="80px"></img> 
          </div>
          <div class="desec">
            <div class="bookname">
              大主宰
            </div>
            <div class="aut_about">
              <div class="aut_ul">
                <div class="aut_p">
                  <span>作者：天蚕土豆</span> 
                  <span>分类：<a style="color:rgb(4, 190, 2)">东方玄幻</a></span>
                </div>  
                <div class="aut_p"> 
                  <span>状态：连载中</span>
                  <span>下载：<a style="color:rgb(4, 190, 2)">TXT</a></span>
                </div>
                <div class="aut_last">
                  最新：137：三皇临截教誓师兵临东海（）
                </div>
              </div> 
            </div>
          </div> 
      </div> 
      <div class="book_review">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;天圣二十七年九月十七，当安国公世子嬴冲在咸阳城勾栏巷被天外陨星砸晕的时候，大秦国师守正道人手持玄宙天珠坐化于城外白云观内。     ——这是一个关于纨绔的故事，一个关于万古邪皇的故事。
      </div>

      <div class="boo_title_list">
        
      </div>
    </section>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="less">
.nav-header{
  height: 45px;
  line-height: 45px;
  padding: 0 10px;
  background: #fcfcfc;
  border-bottom: 2px solid #e9e9e9;
  h1{  
    position: absolute;
    left: 40px;
    right: 45px;
    height: 45px;
    line-height: 45px;
    font-weight: normal;
    overflow: hidden;
    text-align: center;
    font-size: 1.125rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    top: 0;
    z-index: 2;
  }
}
.return{
    position: absolute;
    display: block;
    width: 30px;
    height: 45px;
    left: 10px;
    z-index: 3;

    span{ 
      display: block;
      width:30px;
      height: 45px; 
      background: url(http://m.qidian.com/images/2014/m_icobg.png) no-repeat scroll 0 -118px; 
      background-size: cover;
      text-indent: -9999px; 
    }
}
.home{
    position: absolute;
    right: 10px;
    width: 35px;
    color:rgb(4, 190, 2)
} 
.boo_info{
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
}
</style>