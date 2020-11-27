var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var accountsRouter = require("./routes/accounts");
var newContentRouter = require("./routes/newcontent");
var login_ProcessRouter = require("./routes/login_process");
var addCommentRouter = require("./routes/add_comment.js");
var likeRouter = require("./routes/like");
var session = require("express-session");

var graphqlHTTP = require("express-graphql");
var Graphql = require("graphql");
var app = express();
// app.use(
//   "/graphql",
//   graphqlHTTP({
//     graphiql: true,
//   })
// );
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
//app.use("/login", loginRouter);
app.use("/login_process", login_ProcessRouter);
app.use("/newcontent", newContentRouter);
app.use("/add_comment", addCommentRouter);
app.use("/like", likeRouter);
app.use("/accounts", accountsRouter);
module.exports = app;
