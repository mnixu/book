'use strict'

const express = require('express')
const router = express.Router(); 
const request = require('request')
const cheerio = require(`cheerio`)
const async = require('async')
 
router.get('/test' ,function(req,res){
  res.json({a:"123"})
})

router.get('/index' ,function(req,res){
    get_novel_data('http://m.qingdiba.com/',function(err,result){
      if (err) return res.json();
      else return res.json(result)
    }) 
})

//获取首页数据
function get_novel_data(url,callback){
  var prefix_url = `http://m.qingdiba.com`;
  //强推小说-数据存放
  var host_novels = [];
  //玄幻奇幻-数据存放
  var fantasy_novels = [];
  //武侠仙侠-数据存放
  var swordsman_novels = [];
  //都市言情-数据存放
  var romantic_novels = [];
  //历史军事-数据存放
  var history_novels = []; 
  var book = {'host_novels':host_novels,'fantasy_novels':fantasy_novels,'swordsman_novels':swordsman_novels,
              'romantic_novels':romantic_novels,'history_novels':history_novels};

  var task = [];
  task.push(function(callback){
    var url = `http://m.qingdiba.com/`;
    request(url, function(err, response, html){
      if(err) return callback(err);
      if(response.statusCode != 200) return callback("statusCode"+response.statusCode, null);
      if(!html) return callback('抓取首页失败!');
      var $ = cheerio.load(html);
      //强推小说
      var host_lists = $(".hot_sale").toArray();
      host_lists.forEach(function(host_list, index){
        var host_object = {};
        var host_url = prefix_url + $(host_list).find('a').attr('href');
        host_object.url = host_url;

        var host_img = $(host_list).find('a').find('img').attr("data-original");
        host_object.image = host_img;

        var host_title = $($(host_list).find('a').find('p')[0]).text();
        host_object.title = host_title;

        var host_author = $($(host_list).find('a').find('p')[1]).text();
        host_object.author = host_author;

        var host_review =  $($(host_list).find('a').find('p')[2]).text();
        host_object.review = host_review.replace(/\r\n/,'');
        host_novels.push(host_object);
      })

      //玄幻奇幻,武侠仙侠,都市言情,历史军事
      var all_lists = $(".index_sort1").toArray();
      //玄幻奇幻
      var fantasy_lists = [];
      //武侠仙侠
      var swordsman_lists = [];
      //都市言情
      var romantic_lists = [];
      //历史军事
      var history_lists = [];
      all_lists.forEach(function(all_list, index){
        var a_list = $(all_list).find('li').toArray();
        if(index == 0){   //玄幻奇幻
          fantasy_lists = a_list;
        }else if(index == 1){ //武侠仙侠
          swordsman_lists = a_list;
        }else if(index == 2){ //都市言情
          romantic_lists = a_list;
        }else if(index == 3){ //历史军事
          history_lists = a_list;
        }
      })

      fantasy_lists.forEach(function(fantasy_list, index){
        if(index%2==0){
          var fantasy_object = {};
          var fantasy_url = prefix_url + $(fantasy_list).find('a').attr('href');
          fantasy_object.url = fantasy_url;

          var fantasy_title = $($(fantasy_list).find('a').find('.title')[0]).text();
          fantasy_object.title = fantasy_title;

          var fantasy_sort = $($(fantasy_list).find('a').find('.sort')[0]).text();
          fantasy_object.sort = fantasy_sort;
          fantasy_novels.push(fantasy_object);
        }
      })

      swordsman_lists.forEach(function(swordsman_list, index){
        if(index%2==0){
          var swordsman_object = {};
          var swordsman_url = prefix_url + $(swordsman_list).find('a').attr('href');
          swordsman_object.url = swordsman_url;

          var swordsman_title = $($(swordsman_list).find('a').find('.title')[0]).text();
          swordsman_object.title = swordsman_title;

          var swordsman_sort = $($(swordsman_list).find('a').find('.sort')[0]).text();
          swordsman_object.sort = swordsman_sort;
          swordsman_novels.push(swordsman_object);
        }
      })

      romantic_lists.forEach(function(romantic_list, index){
        if(index%2==0){
          var romantic_object = {};
          var romantic_url = prefix_url + $(romantic_list).find('a').attr('href');
          romantic_object.url = romantic_url;

          var romantic_title = $($(romantic_list).find('a').find('.title')[0]).text();
          romantic_object.title = romantic_title;

          var romantic_sort = $($(romantic_list).find('a').find('.sort')[0]).text();
          romantic_object.sort = romantic_sort;
          romantic_novels.push(romantic_object);
        }
      })

      history_lists.forEach(function(history_list, index){
        if(index%2==0){
          var history_object = {};
          var history_url = prefix_url + $(history_list).find('a').attr('href');
          history_object.url = history_url;

          var history_title = $($(history_list).find('a').find('.title')[0]).text();
          history_object.title = history_title;

          var history_sort = $($(history_list).find('a').find('.sort')[0]).text();
          history_object.sort = history_sort;
          history_novels.push(history_object);
        }
      })
      // console.log("host_novels",host_novels);
      // console.log("fantasy_novels",fantasy_novels);
      // console.log("swordsman_novels",swordsman_novels);
      // console.log("romantic_novels",romantic_novels);
      // console.log("history_novels",history_novels); 
      callback(null,book)
    })
  })
  async.waterfall(task, function(err, result){
    if(err) return callback(err,null);
    console.log('首页获取成功');
    callback(null,result)
  })
}

function get_like_data(url,callback){
  var prefix_url = `http://www.qingdi.org/`;
  //猜你喜欢
  var like_novels = [];
}

module.exports = router;  