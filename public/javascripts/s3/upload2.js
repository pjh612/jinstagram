//프로필 변경
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

//console.log(endpoint);

const config = require("./awsConfig.json");
const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
const s3 = new AWS.S3({
  endpoint: endpoint,
  region: config.region,
  credentials: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  },
});
//console.log(s3);
const storage = multerS3({
  s3: s3,
  bucket: "jinstagram",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: "public-read-write",
  overwite: true,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `userProfile/${req.session.user._id}.jpg`);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

exports.upload = multer({ storage: storage });
