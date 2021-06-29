const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "bankdb",
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

function timeout (ms) {
    return new Promise(res => setTimeout(res,ms));
}

app.get('/api/getUsers', (req, res) => {
    
    const getUsers = 'SELECT * FROM bankdb.users;';

    db.query(getUsers, (err, result) => {
        if(err){
            res.send('err');
        }
        else{
            res.send(result);
        }

    })
});

app.get('/api/console', (req, res) => {
    console.log("recieved call");
    res.send("Call processed");
});

app.get('/api/transactions', (req, res) => {
    
    const getUsers = 'SELECT * FROM bankdb.transactions;';

    db.query(getUsers, (err, result) => {
        if(err){
            res.send('err');
        }
        else{
            res.send(result);
        }

    })
});

app.post('/api/getTransactionUser', (req, res) => {
    
    const mobileNumber = req.body.mobileNumber;
    const getTransactionUser = 'SELECT * FROM bankdb.transactions WHERE sender_mobile_number=? OR reciever_mobile_number=? ;';

    console.log('recieved');
    console.log(req.body);

    db.query(getTransactionUser, [mobileNumber,mobileNumber], (err, result) => {
        if(err){
            res.send('err');
        }
        else{
            console.log('sent');
            console.log(result);
            res.send(result);
        }

    })
});

app.post('/api/addUser', (req, res) => {

    const mobileNumber = req.body.mobileNumber;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const balance = req.body.balance;

    console.log('receiver');
    console.log(req.body);

    const addUser = 'INSERT INTO users (mobileNumber, firstName, lastName, balance) VALUES (?, ?, ?, ?);'; 

    db.query(addUser, [mobileNumber, firstName, lastName, balance], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            console.log('sent');
            console.log(result);
            res.send(`${firstName} added into database`);
        }
    })
});

async function userDetails (mobileNumber) {
    const checkUser = 'SELECT balance FROM users WHERE mobileNumber = ?;';
    var result = [];

    db.query(checkUser, [mobileNumber], (err, res) => {
        result =  res;
        console.log(result);
    })

    await timeout(3000);

    return result;
}

async function updateBalance(mobileNumber, newBalance){
    const updateBalance = "UPDATE users SET balance = ? WHERE mobileNumber = ?"

    db.query(updateBalance, [newBalance, mobileNumber], (err, res) => {
        console.log('updated');
    })
}

app.post('/api/addTransaction', async (req, res) => {

    console.log('recieved');

    const sender_mobile_number = req.body.sender_mobile_number;
    const reciever_mobile_number = req.body.reciever_mobile_number;
    const amount = req.body.amount;
    const message = req.body.message;

    // sender
    const sender = await userDetails(sender_mobile_number);

    //reciever
    const reciever = await userDetails(reciever_mobile_number);

    // did not add transaction if sender/reciever not a user
    if(sender.length == 0){
        console.log("fail0");
        res.send('fail0'); //fail0 = sender not a user
    }
    else if(reciever.length == 0){
        console.log("fail1");
        res.send('fail1'); //fail0 = reciever not a user
    }
    else {
        console.log(sender);
        console.log(reciever);

        const before_transaction_sender = sender[0].balance;
        const before_transaction_reciever = reciever[0].balance;
        var after_transaction_sender = before_transaction_sender;
        var after_transaction_reciever = before_transaction_reciever;

        var is_success = 0;

        if(before_transaction_sender >= amount){
            is_success = 1;
            after_transaction_sender = before_transaction_sender - amount;
            after_transaction_reciever = before_transaction_reciever + amount;
        }

        await updateBalance(sender_mobile_number, after_transaction_sender);
        await updateBalance(reciever_mobile_number, after_transaction_reciever);

        const addTransaction = 'INSERT INTO transactions (sender_mobile_number, reciever_mobile_number, is_success, amount, before_transaction_sender, after_transaction_sender, before_transaction_reciever, after_transaction_reciever, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';

        db.query(addTransaction, [sender_mobile_number, reciever_mobile_number, is_success, amount, before_transaction_sender, after_transaction_sender, before_transaction_reciever, after_transaction_reciever, message], (err, result) => {
            if(err){
                console.log(err);
                res.send(err);
            }
            else{
                if(is_success == 1){
                    console.log('success');
                    res.send('success');
                }
                else{
                    console.log("fail2");
                    res.send('fail2'); //fail due to lack of balance
                }
            }
        })
    }
});

app.listen(3001, () => {
    console.log("running on port 3001");
});