var AWS = require("aws-sdk");
var fs = require("fs");

// 접속정보 설정
AWS.config.loadFromPath("../awsConfig.json");

var file = fs.createReadStream("hi.png");

var params = {
  Bucket: "jinstagram",
  Key: "hi",
  ACL: "public-read",
  Body: file,
  ContentType: "image/png",
};

let s3 = new AWS.S3();

s3.upload(params, function (err, data) {
  if (err) {
    console.log("err: ", err);
  }
  console.log("============");
  console.log("data: ", data);
});
