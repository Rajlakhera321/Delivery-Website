const { Schema, model } = require("mongoose");

const userModel = new Schema({
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = model("user", userModel, "user");
