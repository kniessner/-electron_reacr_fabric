const data_upload = require("./data_upload.js");
const data_load = require("./data_load.js");

var XLSX = require("xlsx");

module.exports = function filehandler(ipcMain, db) {
  ipcMain.on("main", function(event, data) {
  data_load(event, db);
  });
  ipcMain.on("file_received", function(event, data, focusedWindow) {
    console.log("got file");
    if (data) {
      StartWatcher(data, focusedWindow, db);
      var workbook = XLSX.readFile(data);
      var sheet_name_list = workbook.SheetNames;
      var filedata = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
      event.sender.send("data", filedata);
      data_upload(sheet_name_list[0], filedata, db);
    } else {
      console.log("No path selected");
    }
  });
};

function onWatcherReady() {
  console.info(
    "From here can you check for real changes, the initial scan has been completed."
  );
}

function StartWatcher(path, focusedWindow, db) {
  var chokidar = require("chokidar");
  var watcher = chokidar.watch("file, dir, or glob", {
    ignored: /[\/\\]\./,
    persistent: true
  });

  watcher.add(path);
  // Declare the listeners of the watcher
  watcher.on("change", function(path) {
      console.log("File", path, "has been changed");
      var workbook = XLSX.readFile(path);
      var sheet_name_list = workbook.SheetNames;

      if (sheet_name_list > 0) {
        console.log(sheet_name_list);
      }
      var filedata = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      console.log("new data");
      if (focusedWindow) focusedWindow.webContents.send("data", filedata);
      table_upload(sheet_name_list[0], filedata, db);
    })
    .on("error", function(error) {
      console.log("Error happened", error);
    })
    .on("ready", onWatcherReady)
    .on("raw", function(event, path, details) {
      // This event should be triggered everytime something happens.
      console.log("onWatcherReady: Raw event info:", event, path, details);
    });
}
