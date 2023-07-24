
const functions = require("firebase-functions");
const admin = require('firebase-admin');
require("dotenv").config();

const express = require("express");
const app = express();

//body parser for our json data
app.use(cors({ origin: true }));

//cross origin
const cors = require("cors");
app.use(cors({ origin: true }));
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    next();
});
//firebase credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hotel-management-system-cf527-default-rtdb.asia-southeast1.firebasedatabase.app"
});

//api endpoints
app.get("/", (req, res) => {
    return res.send("hello world");
});

const userRoute = require('../routes/user')
app.use("/api/users", userRoute);
exports.app = funtions.https.onRequest(app);
