'use strict'

const express = require('express')
const router = express.Router(); 
const request = require('request')
const cheerio = require(`cheerio`)
 
router.get('/test' ,function(req,res){
  res.json({a:"123"})
})

router.get('/index' ,function(req,res){
    http.request('http://m.qingdiba.com/',function(err,response){
      var $ = cheerio.load(response.body)
    })
})

module.exports = router;  