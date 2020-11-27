const { request } = require("express");
var express = require("express");
var router = express.Router();
var template = require("../public/javascripts/template.js");
var connect_mongodb = require("../public/javascripts/connect_mongodb.js");
const User = require("../public/javascripts/user.js");
const Article = require("../public/javascripts/article.js");

//로그인 페이지
router.get("/login", function (req, res, next) {
  //세션이 없을경우 (로그인 필요)
  if (!req.session.user) {
    var html = template.LOGIN();
    res.send(html);
  } else {
    //세션이 있을경우
    res.writeHead(302, { Location: `/` });
    res.end();
  }
});
router.post("/login", (request, response) => {
  const ID = request.body.ID;
  const PWD = request.body.PWD;

  connect_mongodb(response);

  // User.create(ID, PWD).then((user) => {
  //   console.log(user); // 저장된 유저 정보 출력
  // });
  // User.findOne({ id: ID }).then((user) => {
  //   console.log(user); // 해당 유저 정보 출력
  // });

  // User.find({}).then((users) => {
  //   console.log(users.ID); // 모든 유저 정보 출력
  // });
  // User.remove({}, (err, output) => {
  //   if (err) return response.status(500).json({ error: "database failure" });
  // });
  // User.find(function (error, students) {
  //   console.log("--- Read all ---");
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log(students);
  //   }
  // });

  User.find({ id: ID, pwd: PWD }, (err, user) => {
    if (user.length > 0) {
      //아이디 비밀번호 일치 확인

      //세션 생성
      request.session.user = {
        _id: user[0]["_id"],
        id: ID,
        pw: PWD,
        name: "UsersNames!!!!!",
        authorized: true,
      };

      response.writeHead(302, { Location: `/` });
      response.end();
    } else {
      response.send("잘못된 아이디/비밀번호 정보");
    }
  });
});

//가입하기
router.get("/signin", function (req, res, next) {
  res.send(template.SIGNIN());
});
// async function loadArticles(user_Name) {
//   const queryUser = await User.findOne({ id: user_Name });
//   const user_PK = queryUser._id;
//   const queryUserArticle = await Article.find({ id: user_PK });
//   return [queryUser, queryUserArticle];
// }
module.exports = router;
