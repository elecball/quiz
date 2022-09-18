const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const home = require("./src/routes/home");
const quiz = require("./src/routes/quiz");

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", home);
app.use("/quiz", quiz);

module.exports = app;