const mongoose = require("mongoose");
module.exports = async function () {
  try {
    // db connection
    await mongoose.connect("mongodb://127.0.0.1:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  } catch (err) {
    console.log(err);
  }
};
