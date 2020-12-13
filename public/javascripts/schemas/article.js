const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  id: String,
  text: String,
  time: { type: Date, default: Date.now },
});
const like = new mongoose.Schema({
  id: { type: String },
});

const article = new mongoose.Schema({
  id: { type: String },
  image: String,
  content: String,
  time: { type: Date, default: Date.now },
  comments: { type: [comment] },
  likes: [like],
});

// userSchema.statics.findOne = function (id) {
//   return this.findOne({
//     id,
//   }).exec();
// };

article.statics.create = function (username, img, content, time) {
  const _content = new this({
    id: username,
    image: img,
    content: content,
    time: time,
    comments: [],
    likes: [],
  });
  return _content.save();
};

module.exports = mongoose.model("article", article);
