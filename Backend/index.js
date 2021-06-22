const express = require("express");
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "bankdb",
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
    
    const name = req.body.name;

    res.send(`Hello there! How are you ${name}?`);
});

app.post('/api/addUser', (req, res) => {

    const mobileNumber = req.body.mobileNumber;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const balance = req.body.balance;

    const addUser = 'INSERT INTO users (mobileNumber, firstName, lastName, balance) VALUES (?, ?, ?, ?);'; 

    db.query(addUser, [mobileNumber, firstName, lastName, balance], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(`${firstName} added into database`);
        }
    })
});

app.post('/api/addTransaction', (req, res) => {

    const sender_mobile_number = req.body.sender_mobile_number;
    const reciever_mobile_number = req.body.reciever_mobile_number;
    const amount = req.body.amount;
    const message = req.body.message;

    const checkUser = 'SELECT *FROM users WHERE mobileNumber = ?';

    var sender = [];
    var reciever = [];

    //sender
    db.query(checkUser, sender_mobile_number, (err, result) => {
        sender = result;
    });
    //reciever
    db.query(checkUser, reciever_mobile_number, (err, result) => {
        reciever = result;
    });

    if(sender == [] || reciever == [] || sender[0].balance < amount){


        const failed = 'INSERT INTO transactions (timestamp, sender_mobile_number, reciever_mobile_number, is_success, amount, before_transaction_sender, after_transaction_sender, before_transaction_reciever, after_transaction_reciever, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(failed, [])

        res.send("Failed");
    }
    else{

    }
    
});

app.listen(3001, () => {
    console.log("running on port 3001");
});