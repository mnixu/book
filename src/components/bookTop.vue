<template>
  <div class="content">
    <div v-if="thed" class="t_thed">
      <p>{{thed}}</p>
    </div>
    <ul>
      
      <li v-for="(list,index) in list">
        <router-link :to='"/detail/"+list.url.split("/")[3]'> 
        <a>
                  {{list.sort?list.sort:index+1}}  {{list.title}}
        </a>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:['thed',"list"]
  }
</script>

<style scoped>
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
    font-size: 14px;
    color: black;
  }
</style>