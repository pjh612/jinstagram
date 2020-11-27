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
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  introduction: { type: String, default: "" },
  followers: { type: [follower] },
  follows: { type: [follow] },
});

// userSchema.statics.findOne = function (id) {
//   return this.findOne({
//     id,
//   }).exec();
// };

userSchema.statics.create = function (id, password, name) {
  const user = new this({
    id: id,
    pwd: password,
    name: name,
  });
  return user.save();
};
module.exports = mongoose.model("userSchema", userSchema);
