var express = require("express");
var router = express.Router();
var template = require("../public/javascripts/template.js");
var qs = require("querystring");
var connect_mongodb = require("../public/javascripts/connect_mongodb.js");
const User = require("../public/javascripts/user.js");
/* GET home page. */
router.get("/", function (req, res, next) {
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
router.post("/", (request, response) => {
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
    //console.log(user);
    if (user.length > 0) {
      //아이디 비밀번호 일치 확인

      //세션 생성
      request.session.user = {
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
module.exports = router;
