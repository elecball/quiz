const express = require("express");
const router = express.Router();

const ctrl = require("./admin.ctrl");

router.get("/", ctrl.output.admin);

router.post("/isAdmin", ctrl.process.isAdmin);
router.post("/reset", ctrl.process.reset);
router.post("/getScores", ctrl.process.getScores);
router.post("/getQuizIndex", ctrl.process.getQuizIndex);
router.post("/closeQuiz", ctrl.process.closeQuiz);

module.exports = router;