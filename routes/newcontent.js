var express = require("express");
var router = express.Router();
var Article = require("../public/javascripts/schemas/article.js");
var connect_mongodb = require("../public/javascripts/connect_mongodb.js");
router.get("/", function (req, res, next) {
  connect_mongodb(res);
  Article.create("12345", "img", "newcontent").then((user) => {
    // console.log(user); // 저장된 유저 정보 출력
  });
  res.writeHead(302, { Location: `/` });
  res.end();
});
module.exports = router;
