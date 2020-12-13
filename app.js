var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var accountsRouter = require("./routes/accounts");
var pRouter = require("./routes/p");
var newContentRouter = require("./routes/newcontent");
var addCommentRouter = require("./routes/add_comment.js");
var likeRouter = require("./routes/like");
var session = require("express-session");
var indexRouter = require("./routes/index");
var directRouter = require("./routes/direct");
const User = require("./public/javascripts/schemas/user.js");
const DM = require("./public/javascripts/schemas/dm.js");
var app = express();

let clients = [];
app.io = require("socket.io")();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(function (req, res, next) {
  res.io = app.io;
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/accounts", accountsRouter);
app.use("/newcontent", newContentRouter);
app.use("/add_comment", addCommentRouter);
app.use("/like", likeRouter);
app.use("/p", pRouter);
app.use("/", indexRouter);
app.use("/direct", directRouter);

app.io.on("connection", function (socket) {
  console.log("user connected!!");
  socket.on("login", function (data) {
    let clientInfo = new Object();
    clientInfo.uid = data.uid;
    clientInfo.id = socket.id;
    clients.push(clientInfo);
    console.log(clientInfo);
    console.log("clients-------------------");
    console.log(clients);
    console.log("clients-------------------");
  });
  socket.on("sendDM", async function (data) {
    console.log("sendDM", data.dm_ID, data.uid, data.message); //메시지 보낸사람 정보
    const queryDM = await DM.findOne({ _id: data.dm_ID });

    console.log(queryDM);
    const participants = queryDM.participants;
    console.log("clients-------------------");
    console.log(clients);
    console.log("clients-------------------");
    for (i = 0; i < clients.length; i++) {
      var client = clients[i];
      console.log(client);
      if (participants.indexOf(client.uid)) {
        queryUser = await User.findOne({ _id: data.uid });

        app.io.sockets.to(client.id).emit("message", {
          dm_ID: data.dm_ID,
          uid: data.uid,
          id: queryUser.id,
          message: data.message,
        });
      }
    }
  });
});

module.exports = app;
