<template>
  <div class="container" v-if="books">
    <div class="content">
      <div v-for="book in books" :data-id="book.nowBook" class="reader">
        <h3>{{book.title}}</h3>
        <div v-html="book.content"></div>
      </div>
      <div class="book-switch" style="">
        <ul class="clearfix">
          <!--<li><router-link :to='books.lastBook?"/detailMore/book/"+books.lastBook:"/detailMore/"+books.allBooks'>上一章</router-link></li> 
            <li><router-link :to='"/detailMore/"+books.allBooks'>查看目录</router-link></li> -->
          <li v-on:click="getBookDetail(nextbook.nextBook)">下一章</li>
        </ul>
      </div>
    </div>
    <div class="top-nav"  style="display:none">
      <div class="icon-back"></div>
      <div class="nav-title">返回目录</div>
    </div>
    <div class="pannel-nav" id="font-container"  style="display:none">
      <div class="child-mod">
        <span>字号</span>
        <button class="font-size-button">大</button>
        <button class="font-size-button">小</button>
      </div>
      <div class="child-mod">
        <span>背景</span>
        <div class="bk-container active" style="background:#f7eee5;">
        </div>
        <div class="bk-container" style="background:#e9dfc7;">
        </div>
        <div class="bk-container" style="background:#a4a4a4;">
        </div>
        <div class="bk-container" style="background:#cdefce;">
        </div>
        <div class="bk-container" style="background:#283548;">

        </div>
      </div>
    </div>
    <div class="bottom-nav" style="display:none">
      <div class="itemm">
        <div class="item">
          <div class="icon-menu"></div>
          <div class="icon-text">目录</div>
        </div>
      </div>
      <div class="itemm">
        <div class="item">
          <div class="icon-ft"></div>
          <div class="icon-text">字体</div>
        </div>
      </div>
      <div class="itemm">
        <div class="item" style="display:none;">
          <div class="icon-day"></div>
          <div class="icon-text">白天</div>
        </div>
        <div class="item">
          <div class="icon-night"></div>
          <div class="icon-text">夜间</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import detailHeader from '../components/detailHeader';
  import Util from '../util.js'
  export default {
    data() {
      return {
        bookId: null,
        books: [],
        nextbook: {},
        offsetTopArr: [],
        scroll: true
      }
    },
    created() {
      this.getBookDetail(this.$route.params.id);
      window.addEventListener('scroll', this.handleScroll); 　
    },
    methods: {
      //history.pushState(null, null, "123");
      getBookDetail(id) {
        if(!this.scroll) return
        if (!id) return;
        this.scroll = false;
        this.$http.get(`/api/content?id=${id}`).then(response => {
          if (!response.body) return Promise.reject("获取数据失败");
          this.nextbook = response.body;
          this.books.push(response.body);
          this.scroll = true;
          setTimeout(() => this.getOffsetTopArr(), 10)
        }).catch(function (e) {
          console.log(e);
          this.scroll = true;
        })
      },

      // 处理滚动条事件
      handleScroll() {
        let index = this.offsetTopArr.findIndex((value, index, arr)=> {  
          let scroll = document.body.scrollTop
          if (index == arr.length - 1 && scroll > value) return true;
          return  scroll > value && scroll < this.offsetTopArr[index + 1];  
        })  
        if (index > -1) this.bookId = this.books[index].nowBook;

        if (this.scroll && (Util.getScrollTop() + Util.getWindowHeight() > Util.getScrollHeight() - 10)) {
          this.getBookDetail(this.nextbook.nextBook)
        }

      },

      // 
      getOffsetTopArr() {
        let books = document.getElementsByClassName("reader");
        let offsetTop = []
        Array.prototype.forEach.call(books, function (book, i) {
          offsetTop.push(book.offsetTop +　60)
        });
        this.offsetTopArr = offsetTop;
      }
    },
    watch: {
      // 切换页面
      '$route'(to, from) {
        if (to.params && to.params.id) {
          this.getBookDetail(to.params.id)
        }
        // 如果是当前页面切换分类的情况 
      },
      // 监听当前的bookId， 改变的话则改变地址栏。
      bookId (to, from){ 
        history.pushState(null, null, to)
      }
    }
  }

</script>

<style scoped lang="less">
  .container {
    width: 100%;
    height: 100%;
    font-size: 14px;
  }



  .top-nav {
    position: fixed;
    top: 0;
    height: 50px;
    width: 100%;
    z-index: 9;
    background: rgba(0, 0, 0, .9);
    opacity: 1;
    .icon-back {
      position: absolute;
      top: 14px;
      left: 10px;
      width: 23px;
      height: 23px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJGMkEyQkQxMjdBNDExRTU4NjA2QTJDMjFDQ0I0ODhEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJGMkEyQkQyMjdBNDExRTU4NjA2QTJDMjFDQ0I0ODhEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkYyQTJCQ0YyN0E0MTFFNTg2MDZBMkMyMUNDQjQ4OEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkYyQTJCRDAyN0E0MTFFNTg2MDZBMkMyMUNDQjQ4OEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Ia560AAAHWklEQVR42uyd7W9U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);
      background-size: contain;
    }

    .nav-title {
      position: absolute;
      top: 16px;
      left: 60px;
      color: #d5d5d6;
    }
  }

  .pannel-nav {
    position: fixed;
    bottom: 70px;
    height: 135px;
    width: 100%;
    background: none;
    z-index: 10;
    color: #fff;
    background: rgba(0, 0, 0, .9);
    .child-mod {
      padding: 5px 0;
      margin: 15px;
    }

    .child-mod span {
      display: inline-block;
      padding-right: 15px;
      padding-left: 10px;
    }

    .font-size-button {
      background: none;
      border: 1px #8c8c8c solid;
      color: white;
      border-radius: 16px;
      padding: 5px 40px;
    }

    .child-mod button:nth-child(2) {
      margin-right: 10px;
    }

    .bk-container {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #fff;
      display: inline-block;
      vertical-align: -10px;
      border: 1px solid transparent;
      margin-right: 7px;
    }

    .active {
      border: 1px solid #ff7800;
    }
  }

  .bottom-nav {
    position: fixed;
    bottom: 0;
    height: 70px;
    width: 100%;
    background: #000;
    opacity: 0.9;
    z-index: 9;

    .itemm {
      display: inline-block;
      width: 32%;
      color: #fff;
      text-align: center;
      margin: 0 auto;
    }
    .item {
      width: 26px;
      margin: 0 auto;
      position: relative;
    }

    .icon-menu {
      position: absolute;
      top: 3px;
      left: 2px;
      width: 18px;
      height: 13px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAoCAYAAABerrI1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNFN0E3M0IwMjc4NDExRTU5RkYxQjg1Rjk2QkEyNzBEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNFN0E3M0IxMjc4NDExRTU5RkYxQjg1Rjk2QkEyNzBEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0M1ODVCRkYyNzg0MTFFNTlGRjFCODVGOTZCQTI3MEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0M1ODVDMDAyNzg0MTFFNTlGRjFCODVGOTZCQTI3MEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5uTX6PAAAA0UlEQVR42uyXsQrCMBRFX4p0V39Pv8FJcekHFJe6d+v3NY6CDvUFooQ0AcEllnPhlgz3QU6bBq6ZnvdaRC7qndqoB/VR/ZC5wuxGytLtvXejUJ0uDlGgVZ8Tg6lsaWod1Jh461a9TQyMBX6hWLaSBary5zBWn8kPf8DUr/Rx8hfEPth4kxkIs+tCL4rG/VOLPH5AAQUUUEABBRRQv0O54nf1tcL6dZ3Jh9mpMH/2TkmkJFISKYmURKCAAgoooIACCihKIiWRkkhJpCR+XxJfAgwA/ROhOlYvoWQAAAAASUVORK5CYII=);
      background-size: contain;
    }
    .icon-ft {
      position: absolute;
      width: 20px;
      height: 13px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAuCAYAAACViW+zAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBCRTkzQUQ3Mjc4NzExRTU5RkYxQjg1Rjk2QkEyNzBEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBCRTkzQUQ4Mjc4NzExRTU5RkYxQjg1Rjk2QkEyNzBEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0U3QTczQkEyNzg0MTFFNTlGRjFCODVGOTZCQTI3MEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEJFOTNBRDYyNzg3MTFFNTlGRjFCODVGOTZCQTI3MEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6/hjRDAAAFqklEQVR42uRaaWwVVRi9fTbYqoBoEGIVrDsBA6JRAY0VSkQUl7pQI8YQGjTRaNCgBtdoApho3aoRRJaIC25/VBTBCiqCuKX+QDFqFANRsRCtsRWr9XzxNBnu++6bO/fNe9i+k5y0c2fmzrwz3/22mbKuv9pNChgCLgLHgBvABnCr6Qkor1CHy1ISZjVYG9leC55V6sLsB/4ucynj7T1VmEwKU09VRBHUmx6MNIS5JuF4SQhzIniKY5+MjypVYa4OtKb/PfJxvn3B7eABOY4Rp3wo2FZKzndajCiG+68otaWkLaP23rKcQoWRDHekMj5DGZPjTisVYWYqY+vB5/g3qZPuFcIMYFJn4wnrr50EDujtwlwFVlpjreBL/P9lbkdRyfMKBcmn7gRfAbeAO8G/wS7yT3Ab+AHYBF4I7ptmuJbUfzN4vDXeCN4U2X4AvNE65gtwOG80rYc6ndcdFnD+DnAe+ChCdme+wpzJyjmKLgr1VWTsOAph11A14LoURBkKrgBPTWGu98CLIE5rPktJC73NliiG5vxOgUK3WN3GlEQRnAG+Zjo7+oQKMxCsU8YXOI7XnHAd5wnFQeAb4GBl37fgXeDp4CGS09Jiy+hPxMoud0RNSSduDV1Kt4DzrbEfecHdyvHyBKSLN8galxu4L1CYp5lxRyGO9WbwcbDT00/OtYVg2VKFJdWWxGIyjtxliUMUw/HFjhwoJBqOVMoLuca54COeonT7xDmMUHbtV5d0KU0Ej7TG/gEXxpy3kMdFIfPUBghzneLMJUS/HTCXiPOYMl6bVBgtc30T/C7mPNm/KgUnvA94iTX2Cy0lFO87rNJbmCpwiqdz9XXCUzivLyqZK21g4tadSObTU96q5FSHJxFmBj18FD8wOvhgJY/fowviKDhz9XXuBccy4kg/eWkKofo3a/tAX2HkBzQo44sSODs57illvEER3Ac7mdxtTEGY/UNrpXOi5hXzQ3NBE1LmnbyXasSTafHlocJoTvJVFmRJsI3n7a12xCD6tfnM0j8CJ4UWkUeA3yjinQ2+FXBzkxS/JKH8KI/o5oP+4LHgMWA177+a20O8ZymvKDMxa9yViK1Kue0xkwlXyLmy1M/jw6pO08RcFiPp/PeOmiRt5CorcvWEbgePDrzmbpYld7gsxiXMpeALRXSGl4Evei6XpWw0JcEf7CN9Bn4Ivs4H0pVUmDXghCIK0+xxvT70UeMd+yXx+5RhfDOrbXH68u5rV47SwFsYcWBfFrDJVKP0arRmlw2tKyj4GnwYfJY5TtKaSRUm4wihtigi1LspWcc6zme3AnKFbnGs1yo/ai4bV00BogyM8+xRVBi9ab3ApNer7XI0t7Qmezemm+zm9f3gbQmddhQnJBFGKtiDrTFZa8tS9inLlAJQrnux4/gJSu10T573MD6JMFqmuyKH8wrFLkfUc7Ujhlvbn1Cc4DTF6O/GVGFGgOMczaZCQFtO4xQTzzBM21acD+rjcqBMzNNqYQ+kEJB5P/eon6RssD8jGWb0z9t8cBj4oE9aLZDPNaZ5PtU0oTWxtM9LWqxtyZTPD7ievO9abbIb9JHeQUcmKsxUxVxlDS8vsDDLFV/R32R/2LhSOfdJ4/8VhfRdZoEfmz3fomoRbXBUGG0ZPWMK/yVUGxOzuOW0mGm9nYes531eQCvqXl7lrNrr2QuSNmajZYm/gjco1x7RnfkOdZT9o1lbFBqjGWW0pC56X9czw42DtCv7xvig7VyKP5vsL9gfQvY7Syymw2S/4thUJFEM65tNisO1I4+8EZjnkWj2ixFFLHQUH4b0ordY+6+En+knwvzElDoaCmeb4mK2JUQT78vGHPZeWhLOL3M/D55k/ntptyOy724l0WyMFpE1jO3NrEyLDVk6E1lIrvU4fgxFGkv/UsWSQnxHK5dhC/3QGqe/dHy1+a8AAwCKR08FSRIHxQAAAABJRU5ErkJggg==);
      background-size: contain;
    }
    .icon-day {
      position: absolute;
      width: 19px;
      height: 18px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAYAAACMGIOFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNFN0E3M0I0Mjc4NDExRTU5RkYxQjg1Rjk2QkEyNzBEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNFN0E3M0I1Mjc4NDExRTU5RkYxQjg1Rjk2QkEyNzBEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0U3QTczQjIyNzg0MTFFNTlGRjFCODVGOTZCQTI3MEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0U3QTczQjMyNzg0MTFFNTlGRjFCODVGOTZCQTI3MEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6o6V5PAAADu0lEQVR42uyaTUgVURTHm/cigiS1LEitoHoqbgtcZAStngtDoYxa9rFsYYuWfUBhuSjCneiylkH2oavoEZlC4aYsM9toakWLnpsWyfQfOMJrOvdjZs6bedQc+OF7d9499/y9M/fj3HFc110Xo3WAYfp8BozG0agTs8hFsIM+L4H6f1GkvzEnjkYz6/4DS0WmIlORSlsq+bxcKSI3gkHwBlwSGA3PkrjPNE+GnhXAZYprkOLUjOmYQjT0un/aMHAMdcqNQ3GUWq+ujqknt/i+nwZDcc1vih4cojh0cQbqyQaw4P5tSfQo14OezYNGXV0b5zly5Le+mEX2KQTmTHVtl3U58BQ0lpQtgJ2Gei2gE7SDVrANVIMf4Bt4B56Dh+C9wdc80/4RMGteTNr/J/09+lhzW3WBCTeYTVA91WPwKGgPBrldS9kFBkA/qGOuN4FnbjTz6jczvuuoXa/93UHilnxmjoMVV8ZWyJ9IbFICz4FVV9ZWyW9FiDwGfmmCnQIXQBuoBxvobxuVT2nqen57khbpPYNFRYBzoNtiPnXod3MKP0VqJxGRjmaQGQXVAf1VUz3VYOQkIbJLEdADkA3pM0v1OetKQuQ4E8gHUBXxEfDqzzC+x+MW2aL4b+eFRuu8wn9LGH9hN82dTNlrMCa02xgjf347GmdmoJ0puyu8rbrHlB2MU2QrUzYuLLJg2a6VyA7KbLsMi3Tdb9sVuwRJ+2TZrjF+b+4pTd2rkk/1hky4Z+vBapkz7lzW3Ri/ze3KpTqKTNlmYYG1TNlKmJRJpiSDxpkqq/aVKdsrLHIPU/ZFkwFUxu/dYk8M3c3ZNNjnKzsEXgmKPKxo12/G+MOOri+YslPCPXnSst2yTSEjTNkBkBcSmCd/Nu1aDF/hl15cDmdGYO26SXrtGuUs5AZT1kQrn2xIn1la6TQx1/rDT0TR9pMFxUL6fogeraJ6nBWS2k+uZQZUyauPtOO38dNNv1cltZqTzvH0WOZ49oMaqlND321yPCfSbF2ad5UXufaMFiIKLER9BqOK9Ea4m2CZEk61mrOQyYDiJjUpzFpqb5nad8olkjsfvG6RC7oIRsBsSY62SN9H6Lopd3MtyvmorcCM4gD0dkxnk7eiHARHEWg84RWkUXPinZEQeSXsCa8wOYXQqxIi31aAQN3R/rTEAv1lqCNs3taSTqoEmclmqf2FIFlCm3cGvBeBzoOt4I7vraqgJvW+awPF9B0MgJ9RRZYz+5a+75qKTEWmIstuFfm+q7RJve8ayH4LMACaxEJEaXs23AAAAABJRU5ErkJggg==);
      background-size: contain;
    }
    .icon-night {
      position: absolute;
      left: 4px;
      width: 16px;
      height: 16px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU2OUYzRUEwMjc4NzExRTU5RkYxQjg1Rjk2QkEyNzBEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhBMzA2RjA2Mjc4QTExRTU5RkYxQjg1Rjk2QkEyNzBEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTY5RjNFOUUyNzg3MTFFNTlGRjFCODVGOTZCQTI3MEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTY5RjNFOUYyNzg3MTFFNTlGRjFCODVGOTZCQTI3MEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4v5YACAAAC/UlEQVR42tSaXYhNURTH97kzRnJ9ZTQzPh7IMEr5yshHEwkRkSeSjweEiMjDePTkhcKLPCApUV54GxTKcDM0JfL9QE0UGdcdEmb7L3edOq5zzz1nn332Pvdfv5e5Z9Zd666711577etIKYUGjQILwRwwDOwDfcKAamP873CwBawDrcABP8ACU87/FWUgIk3gKMjL/7VfwV4sojxcCw6AL9JfD0DGdABhv0KTwAUwO+CZvaBfGFaYAJaDyyAb8Mwt0CksKFPh9W3gWgXnSSeFJTkBZXQrOM3VJUi9oJErUGoysBKcCuE86YYt58sF0MILtiakjTvCojI+i/o876Zh9ThNARysUCr99NpmAN5FTAvxBRgS0QZlK5+GDLQrOC9sOu/NADVm70LU+9RmYJOi8yLigk8sgPUxbEy0HUATH0RUNdV2AG0hd9xyarMdwNyYNhaDOpsBTI5pYwRYYTMAHYtwh80ARmqws1ShBdEWwGAdGyI4HrMYKAegawFSMdhlo5XIK/ZAfvoO5oFukxn4oNHeID5DjzUZwCvNNsn5DjDOVADPErA7BdwF0xP2v4YCyCVknDJwjxe2k8AHT4O0VTSeawD9Mll1glZN48T5IMc+N7p/7JJm1AFWg4ERna4Da8F1j62cdzZKY5RZBtbcEuYzuAlugyfgOSjwyS7LJ8QJYJoojuuX+RycLnqPlPXgLZfBalCB11iveyL7CM6K6tEZURxp/jNWGc2pzFbBp98M3peOVXrA4Sr49I+4zpdmgDSA94UZKXX+ITeNP8sFIDg9XWBoypyni0O6THzqN1bx6iXYCH6nyHnyZXOp8+UCIF0Fe1LiPH1FdoMr/q8G74DbwS9pT/TeO+Nes64JuFpNUl+5fdByT9wMHhl0vhu06L7opobqEPiWoON9oJ0v1bXf1LuMAcdAQbPjJ6g9juqPE+PXKvVcbjeAmQqHFsmb5iVwzu1tVKYSOkpdA1jEU246To4XxZ/gZLlUU5v8CbzhI+x9bqV74r7xHwEGAPDRVwnecW5KAAAAAElFTkSuQmCC);
      background-size: contain;
    }
    .icon-night {
      position: absolute;
      left: 4px;
      width: 16px;
      height: 16px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU2OUYzRUEwMjc4NzExRTU5RkYxQjg1Rjk2QkEyNzBEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhBMzA2RjA2Mjc4QTExRTU5RkYxQjg1Rjk2QkEyNzBEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTY5RjNFOUUyNzg3MTFFNTlGRjFCODVGOTZCQTI3MEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTY5RjNFOUYyNzg3MTFFNTlGRjFCODVGOTZCQTI3MEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4v5YACAAAC/UlEQVR42tSaXYhNURTH97kzRnJ9ZTQzPh7IMEr5yshHEwkRkSeSjweEiMjDePTkhcKLPCApUV54GxTKcDM0JfL9QE0UGdcdEmb7L3edOq5zzz1nn332Pvdfv5e5Z9Zd666711577etIKYUGjQILwRwwDOwDfcKAamP873CwBawDrcABP8ACU87/FWUgIk3gKMjL/7VfwV4sojxcCw6AL9JfD0DGdABhv0KTwAUwO+CZvaBfGFaYAJaDyyAb8Mwt0CksKFPh9W3gWgXnSSeFJTkBZXQrOM3VJUi9oJErUGoysBKcCuE86YYt58sF0MILtiakjTvCojI+i/o876Zh9ThNARysUCr99NpmAN5FTAvxBRgS0QZlK5+GDLQrOC9sOu/NADVm70LU+9RmYJOi8yLigk8sgPUxbEy0HUATH0RUNdV2AG0hd9xyarMdwNyYNhaDOpsBTI5pYwRYYTMAHYtwh80ARmqws1ShBdEWwGAdGyI4HrMYKAegawFSMdhlo5XIK/ZAfvoO5oFukxn4oNHeID5DjzUZwCvNNsn5DjDOVADPErA7BdwF0xP2v4YCyCVknDJwjxe2k8AHT4O0VTSeawD9Mll1glZN48T5IMc+N7p/7JJm1AFWg4ERna4Da8F1j62cdzZKY5RZBtbcEuYzuAlugyfgOSjwyS7LJ8QJYJoojuuX+RycLnqPlPXgLZfBalCB11iveyL7CM6K6tEZURxp/jNWGc2pzFbBp98M3peOVXrA4Sr49I+4zpdmgDSA94UZKXX+ITeNP8sFIDg9XWBoypyni0O6THzqN1bx6iXYCH6nyHnyZXOp8+UCIF0Fe1LiPH1FdoMr/q8G74DbwS9pT/TeO+Nes64JuFpNUl+5fdByT9wMHhl0vhu06L7opobqEPiWoON9oJ0v1bXf1LuMAcdAQbPjJ6g9juqPE+PXKvVcbjeAmQqHFsmb5iVwzu1tVKYSOkpdA1jEU246To4XxZ/gZLlUU5v8CbzhI+x9bqV74r7xHwEGAPDRVwnecW5KAAAAAElFTkSuQmCC);
      background-size: contain;
    }

    .icon-text {
      position: absolute;
      top: 25px;
      font-size: 10px;
    }
  }




  .content {
    padding: 0 10px 10px 10px;
    word-break: break-all;
    h3 {
      text-align: center;
      padding: 30px 5px 10px 5px;
    }
  }

  .book-switch {

    padding: 10px 0 0 0;
    ul {
      list-style-type: none;
    }
    ul li {
      float: left;
      width: 33%;
      text-align: center
    }
    a {
      color: #09b396;
      border: 1px solid #09b396;
      display: block;
      font-size: .875rem;
      margin-right: 10px;
      height: 35px;
      line-height: 35px;
    }
  }
</style>