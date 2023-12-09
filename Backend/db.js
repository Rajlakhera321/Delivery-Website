const mongoose = require("mongoose");
require("dotenv").config();

const mongoDB = () => {
  mongoose.connect(process.env.DB_URL ,(err) => {
      if(err) console.log(err);
      console.log("connected to mongodb");
  });
};

module.exports = mongoDB;
