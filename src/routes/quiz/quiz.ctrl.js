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

async function quizAnswer(index) {
    return await client.db("Quiz").collection("Quiz").findOne({name: "answer"}).then(obj => {
        return obj[index];
    });
}

const output = {
    quiz: (req, res) => {
        res.render("quiz/quiz");
    }
}

const process = {
    sendAnswer: async (req, res) => {
        const answers = req.body.answer, answer = {};
        var score = 0;
        for (var i = 1; i <= 10; i++) {
            answer[i.toString()] = { value: answers[i], time: new Date().getTime() };
            if (await quizAnswer(i) == answers[i]) 
                score++;
        }
        await client.db("Quiz").collection("Answers").insertOne({
            id: req.body.id, name: req.body.name, answers: answer, score: score
        });
        return await res.json({ score: score });
    }
}

module.exports = {
    output,
    process
};