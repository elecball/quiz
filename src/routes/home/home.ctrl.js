const crypto = require("crypto");

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:verysusadmin@quizcluster.xolam4s.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();
        console.log("Connected to MongoDB in home.ctrl.js");
    } catch (error) {
        console.error(error);
    }
}

connect();

function userList() {
    return client.db("Login").collection("Info");
}

const output = {
    home: (req, res) => {
        res.render("home/home")
    },
    login: (req, res) => {
        res.render("home/login");
    },
    register: (req, res) => {
        res.render("home/register");
    },
    quiz: (req, res) => {
        res.render("quiz/quiz");
    }
}

const process = {
    login: async (req, res) => {
        const index = await userList().findOne({"id": req.body.id});
        const response = { userInfo: { id: index.id, name: index.name }};
        if (index == null) {
            response.success = false;
            response.msg = "id not exist";
        }
        else if (crypto.createHmac('sha256', 'verySecretKey').update(req.body.password).digest('hex') != index.password) {
            response.success = false;
            response.msg = "password incorrect";
        }
        else {
            response.success = true;
        }

        return res.json(response);
    },
    register: async (req, res) => {
        const response = { success: true };

        await userList().findOne({"id": req.body.id}).then(obj => {
            if (obj != null) {
                response.success = false;
                response.msg = "ID already exists";
            }
        });

        console.log(response);

        if (response.success) {
            userList().insertOne({ 
                "id": req.body.id, 
                "name": req.body.name, 
                "password": crypto.createHmac('sha256', 'verySecretKey').update(req.body.password).digest('hex'),
                "admin": false
            });
        }
        return res.json(response);
    },
    isExisting: async (req, res) => {
        const response = { exist: false };

        await userList().findOne({"id": req.body.id}).then(obj => {
            if (obj != null) {
                response.exist = true;
            }
        });
        return res.json(response);
    }
}

module.exports = {
    output,
    process
};