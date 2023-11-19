const dotenv = require("dotenv");
//const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const passport = require("passport"); // Add this line
// const connection = require("./db");
const cors = require("cors");
app.use(cors());

const jwt = require("jsonwebtoken");

dotenv.config({ path: "./config.env" });
require("./db/conn");
require("./config/passport"); // Add this line

app.use(express.json());
app.use(passport.initialize()); // Add this line
app.use(require("./router/auth"));

const PORT = process.env.PORT;


const restaurantRoutes = require("./router/restaurentRoutes");
app.use("/restaurant", restaurantRoutes);
app.use("/public/uploads", express.static("public/uploads"));

app.listen(PORT, () => {
  console.log(`Server is running at port no: ${PORT}!`);
});
