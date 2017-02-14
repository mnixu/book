'use strict'

const express = require('express')
const router = express.Router();
const request = require('request')
const cheerio = require(`cheerio`)
const async = require('async')

router.get('/test', function (req, res) {
  res.json({ a: "123" })
})

router.get('/index', function (req, res) {
  var json = {"host_novels":[{"url":"info-4","image":"http://www.qingdi.org/files/article/image/0/4/4s.jpg","title":"纨绔邪皇","author":"作者：开荒","review":"简介：天圣二十七年九月十七，当安国公世子嬴冲在咸阳城勾栏巷被天外陨星砸晕的时候，大秦国师守正道人手持玄宙天珠坐化于城外白云观内。     ——..."},{"url":"info-1357","image":"http://www.qingdi.org/files/article/image/1/1357/1357s.jpg","title":"史上最强师兄","author":"作者：八月飞鹰","review":"简介：燕赵歌第一次穿越，穿到了武道文明繁盛至极的异世界，一头撞进包罗万象，遍收天下经典的神宫藏书楼里，但随后便是一场天地大劫，连神宫也破灭了。..."},{"url":"info-8780","image":"http://www.qingdi.org/files/article/image/8/8780/8780s.jpg","title":"偷香","author":"作者：墨武","review":"简介：　穿越到三国附身到曹府家奴身上的单飞，一心只想做个成功人士。     不想白富美和巅峰人生难以兼得，高富帅阻挡他融资的前行。 \r\n   ..."}],"fantasy_novels":[{"url":"http://m.qingdiba.com/info-4315/","title":"大主宰黑岩","sort":"[玄幻魔法]"},{"url":"http://m.qingdiba.com/info-885/","title":"吞噬星空","sort":"[玄幻魔法]"},{"url":"http://m.qingdiba.com/info-124/","title":"武炼巅峰","sort":"[玄幻魔法]"},{"url":"http://m.qingdiba.com/info-455/","title":"极品修真邪少","sort":"[玄幻魔法]"},{"url":"http://m.qingdiba.com/info-1271/","title":"九天剑魔","sort":"[玄幻魔法]"},{"url":"http://m.qingdiba.com/info-535/","title":"绝品邪少","sort":"[玄幻魔法]"}],"swordsman_novels":[{"url":"http://m.qingdiba.com/info-446/","title":"灵鼎","sort":"[武侠修真]"},{"url":"http://m.qingdiba.com/info-1318/","title":"天元神诀","sort":"[武侠修真]"},{"url":"http://m.qingdiba.com/info-355/","title":"神道","sort":"[武侠修真]"},{"url":"http://m.qingdiba.com/info-1421/","title":"霸仙绝杀","sort":"[武侠修真]"},{"url":"http://m.qingdiba.com/info-8769/","title":"铁掌无敌王小军","sort":"[武侠修真]"},{"url":"http://m.qingdiba.com/info-294/","title":"莽荒纪","sort":"[武侠修真]"}],"romantic_novels":[{"url":"http://m.qingdiba.com/info-617/","title":"绝品透视","sort":"[都市言情]"},{"url":"http://m.qingdiba.com/info-1077/","title":"山村风流","sort":"[都市言情]"},{"url":"http://m.qingdiba.com/info-1357/","title":"史上最强师兄","sort":"[都市言情]"},{"url":"http://m.qingdiba.com/info-1390/","title":"极品神医","sort":"[都市言情]"},{"url":"http://m.qingdiba.com/info-209/","title":"都市至尊神医","sort":"[都市言情]"},{"url":"http://m.qingdiba.com/info-802/","title":"官道红颜","sort":"[都市言情]"}],"history_novels":[{"url":"http://m.qingdiba.com/info-2880/","title":"重生之官场鬼才","sort":"[历史军事]"},{"url":"http://m.qingdiba.com/info-202/","title":"盛唐夜唱","sort":"[历史军事]"},{"url":"http://m.qingdiba.com/info-76/","title":"公子风流","sort":"[历史军事]"},{"url":"http://m.qingdiba.com/info-3/","title":"国色生枭","sort":"[历史军事]"},{"url":"http://m.qingdiba.com/info-103/","title":"北宋小厨师","sort":"[历史军事]"},{"url":"http://m.qingdiba.com/info-926/","title":"重生之红星传奇","sort":"[历史军事]"}]};
  res.json(result)
  /*调用网站太卡了 模拟一个json*/
  // get_novel_data('http://m.qingdiba.com/', function (err, result) {
  //   if (err) return res.json({err:err});
  //   else return res.json(result)
  // })
})
router.get('/book', function (req, res) {
  get_novels_info(req.query.id, function (err, result) {
    if (err) return res.json({err:err});
    else return res.json(result)
  })
})

router.get('/bookDetail', function (req, res) {
  get_catalog(req.query.id, function (err, result) {
    if (err) return res.json({err:err});
    else return res.json(result)
  })
})

router.get('/content', function (req, res) {
  get_content(req.query.id, function (err, result) {
    if (err) return res.json({err:err});
    else return res.json(result)
  })
})


router.get('/search', function (req, res) {
  search(req.query.title, function (err, result) {
    if (err) return res.json({err:err});
    else return res.json(result)
  })
})

//获取首页数据
function get_novel_data(url, callback) {
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
  var book = {
    'host_novels': host_novels, 'fantasy_novels': fantasy_novels, 'swordsman_novels': swordsman_novels,
    'romantic_novels': romantic_novels, 'history_novels': history_novels
  };

  var task = [];
  task.push(function (callback) {
    var url = `http://m.qingdiba.com/`;
    request(url, function (err, response, html) {
      if (err) return callback(err);
      if (response.statusCode != 200) return callback("statusCode" + response.statusCode, null);
      if (!html) return callback('抓取首页失败!');
      var $ = cheerio.load(html);
      //强推小说
      var host_lists = $(".hot_sale").toArray();
      host_lists.forEach(function (host_list, index) {
        var host_object = {};
        var host_url = prefix_url + $(host_list).find('a').attr('href');
        host_object.url = host_url.split("/")[3];

        var host_img = $(host_list).find('a').find('img').attr("data-original");
        host_object.image = host_img;

        var host_title = $($(host_list).find('a').find('p')[0]).text();
        host_object.title = host_title;

        var host_author = $($(host_list).find('a').find('p')[1]).text();
        host_object.author = host_author;

        var host_review = $($(host_list).find('a').find('p')[2]).text();
        host_object.review = host_review.replace(/\r\n/, '');
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
      all_lists.forEach(function (all_list, index) {
        var a_list = $(all_list).find('li').toArray();
        if (index == 0) {   //玄幻奇幻
          fantasy_lists = a_list;
        } else if (index == 1) { //武侠仙侠
          swordsman_lists = a_list;
        } else if (index == 2) { //都市言情
          romantic_lists = a_list;
        } else if (index == 3) { //历史军事
          history_lists = a_list;
        }
      })

      fantasy_lists.forEach(function (fantasy_list, index) {
        if (index % 2 == 0) {
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

      swordsman_lists.forEach(function (swordsman_list, index) {
        if (index % 2 == 0) {
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

      romantic_lists.forEach(function (romantic_list, index) {
        if (index % 2 == 0) {
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

      history_lists.forEach(function (history_list, index) {
        if (index % 2 == 0) {
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
      callback(null, book)
    })
  })
  async.waterfall(task, function (err, result) {
    if (err) return callback(err, null);
    console.log('首页获取成功');
    callback(null, result)
  })
}

function get_like_data(url, callback) {
  var prefix_url = `http://www.qingdi.org/`;
  //猜你喜欢
  var like_novels = [];
}


function get_novels_info(id, callback) {
  var prefix_url = `http://m.qingdiba.com`;
  var url = `${prefix_url}/${id}/`;
  //小说详情
  var novels_info = {};
  var task = [];
  task.push(function (callback) {

    request(url, function (err, response, html) {
      if (err) return callback(err);
      if (response.statusCode != 200) return callback("statusCode" + response.statusCode, null);
      var $ = cheerio.load(html);
      //console.log(html)

      var info = $(".synopsisArea_detail");
      var title = $(".title").text();
      novels_info.title = title;
      //图片
      var img = $($(info).find('img')[0]).attr('src');
      novels_info.img = img;
      //作者
      var author = $($(info).find('p')[0]).text();
      novels_info.author = author;
      //类别
      var sort = $($(info).find('p')[1]).text();
      novels_info.sort = sort.replace(/\r\n/, '').trim();
      //状态
      var status = $($(info).find('p')[2]).text();
      novels_info.status = status.replace(/\r\n/, '').trim();
      //更新时间
      var renew_time = $($(info).find('p')[3]).text();
      novels_info.renew_time = renew_time.replace(/\r\n/, '').trim();
      //下载地址
      var downId = id.split("-")[1];
      var href = `http://www.qingdi.org/modules/article/packdown.php?id=${downId}&type=txt&fname=${title}`
      // var download_url = html.match(/document\.writeln\("<a href=\\"(http:\/\/www\.dengbi\.cc\/modules\/article\/packdown.php?.+)\\" rel=\\"nofollow\\"/);
      novels_info.download_url = href;
      //简介review
      var review = $(".review").text();
      novels_info.review = review.replace(/\r\n/, '').trim();
      var new_lists = $(".directoryArea p").toArray();
      //最新章节数组
      var new_info_lists = [];
      new_lists.forEach(function (new_list) {
        var new_obj = {};
        new_obj.title = $($(new_list).find('a')[0]).text().replace(/\r\n/, '').trim();
        new_obj.url = prefix_url + $($(new_list).find('a')[0]).attr('href');
        new_info_lists.push(new_obj);
      })
      novels_info.new_info_lists = new_info_lists;
      callback(null, novels_info);
    })
  })

  async.waterfall(task, function (err, result) {
    if (err) return callback(err, null);
    callback(null, result)
  })
}


//根据id获取目录
function get_catalog(id, callback) {
  var prefix_url = `http://m.qingdiba.com`;
  var url = `${prefix_url}/wapbook-${id}/`;
  var catalogs = { books: [], title: null };
  var task = [];
  task.push(function (callback) {

    request(url, function (err, response, html) {
      if (err) return callback(err, []);
      if (response.statusCode != 200) return callback("statusCode" + response.statusCode, null);
      var $ = cheerio.load(html);
      var chapterlist = $("#chapterlist p").toArray();
      var title = $(".title").text();
      catalogs.title = title
      chapterlist.forEach(function (chapter, index) {
        var chapter_obj = {};
        if (index > 0) {
          chapter_obj.url = prefix_url + $($(chapter).find('a')[0]).attr('href');
          chapter_obj.title = $($(chapter).find('a')[0]).text().replace(/\r\n/, '').trim();
          catalogs.books.push(chapter_obj);
        }
      })
      callback(null, catalogs);
    })
  })

  async.waterfall(task, function (err, result) {
    if (err) return callback(err, null);
    callback(null, result)
  })
}

function get_content(suffix_url, callback) {
  var prefix_url = `http://m.qingdiba.com`;
  var url = `${prefix_url}/${suffix_url}/`;
  var books = { title: null, content: null, nextBook: null, lastBook: null, allBooks: null };
  var task = [];
  task.push(function (callback) {

    request({ encoding: "utf8", url: url }, function (err, response, html) {
      if (err) return callback(err);
      if (response.statusCode != 200) return callback("statusCode" + response.statusCode, null); 
      var $ = cheerio.load(html, { decodeEntities: false });
      if ($(".title").text() && $("#pt_mulu").attr("href") && $("#pt_prev").attr("href") && $("#pt_next").attr("href")) {
        books.title = $(".title").text().split("&nbsp")[0];
        books.allBooks = $("#pt_mulu").attr("href").replace(/\//g, "").split("-")[1];
        if ($("#pt_prev").attr("href").split("-")[2]) {
          books.lastBook = $("#pt_prev").attr("href").replace(/\//g, "");
        } else {
          books.lastBook = null;
        }
        if ($("#pt_next").attr("href").split("-")[2]) {
          books.nextBook = $("#pt_next").attr("href").replace(/\//g, "");
        } else {
          books.nextBook = null;
        }
        books.content = $("#chaptercontent").html();
      }
      callback(null, books);
    })
  })

  async.waterfall(task, function (err, result) {
    if (err) return callback(err, null);
    callback(null, result)
  })
}



function search(title, callback) {
  title = encodeURI(title)
  var url = `http://zhannei.baidu.com//cse/search?q=${title}&click=1&s=11383741219541945591&nsid=`;
  var books = [];
  request({ encoding: "utf8", url: url }, function (err, response, html) {
    if (err) return callback(err);
    if (response.statusCode != 200) return callback("statusCode" + response.statusCode, null);
    var $ = cheerio.load(html, { decodeEntities: false });
    $(".result-item").each(function () {
      var book = {};
      book.title = $(this).find(".result-game-item-title-link").attr("title") 
      book.author = "作者："+$($(this).find(".result-game-item-info-tag span")[1]).text().trim()
      book.url = $(this).find(".result-game-item-title-link").attr("href");
      book.url = "info-"+book.url.split("/")[4]
      book.image = $(this).find(".result-game-item-pic-link-img").attr("src")
      book.review = $(this).find(".result-game-item-desc").text().trim() || "暂无简介" ;
      books.push(book)
    })
    callback(null, books);
  })
}
module.exports = router;  