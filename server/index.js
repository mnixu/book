'use strict'

const express = require('express')
const router = express.Router();
 
router.get('/test' ,function(req,res){
  res.json({a:"123"})
})



module.exports = router;