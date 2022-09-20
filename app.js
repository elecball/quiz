const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const home = require("./src/routes/home");
const quiz = require("./src/routes/quiz");
const admin = require("./src/routes/admin");

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", home);
app.use("/quiz", quiz);
app.use("/admin", admin);

module.exports = app;