const path = require("path");
const url = require("url");

// Keep a reference for dev mode
module.exports = function createWindow(electron) {
  const BrowserWindow = electron.BrowserWindow;
  require("./menu.js");
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 1100
  });
  mainWindow.loadURL("http://localhost:5000/");
  mainWindow.webContents.openDevTools();
  let indexPath;
  /*
  if (process.env.NODE_ENV !== "development") {
    console.log("Production mode!");
    indexPath = url.format({
      protocol: "file:",
      //host: "localhost:9000",
      pathname: path.join(__dirname, "../dist/index.html"),
      slashes: true
    });
  } else {
    mainWindow.webContents.openDevTools();
    console.log("Development mode!");
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:9000",
      pathname: "index.html",
      slashes: true
    });
  }
    process.env.ELECTRON_START_URL || indexPath;
  mainWindow.loadURL(indexPath);*/

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("ping", "whoooooooh!");
  });
  mainWindow.on("closed", function() {
    mainWindow = null;
    db.close();
  });
};
