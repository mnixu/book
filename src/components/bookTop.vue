<template>
  <div class="content">
    <ul>
      <li onclick="location.href='/book/showbook.aspx?bookid=3347598';" v-for="(list,index) in list">
        <a href="/book/showbook.aspx?bookid=3347598">
                  {{index}}  {{list.title}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:["list"]
  }
</script>

<style scoped>
  .content {
    background: #fff;
    margin-bottom: 20px;
  }
  
  ul {
    padding: 10px 0 10px 0;
    margin: 0px 20px 10px 20px;
    list-style-type: none;
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
    color: black;
  }
</style>