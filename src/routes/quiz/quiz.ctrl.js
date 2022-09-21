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

async function quizDLTime() {
    return await client.db("Quiz").collection("Quiz").findOne({name: "deadline"});
}

const output = {
    quiz: (req, res) => {
        res.render("quiz/quiz");
    }
}

const process = {
    sendAnswer: async (req, res) => {
        const time = new Date().getTime();
        const answers = req.body.answer, answer = {};
        var score = 0;
        quizDLTime().then(async t => {
            const qAns = await quizAnswer();
            for (var i = 1; i <= 10; i++) {
                answer[i] = { value: answers[i], time: time };
                console.log(t[i], answer[i].time, t[i] < answer[i].time);
                if (qAns[i] == answers[i]) {
                    var isLate = false;
                    if (t[i] != undefined) 
                        if (t[i] < answer[i].time) isLate = true;
                    
                    if (!isLate)
                        score++;
                }
            }
            client.db("Quiz").collection("Answers").insertOne({
                id: req.body.id, name: req.body.name, answers: answer, score: score
            });

            console.log({
                id: req.body.id, name: req.body.name, answers: answer, score: score
            });
            return res.json({ score: score });
        });
    }
}

module.exports = {
    output,
    process
};