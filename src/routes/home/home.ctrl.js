const crypto = require("crypto");

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:verysusadmin@quizcluster.xolam4s.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
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
    }
}

const process = {
    login: async (req, res) => {
        const index = await userList().findOne({"id": req.body.id});
        const response = {};
        if (index == null) {
            response.success = false;
            response.msg = "id not exists";
        }
        else if (crypto.createHmac('sha256', 'verySecretKey').update(req.body.password).digest('hex') != index.password) {
            response.success = false;
            response.msg = "password not matched";
        }
        else {
            response.success = true;
        }
        
        return res.json(response);
    },
    register: async (req, res) => {
        const response = {};
        if (userList().findOne({"id": req.body.id}) == null) {
            response.success = false;
            response.msg = "already exists";
        }
        else {
            userList().insertOne({ 
                "id": req.body.id, 
                "name": req.body.name, 
                "password": crypto.createHmac('sha256', 'verySecretKey').update(req.body.password).digest('hex')
            });
            response.success = true;
            
        }
        return res.json(response);
    },
}

module.exports = {
    output,
    process
};