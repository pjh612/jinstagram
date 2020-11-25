var express = require("express");
var router = express.Router();
const Article = require("../public/javascripts/article.js");
const connect_mongodb = require("../public/javascripts/connect_mongodb.js");
router.post("/", (request, response, next) => {
  let contentID = request.body.contentID;
  let user = request.session.user.id;
  connect_mongodb(response);
  findandupdate(contentID, user);
  try {
    response.json({ status: 200, user: user });
  } catch (err) {
    next(err);
  }
});
async function findandupdate(contentID, user) {
  const article = await Article.findOne(
    { _id: contentID },
    (err, article) => {}
  );

  const like = article.likes.filter((USER) => {
    return USER.id === user;
  });
  console.log("like", like);

  if (like.length == 0) {
    article.likes.push({
      id: user,
    });
  } else {
    article.likes.pull({
      id: user,
    });
  }

  await article.save();
}
module.exports = router;
