var express = require("express");
var router = express.Router();
const Article = require("../public/javascripts/schemas/article.js");
const User = require("../public/javascripts/schemas/user.js");
const connect_mongodb = require("../public/javascripts/connect_mongodb.js");

router.post("/", (request, response, next) => {
  let id = request.body.id;
  let comment = request.body.comment;
  let user_ID = request.session.user.id;
  let user_PK = request.session.user._id;
  connect_mongodb(response);
  findandupdate(id, comment, user_ID, user_PK);
  console.log(request.params);
  try {
    response.json({ status: 200, user_ID: user_ID, user_PK: user_PK });
  } catch (err) {
    next(err);
  }
});

async function findandupdate(id, comment, user_ID, user_PK) {
  const article = await Article.findOne({ _id: id }, (err, article) => {});
  const USER = await User.findOne({ _id: user_PK }, (err, user) => {});

  await console.log("User_PK = ", USER["_id"]);
  await article.comments.push({
    id: USER["_id"],
    text: comment,
  });
  await article.save();
}
module.exports = router;
