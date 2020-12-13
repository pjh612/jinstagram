var express = require("express");
var router = express.Router();
var template = require("../public/javascripts/template.js");
var url = require("url");

const User = require("../public/javascripts/schemas/user.js");
const Article = require("../public/javascripts/schemas/article.js");
router.get("/:contentID", async (req, res, next) => {
  const logined_PK = req.session.user._id;
  const logined_ID = req.session.user.id;
  console.log(req.params);
  const contentID = req.params.contentID;

  const queryArticle = await Article.findOne({ _id: contentID });
  console.log(queryArticle);
  const writerID = queryArticle.id;
  const queryWriter = await User.findOne({ _id: writerID });
  let comments_html = "";
  let like_html = "";
  for (i = 0; i < queryArticle.comments.length; i++) {
    let user_name = await User.findOne(
      { _id: queryArticle.comments[i].id },
      { id: true }
    );
    comments_html += `<div class="content_Comment">
    <div class="container_Comment"><a class="comment_User black_link" href="/${
      user_name["id"]
    }"><img src="	https://kr.object.ncloudstorage.com/jinstagram/userProfile/${
      user_name["_id"]
    }.jpg" class="user_image" >${user_name["id"]}</a> 
    
    <span class="comment_Text">${
      queryArticle.comments[i].text
    }</span> </div><span class="comment_Date"> ${
      Math.floor(
        (Date.now() - queryArticle.comments[i].time.getTime()) / 1000
      ) < 60
        ? Math.floor(
            (Date.now() - queryArticle.comments[i].time.getTime()) / 1000
          ) + "초"
        : Math.floor(
            (Date.now() - queryArticle.comments[i].time.getTime()) / (1000 * 60)
          ) < 60
        ? Math.floor(
            (Date.now() - queryArticle.comments[i].time.getTime()) / (1000 * 60)
          ) + "분"
        : Math.floor(
            (Date.now() - queryArticle.comments[i].time.getTime()) /
              (1000 * 3600)
          ) < 24
        ? Math.floor(
            (Date.now() - queryArticle.comments[i].time.getTime()) /
              (1000 * 3600)
          ) + "시간"
        : Math.floor(
            (Date.now() - queryArticle.comments[i].time.getTime()) /
              (1000 * 3600 * 24)
          ) < 7
        ? Math.floor(
            (Date.now() - queryArticle.comments[i].time.getTime()) /
              (1000 * 3600 * 24)
          ) + "일"
        : Math.floor(
            (Date.now() - queryArticle.comments[i].time.getTime()) /
              (1000 * 3600 * 24) /
              7
          ) + "주"
    }</span></div>`;
    if (await loadLike(queryArticle, logined_PK)) {
      like_html = `<svg aria-label="좋아요" class="btn_like" id="btn_like" fill="#ed4956" height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>`;
    } else {
      like_html = `<svg aria-label="좋아요" class="btn_like" id="btn_like"  height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>`;
    }
  }
  res.send(
    template.P_GET(
      logined_PK,
      logined_ID,
      queryWriter._id,
      queryArticle,
      queryWriter.id,
      comments_html,
      like_html,
      logined_PK ? true : false
    )
  );
});
router.post("/:contentID", async (req, res, next) => {
  if (!req.session.user) {
    res.status(201);
    res.json({ status: 201 });
  }

  const contentID = req.params.contentID;
  const logined_PK = req.session.user._id;
  const queryArticle = await Article.findOne({ _id: contentID });
  const writerID = queryArticle.id;
  const queryWriter = await User.findOne({ _id: writerID });
  let comments_html = "";
  let like_html = "";
  for (i = 0; i < queryArticle.comments.length; i++) {
    let user_name = await User.findOne(
      { _id: queryArticle.comments[i].id },
      { id: true }
    );
    comments_html += `<div class="content_Comment"><div class="container_Comment"><a class="comment_User black_link" href="/${
      user_name["id"]
    }"><img src="	https://kr.object.ncloudstorage.com/jinstagram/userProfile/${
      user_name["_id"]
    }.jpg" class="user_image" >${
      user_name["id"]
    }</a> <span class="comment_Text">${
      queryArticle.comments[i].text
    }</span></div><span class="comment_Date">${
      Math.floor(
        (Date.now() - queryArticle.comments[i].time.getTime()) / 1000
      ) < 60
        ? Math.floor(
            (Date.now() - queryArticle.comments[i].time.getTime()) / 1000
          ) + "초"
        : Math.floor(
            (Date.now() - queryArticle.comments[i].time.getTime()) / (1000 * 60)
          ) < 60
        ? Math.floor(
            (Date.now() - queryArticle.comments[i].time.getTime()) / (1000 * 60)
          ) + "분"
        : Math.floor(
            (Date.now() - queryArticle.comments[i].time.getTime()) /
              (1000 * 3600)
          ) < 24
        ? Math.floor(
            (Date.now() - queryArticle.comments[i].time.getTime()) /
              (1000 * 3600)
          ) + "시간"
        : Math.floor(
            (Date.now() - queryArticle.comments[i].time.getTime()) /
              (1000 * 3600 * 24)
          ) < 7
        ? Math.floor(
            (Date.now() - queryArticle.comments[i].time.getTime()) /
              (1000 * 3600 * 24)
          ) + "일"
        : Math.floor(
            (Date.now() - queryArticle.comments[i].time.getTime()) /
              (1000 * 3600 * 24) /
              7
          ) + "주"
    }</span> </div>`;
    if (await loadLike(queryArticle, logined_PK)) {
      like_html = `<svg aria-label="좋아요" class="btn_like" id="P_btn_like" fill="#ed4956" height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>`;
    } else {
      like_html = `<svg aria-label="좋아요" class="btn_like" id="P_btn_like"  height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>`;
    }
  }

  res.json({
    html: template.P(
      queryWriter._id,
      queryArticle,
      queryWriter.id,
      comments_html,
      like_html
    ),
    url: makeURL(req, contentID),
  });
});

function loadLike(article, logined_PK) {
  const isLike = article.likes.filter((USER) => {
    console.log(USER.id, logined_PK);
    return USER.id === logined_PK;
  });

  return isLike.length;
}

function makeURL(req, contentID) {
  return url.format({
    protocol: req.protocol,
    host: req.get("host"),
  });
}

module.exports = router;
