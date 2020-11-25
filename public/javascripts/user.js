const mongoose = require("mongoose");

const follower = new mongoose.Schema({
  id: { type: String },
});
const follow = new mongoose.Schema({
  id: { type: String },
});
const userSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  pwd: String,
  followers: { type: [follower] },
  follows: { type: [follow] },
});

// userSchema.statics.findOne = function (id) {
//   return this.findOne({
//     id,
//   }).exec();
// };

userSchema.statics.create = function (username, password) {
  const user = new this({
    id: username,
    pwd: password,
  });
  return user.save();
};
module.exports = mongoose.model("userSchema", userSchema);
