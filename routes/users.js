var express = require("express");

var router = express.Router();
var template = require("../public/javascripts/template.js");
/* GET users listing. */
router.get("/", function (req, res, next) {
  var html = template.LOGIN();
  res.send(html);
});

module.exports = router;
