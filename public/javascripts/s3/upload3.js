const AWS = require("aws-sdk");
const fs = require("fs");
const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
const region = "kr-standard";
const config = require("./awsConfig.json");

const S3 = new AWS.S3({
  endpoint: endpoint,
  region: region,
  credentials: {
    accessKeyId: config.access_key,
    secretAccessKey: config.secret_key,
  },
});

const bucket_name = "jinstagram";
const local_file_name = `public/images/mainA_4.jpg`;
const object_name = `userProfile/123.jpg`;

let options = {
  partSize: 5 * 1024 * 1024,
};

(async () => {
  await S3.upload(
    {
      Bucket: bucket_name,
      Key: object_name,
      Body: fs.createReadStream(local_file_name),
    },
    options
  ).promise();
})();
