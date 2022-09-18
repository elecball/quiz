const express = require("express");
const router = express.Router();

const ctrl = require("./quiz.ctrl");

router.get("/", ctrl.output.quiz);

module.exports = router;