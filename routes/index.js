const { request } = require("express");
var express = require("express");
var router = express.Router();
var template = require("../public/javascripts/template.js");
var connect_mongodb = require("../public/javascripts/connect_mongodb.js");
const User = require("../public/javascripts/user.js");
const Article = require("../public/javascripts/article.js");
let contents = [];
let user_follows = [];
let contents_html = "";

async function loadUserFollowsPosts(logined_ID) {
  size = user_follows.length;

  for (i = 0; i < size; i++) {
    console.log(user_follows[i], "의 글 검색");
    //PK로 닉네임 검색
    const content_User = await User.findOne({ _id: user_follows[i] });
    //console.log(content_UserName["id"]);
    const res_Find_Article = await Article.find({ id: user_follows[i] });
    for (j = 0; j < res_Find_Article.length; j++) {
      //팔로우 한명의 article 목록
      contents.push(res_Find_Article[j]);
      let comments_html = "";
      let like_html = "";
      for (k = 0; k < res_Find_Article[j].comments.length; k++) {
        //console.log("작성자", res_Find_Article[j].comments[k].id);
        let user_name = await User.findOne(
          { _id: res_Find_Article[j].comments[k].id },
          { id: true }
        );
        //console.log("user_name = ", user_name["id"]);

        comments_html += `<div class="content_Comment"><a class="comment_User black_link" href="/${user_name["id"]}">${user_name["id"]}</a> <span class="comment_Text">${res_Find_Article[j].comments[k].text}</span> </div>`;
      }
      if (await loadLike(res_Find_Article[j], logined_ID)) {
        like_html = `<svg aria-label="좋아요" class="btn_like" id="btn_like" fill="#ed4956" height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>`;
      } else {
        like_html = `<svg aria-label="좋아요" class="btn_like" id="btn_like"  height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>`;
      }
      content_html = await template.CONTENT(
        user_follows[i],
        res_Find_Article[j],
        content_User["id"],
        comments_html,
        like_html
      );
      contents_html += content_html;
    }
  }
  //   await Article.find({ id: user_follows[i] }, async (err, article) => {
  //     for (j = 0; j < article.length; j++) {
  //       contents.push(article[j]);
  //       console.log(content_User["id"], "의 글");
  //       let comments_html = "";
  //       let like_html = "";

  //       for (k = 0; k < article[j].comments.length; k++) {
  //         console.log("작성자", article[j].comments[k].id);
  //         let user_name = await User.findOne(
  //           { _id: article[j].comments[k].id },
  //           { id: true }
  //         );
  //         console.log("user_name = ", user_name["id"]);
  //         comments_html += `<div class="content_Comment"><a class="comment_User">${user_name["id"]}</a> <span class="comment_Text">${article[j].comments[k].text}</span> </div>`;
  //       }
  //       if (loadLike(article[j], logined_ID)) {
  //         like_html = `<svg aria-label="좋아요" class="btn_like" id="btn_like" fill="#ed4956" height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>`;
  //       } else {
  //         like_html = `<svg aria-label="좋아요" class="btn_like" id="btn_like"  height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>`;
  //       }
  //       content_html = await template.CONTENT(
  //         article[j],
  //         content_User["id"],
  //         comments_html,
  //         like_html
  //       );

  //       contents_html += content_html;
  //       console.log(contents_html);
  //     }
  //     console.log("추가 완료");
  //   });
  // }
  // await console.log("loadUserFollowsPosts");
}

//좋아요가 되어있는지 아닌지
function loadLike(article, logined_ID) {
  const isLike = article.likes.filter((USER) => {
    return USER.id === logined_ID;
  });

  return isLike.length;
}

async function load(logined_ID1, logined_PK, res) {
  await connect_mongodb(res);
  await User.find(
    { _id: logined_PK },
    { _id: true, follows: true },
    (err, user) => {
      user[0].follows.forEach((element) => {
        user_follows.push(element.id);
      });
    }
  );
  await loadUserFollowsPosts(logined_ID1);

  await res.send(template.INDEX(logined_PK, logined_ID1, contents_html, true));
}
router.get("/", function (req, res, next) {
  if (req.session.user) {
    const logined_ID = req.session.user.id;
    const logined_PK = req.session.user._id;
    contents_html = "";
    contents = [];
    user_follows = [];
    load(logined_ID, logined_PK, res);
  } else {
    res.writeHead(302, { Location: `/accounts/login` });
    res.end();
  }
});

router.post("/check2", async function (req, res, next) {
  connect_mongodb(res);
  value = req.body.value;
  const result = await check(2, value);
  //console.log(value);
  try {
    if (result) {
      res.json({ status: 200 });
    } else {
      res.status(202);
      res.json({ status: 202 });
    }
  } catch (err) {
    next(err);
  }
});

//검색
router.post("/search", async function (req, res, next) {
  connect_mongodb(res);
  value = req.body.value;
  const result = await search_Users(value);
  try {
    if (result) {
      res.json({ status: 200, html: result });
    } else {
      res.status(202);
      res.json({ status: 202, html: "" });
    }
  } catch (err) {
    next(err);
  }
});

async function search_Users(value) {
  const result = await User.find().or([{ id: value }, { name: value }]);
  let search_Html = "";
  if (result.length >= 1) {
    search_Html = `<div class="container_Search">`;
    for (i = 0; i < result.length; i++) {
      let html = `<a href="/${result[i].id}"class="search_user">
   <div class="container_User">
    <div class="container_ProfileImage">
    <img src="https://jinstagram.s3.us-east-2.amazonaws.com/userProfile/${result[i]._id}.jpg"" class="img_ProfileImage"/>
    </div>
    <div class="container_UserInfo">
      <div class="container_UserID">
      <span class="span_UserID">${result[i].id}</span>
      </div>
      <span class="span_UserName">${result[i].name}</span>
    </div>
   </div></a>`;
      search_Html += html;
    }
    search_Html += "</div>";
  }
  return search_Html;
}

router.post("/accounts/signin", async function (req, res, next) {
  await connect_mongodb(res);
  const id = req.body.UserNickName;
  const pwd = req.body.PWD;
  const Name = req.body.Name;
  const PhoneOrEmail = req.body.PhoneOrEmail;
  User.create(id, pwd, Name);
  const newUser = await User.findOne({ id: id });
  var AWS = require("aws-sdk");
  var fs = require("fs");

  var file = fs.createReadStream("public/javascripts/hi.png");
  let s3 = new AWS.S3();
  AWS.config.loadFromPath("public/awsConfig.json");
  // var params = {
  //   Bucket: "jinstagram",
  //   Key: "hi",
  //   ACL: "public-read",
  //   Body: file,
  //   ContentType: "image/png",
  // };

  // s3.upload(params, function (err, data) {
  //   if (err) {
  //     console.log("err: ", err);
  //   }
  //   console.log("============");
  //   console.log("data: ", data);
  // });

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

async function loadArticles(user_Name) {
  const queryUser = await User.findOne({ id: user_Name });
  const user_PK = queryUser._id;

  const queryUserArticle = await Article.find({ id: user_PK });
  return [queryUser, queryUserArticle];
}

async function check(n, value) {
  if (n == 1) {
  } else if (n == 2) {
    const result = await User.find({ id: value });
    //console.log(result);
    if (result.length >= 1) {
      return false;
      //존재하는 아이디
    } else {
      return true;
      //존재하지 않는 아이디
    }
  }
}

router.get("/accounts/edit", async function (req, res, next) {
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

router.post("/accounts/edit", async function (req, res, next) {
  await connect_mongodb(res);
  const name = req.body.name;
  const introduction = req.body.Introduction;
  const phone = req.body.Phone;
  const email = req.body.Email;
  const PK = req.session.user._id;

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

async function loadArticles(res, user_Name) {
  connect_mongodb(res);
  const queryUser = await User.findOne({ id: user_Name });

  const user_PK = queryUser._id;

  const queryUserArticle = await Article.find({ id: user_PK });
  //console.log(queryUserArticle);
  return [queryUser, queryUserArticle];
}

router.post("/follow", async function (req, res, next) {
  connect_mongodb(res);
  const toUser = req.body.toUser;
  const isFollow = req.body.isFollow;
  const userPK = req.session.user._id;

  const queryFromUser = await User.findOne({ _id: userPK });
  const queryToUser = await User.findOne({ id: toUser });
  if (!isFollow) {
    //팔로우가 되어있지 않으면
    //팔로우 한다.
    queryFromUser.follows.push({ id: queryToUser._id });
    queryFromUser.save();
    queryToUser.followers.push({ id: userPK });
    queryToUser.save();
  } else {
    //팔로우가 되어있으면
    //언팔로우한다.
    const idx = queryFromUser.follows.findIndex((user) => {
      return user.id == queryToUser._id;
    });
    queryFromUser.follows.splice(idx, 1);
    queryFromUser.save();
    const idx2 = queryToUser.followers.findIndex((user) => {
      return user.id == userPK;
    });
    queryToUser.followers.splice(idx2, 1);
    queryToUser.save();
  }

  try {
    if (!isFollow) {
      res.json({ status: 200 });
    } else {
      res.status(201);
      res.json({ status: 201 });
    }
  } catch (err) {
    next(err);
  }
});

//개인 페이지
router.get("/:userID", async (req, res, next) => {
  const user_Name = req.params.userID;
  console.log("이게 왜 실행돼!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  let result = await loadArticles(res, user_Name);

  const user = result[0];
  const articles = result[1];
  let articles_Html = "";

  //불러온 articles로 html 생성
  for (i = 0; i < articles.length; i++) {
    let image_src = articles[i].image;
    if (i % 3 == 0) {
      articles_Html += `<div class="profile_Posts">`;
    }
    let article_Html = `
    <div class="profile_Post">
    <img src="https://jinstagram.s3.us-east-2.amazonaws.com/${image_src}.jpg"/>
  </div>`;
    articles_Html += article_Html;
    if (i % 3 == 2) articles_Html += `</div>`;
  }
  if (articles.length % 3) {
    let cnt = 3 - (articles.length % 3);
    for (i = 0; i < cnt; i++) {
      articles_Html += `
    <div class="profile_Post">
  </div></div>`;
    }
  }
  if (articles == null) {
    articles.length = 0;
  }
  //로그인이 안되어있을 경우

  if (req.session.user == undefined) {
    console.log("로그인 안되어있음");
    res.send(
      template.PROFILE(
        "",
        "",
        user,
        articles_Html,
        articles.length,
        "",
        "",
        false
      )
    );
  }
  if (req.session.user) {
    sessionPK = req.session.user._id;

    if (user_Name == req.session.user.id) {
      //자신의 프로필일 경우
      btn_EditHtml = `<a href="accounts/edit"><button class="btn_Edit">프로필 편집</button></a>`;
      res.send(
        template.PROFILE(
          sessionPK,
          req.session.user.id,
          user,
          articles_Html,
          articles.length,
          btn_EditHtml,
          "",
          true
        )
      );
    } else {
      //팔로우가 되어있는지 확인
      const queryUser = await User.findOne({ _id: sessionPK });
      const queryUser2 = await User.findOne({ id: req.params.userID });
      //팔로우 되어있는지 filter한다.
      const filter_Result = queryUser.follows.filter((follow) => {
        return follow.id == queryUser2._id;
      });

      const btnFollow_HTML = `<button class="btn_Follow">팔로우</button>`;
      const btnUnFollow_HTML = `<button class="btn_Follow un">언팔로우</button>`;

      if (filter_Result.length >= 1) {
        //팔로우 한사람
        res.send(
          template.PROFILE(
            sessionPK,
            req.session.user.id,
            user,
            articles_Html,
            articles.length,
            "",
            btnUnFollow_HTML,
            true
          )
        );
      } else {
        //팔로우 안한사람
        res.send(
          template.PROFILE(
            sessionPK,
            req.session.user.id,
            user,
            articles_Html,
            articles.length,
            "",
            btnFollow_HTML,
            true
          )
        );
      }
    }
  }
});
module.exports = router;
