var express = require("express");
var router = express.Router();
const Article = require("../public/javascripts/schemas/article.js");
const connect_mongodb = require("../public/javascripts/connect_mongodb.js");
router.post("/", (request, response, next) => {
  let contentID = request.body.contentID;
  let type = request.body.type;
  let user_PK = request.session.user._id;
  connect_mongodb(response);
  findandupdate(contentID, user_PK);
  try {
    console.log("type = ", type);
    response.json({ status: 200, user: user_PK, type: type });
  } catch (err) {
    next(err);
  }
});
async function findandupdate(contentID, user_PK) {
  const article = await Article.findOne({ _id: contentID });

  const like = article.likes.filter((USER) => {
    console.log(USER.id, user_PK);
    return USER.id == user_PK;
  });
  console.log("like", like);

  if (like.length == 0) {
    await article.likes.push({
      id: user_PK,
    });
  } else {
    console.log("좋아요 취소");
    const result = article.likes.filter((USER) => {
      return USER.id == user_PK;
    });
    console.log(result);
    article.likes.pull(result[0]._id);
  }

  await article.save();
}
module.exports = router;
