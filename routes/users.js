var express = require('express');
var router = express.Router();
let MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;
