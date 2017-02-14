<template>
  <div style="padding:20px;">
    <input type="text" name="keyword" class="searchForm_input searchForm_input2" placeholder="输入书名•作者" v-model="title">
    <input type="submit" class="searchForm_btn" value="搜索" @click="search">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: null
      }
    },
    methods: {  
      search() {  
        this.$router.push({ name: 'search', query: { title: this.title }})
      }  
    }
  }

</script>

<style scoped lang="less">
  input {
    border: 1px rgb(4, 190, 2) solid;
    font-size: 14px;
    background: #f8fdff;
    padding: 0 5px;
    width: 80%;
    height: 30px;
    line-height: 30px;
    color: #cbcfd1;
  }
  
  .searchForm_btn {
    position: absolute;
    height: 30px;
    width: 60px;
    color: #C0DEEA;
    padding-left: 25px;
    line-height: 30px;
    border: none;
    background: url(http://m.qingdi.org/images/icon-search.gif) no-repeat 15% 50%;
    background-size: 18px;
    border-left: 1px #C0DEEA solid;
  }
</style>