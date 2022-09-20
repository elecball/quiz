const crypto = require("crypto");
const { response } = require("express");
const cookie = require("js-cookie");

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:verysusadmin@quizcluster.xolam4s.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();
        console.log("Connected to MongoDB in admin.ctrl.js");
    } catch (error) {
        console.error(error);
    }
}

connect();

function userList() {
    return client.db("Login").collection("Info");
}

function answersList() {
    return client.db("Quiz").collection("Answers");
}

async function quizCol() {
    return await client.db("Quiz").collection("Quiz");
}

const output = {
    admin: async (req, res) => {
        res.render("admin/admin");
    }
}

const process = {
    isAdmin: async (req, res) => {
        const response = { admin: false };
        await userList().findOne({"id": req.body.id}).then(obj => {
            if (obj != null) {
                if (obj["admin"])
                    response.admin = true;
            }
        });
        return res.json(response);
    },
    reset: async (req, res) => {
        await answersList().deleteMany({});
        (await quizCol()).findOneAndReplace({name: "deadline"}, {name: "deadline"});
        return res.json({});
    },
    getScores: async (req, res) => {
        const result = [];
        await answersList().find({}).forEach(obj => {
            result.push({
                id: obj.id,
                name: obj.name,
                score: obj.score,
            });
        });
        const sortedResult = {}, rankedResult = {};
        const scoreL = [];
        for (var i = 10; i >= 0; i--) {
            if (result.length == 0) break;
            var playerArr = [];
            if (result.findIndex(r => r.score == i) != -1) scoreL.push(i);
            while (true) {
                const index = result.findIndex(r => r.score == i);
                if (index == -1) break;
                var r = result[index];
                r.rank = scoreL.length;
                playerArr.push(r);
                result.splice(index, 1);
            }
            sortedResult[i] = playerArr;
        }
        return await res.json(sortedResult);
    },
    getQuizIndex: async (req, res) => {
        const response = { index : -1 };
        (await quizCol()).findOne({name: "deadline"}).then(obj => {
            response.index = Object.keys(obj).length - 1;
            return res.json(response);
        });
    },
    closeQuiz: async (req, res) => {
        var index = -1, response = { success : false };
        (await quizCol()).findOne({name: "deadline"}).then(async obj => {
            var newDoc = obj;
            index = Object.keys(newDoc).length - 1;
            if (index == 10) return res.json(response);
            newDoc[index] = new Date().getTime();
            (await quizCol()).findOneAndReplace({name: "deadline"}, newDoc).then((r) => {
                response.success = true;
                return res.json(response);
            });
        });
    }
}

module.exports = {
    output,
    process
};