var express = require("express");
var router = express.Router();
const Article = require("../public/javascripts/article.js");
const User = require("../public/javascripts/user.js");
const connect_mongodb = require("../public/javascripts/connect_mongodb.js");

router.post("/", (request, response, next) => {
  let id = request.body.id;
  let comment = request.body.comment;
  let user = request.session.user.id;
  connect_mongodb(response);
  findandupdate(id, comment, user);
  try {
    response.json({ status: 200, user: user });
  } catch (err) {
    next(err);
  }
});

async function findandupdate(id, comment, user) {
  const article = await Article.findOne({ _id: id }, (err, article) => {});
  const USER = await User.findOne({ id: user }, (err, user) => {});

  await console.log("User_PK = ", USER["_id"]);
  await article.comments.push({
    id: USER["_id"],
    text: comment,
  });
  await article.save();
}
module.exports = router;
