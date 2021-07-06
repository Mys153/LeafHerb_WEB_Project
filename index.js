const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "LeafHerbSystem"
})

app.get('/leafherb', (req, res) => {
    db.query("SELECT * FROM leafherb", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });

});

app.post('/create', (req, res) => {
    const SPname = req.body.SPname;
    const Cname = req.body.Cname;
    const Sname = req.body.Sname;
    const Family = req.body.Family;
    const Characteristic = req.body.Characteristic;
    const Ingredient = req.body.Ingredient;
    const Img = req.body.Img;

    db.query("INSERT INTO leafherb (SPname, Cname, Sname, Family, Characteristic, Ingredient, Img) VALUES(?,?,?,?,?,?,?)",
        [SPname, Cname, Sname, Family, Characteristic, Ingredient, Img],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        });
})

app.put('/update', (req, res) => {
    const HID = req.body.HID;
    const SPname = req.body.SPname;
    db.query("UPDATE leafherb SET SPname = ? WHERE HID = ?", [SPname, HID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values result");
        }
    })
})

app.delete('/delete/:HID', (req, res) => {
    const HID = req.params.HID;
    db.query("DELETE FROM leafherb WHERE HID =?", HID, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})

app.listen('3001', () => {
    console.log('Server is running on poet 3001');
})