const electron = require("electron");
const app = electron.app;
const path = require("path");
const url = require("url");
const fs = require("fs");

const handleSquirrelEvent = require("./desktop/handleSquirrelEvent.js");
if (handleSquirrelEvent(app)) {
  return;
}

const { ipcMain } = require("electron");
const { dialog } = require("electron");

const server = require("./app");

let mainWindow;
const createWindow = require("./desktop/window.js");
const filehandler = require("./desktop/file_handler.js");

let MongoClient = require("mongodb").MongoClient;
const db_url = "mongodb://kniessner:bkv1805@ds251435.mlab.com:51435/complex";
var db;
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", init);
function init() {
  /* MongoClient.connect(db_url, function(err, db) {
    if (err) return console.log(err);
    if (db) {
      return (
        console.log("Connected correctly to server"),
        (db = db),
        (global.db = db),
        filehandler(ipcMain, db),
        
      );
    }<w
    db.close();
  }); */
  createWindow(electron, mainWindow)
}

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
  db.close();
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("notes", function(event, data) {
  console.log(data); // this properly shows the data
  event.sender.send("notes", "hello");
});
