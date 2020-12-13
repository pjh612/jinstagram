const { request } = require("express");
const { upload } = require("../public/javascripts/s3/upload2.js");
var express = require("express");
var router = express.Router();
var template = require("../public/javascripts/template.js");
var connect_mongodb = require("../public/javascripts/connect_mongodb.js");
const User = require("../public/javascripts/schemas/user.js");
const Article = require("../public/javascripts/schemas/article.js");

router.post("/login", async (request, response) => {
  const ID = request.body.id;
  const PWD = request.body.pwd;

  connect_mongodb(response);

  console.log(ID, PWD);
  const queryUser = await User.findOne({ id: ID });
  console.log(queryUser);
  if (queryUser) {
    if (PWD == queryUser.pwd) {
      //로그인 성공
      request.session.user = {
        _id: queryUser["_id"],
        id: ID,
        pw: PWD,
        authorized: true,
      };

      response.json({ status: 200, msg: "로그인성공" });

      response.end();
    } else {
      //비밀번호 틀림
      response.status(201);
      response.json({
        status: 201,
        msg: "잘못된 비밀번호입니다. 다시 확인하세요.",
      });
    }
  } else {
    //계정이 존재하지 않음
    response.status(202);
    response.json({
      status: 202,
      msg:
        "입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다. 사용자 이름을 확인하고 다시 시도하세요.",
    });
  }
});

//가입하기
router.get("/signin", function (req, res, next) {
  res.send(template.SIGNIN());
});
router.post("/signin", async function (req, res, next) {
  await connect_mongodb(res);
  const id = req.body.UserNickName;
  const pwd = req.body.PWD;
  const Name = req.body.Name;
  const PhoneOrEmail = req.body.PhoneOrEmail;
  await User.create(id, pwd, Name);

  const newUser = await User.findOne({ id: id });
  var AWS = require("aws-sdk");

  const config = require("../public/javascripts/s3/awsConfig.json");
  const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
  let s3 = new AWS.S3({
    endpoint: endpoint,
    region: config.region,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
  params = {
    Bucket: "jinstagram",
    CopySource: "/jinstagram" + "/" + "userProfile" + "/" + "noprofile.jpg",
    Key: `userProfile/${newUser._id}.jpg`,
  };

  s3.copyObject(params, function (err, data) {
    if (err) {
      console.log("err: ", err);
    }
    console.log("============");
    console.log("data: ", data);
  });
  res.writeHead(302, { Location: `/` });
  res.end();
});
router.get("/edit", async function (req, res, next) {
  if (!req.session.user) {
    console.log("로그인해야됨");
    res.writeHead(302, { Location: `/accounts/login` });
    res.end();
  } else {
    const PK = req.session.user._id;
    await connect_mongodb(res);
    const queryUser = await User.findOne({ _id: PK });
    const id = queryUser.id;
    const name = queryUser.name;
    const introduction = queryUser.introduction;
    const phone = queryUser.phone;
    const email = queryUser.email;

    res.send(template.EDIT(PK, id, name, introduction, phone, email));
  }
});

router.post("/profile", upload.single("img"), function (req, res, next) {
  res.writeHead(302, { Location: `/` });
  res.end();
});

router.post("/edit", async function (req, res, next) {
  await connect_mongodb(res);
  const name = req.body.name;
  const introduction = req.body.Introduction;
  const phone = req.body.Phone;
  const email = req.body.Email;
  const PK = req.session.user._id;
  if (name.length == 0) {
  }
  await saveProfile(res, PK, name, introduction, phone, email);
  await res.writeHead(302, { Location: `/` });
  await res.end();
});

async function saveProfile(res, PK, name, introduction, phone, email) {
  connect_mongodb(res);
  const queryUser = await User.findOne({ _id: PK });
  queryUser.introduction = introduction;
  queryUser.name = name;
  queryUser.phone = phone;
  queryUser.email = email;
  await queryUser.save();
}
module.exports = router;
