const data_upload = require("./data_upload.js");
//const data_load = require("./data_load.js");

var XLSX = require("xlsx");

module.exports = function filehandler(io, db) {
  io.on("connection", function(socket) {
    socket.on("load_last_file", function() {
      data_load(db, socket);
    });

    socket.on("load_new_file", function(file) {
      console.log("got file");
      if (file) {
        data_upload(socket, file, db);
        StartWatcher(file, db, socket);
      } else {
        console.log("No path selected");
      }
    });
  });
};

function data_load(db, socket) {
  var collection = db.collection("tables");
  var cursor = collection
    .find()
    .limit(1)
    .sort({ $natural: -1 });
  cursor.toArray(function(err, data) {
    socket.emit("data", data[0].data);
  });
}

function onWatcherReady() {
  console.info(
    "From here can you check for real changes, the initial scan has been completed."
  );
}

function StartWatcher(file, db, socket) {
  var chokidar = require("chokidar");
  var watcher = chokidar.watch("file, dir, or glob", {
    ignored: /[\/\\]\./,
    persistent: true
  });

  watcher.add(file);
  // Declare the listeners of the watcher
  watcher
    .on("change", function(file) {
      console.log("File", file, "has been changed");
      data_upload(socket, file, db);
    })
    .on("error", function(error) {
      console.log("Error happened", error);
    })
    .on("ready", onWatcherReady)
    .on("raw", function(event, file, details) {
      // This event should be triggered everytime something happens.
      console.log("onWatcherReady:", event, file, details);
    });
}
