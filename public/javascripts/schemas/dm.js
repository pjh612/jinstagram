const mongoose = require("mongoose");
const message = new mongoose.Schema({
  id: { type: String },
  content: { type: String },
  date: { type: Date, default: Date.now() },
});
const participant = new mongoose.Schema({
  id: String,
});
const DM = new mongoose.Schema({
  participants: [participant],
  messages: [message],
});

DM.statics.create = async function (selectedList) {
  let participants = [];
  selectedList.forEach(async (element) => {
    await participants.push({ id: element });
  });

  const newdm = new this({
    participants: participants,
  });

  return await newdm.save();
};

module.exports = mongoose.model("DM", DM);
