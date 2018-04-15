const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const filehandler = require("./desktop/file_handler_express.js");

const app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

app.get("/", function(req, res) {
  res.send("Hello World!");
});





let MongoClient = require("mongodb").MongoClient;
const db_url = "mongodb://kniessner:bkv1805@ds251435.mlab.com:51435/complex";
var db;


MongoClient.connect(db_url, function(err, db) {
  if (err) return console.log(err);
  if (db) {
    return (
      console.log("Connected correctly to server"),
      (db = db),
      (global.db = db),
      filehandler(io, db),
      server.listen(5000, () => console.log('App running on port 5000 🔥'))
    );
  }
  db.close();
});