const mongoose = require("mongoose");
// const DB = process.env.DATABASE;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const DB = `mongodb+srv://${username}:${password}@cluster0.vkpqcd1.mongodb.net/?retryWrites=true&w=majority`;
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
  .catch((err) => console.log("Server Not connected"));
