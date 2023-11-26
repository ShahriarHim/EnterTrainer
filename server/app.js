const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const passport = require("passport");
const cors = require("cors");
app.use(cors());

const jwt = require("jsonwebtoken");

dotenv.config({ path: "./config.env" });
require("./db/conn");
require("./config/passport");

app.use(express.json());
app.use(passport.initialize());

// Your existing route for authentication
app.use(require("./router/auth"));

// Additional route for course content
const courseContentRoutes = require("./router/courseContentRoutes");
app.use("/course-content", courseContentRoutes);

// Your existing route for courses
const courseRoutes = require("./router/courseRoutes");
app.use("/course", courseRoutes);
app.use("/public/uploads", express.static("public/uploads"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running at port no: ${PORT}!`);
});
