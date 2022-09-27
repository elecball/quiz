const express = require("express");
const router = express.Router();

const ctrl = require("./quiz.ctrl");

router.get("/", ctrl.output.quiz);

router.post("/sendAnswer", ctrl.process.sendAnswer);
router.post("/isLate", ctrl.process.isLate);

module.exports = router;