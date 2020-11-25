var express = require("express");
var router = express.Router();

var qs = require("querystring");
router.post("/", (request, response) => {
  let body = "";

  request.on("data", (data) => {
    body = body + data;
    if (body.length > 1e6) request.connection.destroy();
  });

  request.on("end", () => {
    var post = qs.parse(body);
    var id = post.ID;
    var pwd = post.PWD;

    response.writeHead(302, { Location: `/` });
    response.end();
  });
});
module.exports = router;
