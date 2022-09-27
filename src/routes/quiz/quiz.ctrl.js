const crypto = require("crypto");
const mongoose = require("mongoose");

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:verysusadmin@quizcluster.xolam4s.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();
        await mongoose.connect(uri);
        console.log("Connected to MongoDB in quiz.ctrl.js");
    } catch (error) {
        console.error(error);
    }
}

connect();

function userList() {
    return client.db("Login").collection("Info");
}

async function quizAnswer() {
    return client.db("Quiz").collection("Quiz").findOne({name: "answer"}).then(obj => {
        var result = [-1];
        for (var i = 1; i <= 10; i++)
            result.push(obj[i]);
        return result;
    });
}

async function quizCol() {
    return client.db("Quiz").collection("Quiz");
}

async function getQuizIndex () {
    return (await quizCol()).findOne({name: "deadline"}).then(obj => {
        return Object.keys(obj).length - 1;
    });
}

const output = {
    quiz: (req, res) => {
        res.render("quiz/quiz");
    }
}

const process = {
    sendAnswer: async (req, res) => {
        const answers = req.body.answer;
        var score = 0;
        (await quizCol()).findOne({name: "answer"}).then(async t => {
            const qAns = await quizAnswer();
            for (var i = 1; i <= 10; i++) {
                if (qAns[i] == answers[i]) score++;
            }
            client.db("Quiz").collection("Answers").insertOne({
                id: req.body.id, name: req.body.name, answers: answers, score: score
            });
            return res.json({ score: score });
        });
    },
    isLate: async (req, res) => {
        (await quizCol()).findOne({name: "deadline"}).then(obj => {
            return res.json({ isLate : (obj.index >= req.body.index) });
        });
    }
}

module.exports = {
    output,
    process
};