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
  console.log("size=", size);
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
      if (loadLike(res_Find_Article[j], logined_ID)) {
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
function makeContentsHTML() {
  contents.forEach((content) => {});
  console.log("makeContentHTML");
  console.log(contents_html);
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

  await res.send(template.INDEX(logined_ID1, contents_html));
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
    res.writeHead(302, { Location: `/login` });
    res.end();
  }
});

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

//개인 페이지
router.get("/:userID", async (req, res, next) => {
  console.log(req.params);
  const user_Name = req.params.userID;
  let result = await loadArticles(user_Name);
  const user_PK = result[0];
  const articles = result[1];
  let articles_Html = "";

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
  res.send(template.PROFILE(user_PK, articles_Html));
});
module.exports = router;

async function loadArticles(user_Name) {
  const queryUser = await User.findOne({ id: user_Name });
  const user_PK = queryUser._id;
  const queryUserArticle = await Article.find({ id: user_PK });
  return [user_PK, queryUserArticle];
}
