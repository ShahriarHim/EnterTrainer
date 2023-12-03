require("dotenv").config();
const mongoose = require("mongoose");
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Server Connected!");
  })
  .catch((err) => console.log("Server Not connected because",err.message));
