const {Menu} = require('electron')
const electron = require('electron')
const app = electron.app
const ipcMain = require('electron').ipcMain;
var XLSX = require('xlsx');
const {dialog} = require('electron');

function onWatcherReady(){
    console.info('From here can you check for real changes, the initial scan has been completed.');
}

function StartWatcher(path,focusedWindow){
    var chokidar = require("chokidar");
    var watcher = chokidar.watch('file, dir, or glob', {
          ignored: /[\/\\]\./, persistent: true
    });

      watcher.add(path);     
      // Declare the listeners of the watcher
      watcher.on('change', function(path) {
            console.log('File', path, 'has been changed');
            var workbook = XLSX.readFile(path);
            var sheet_name_list = workbook.SheetNames;
            var skills = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            if (focusedWindow) focusedWindow.webContents.send('data', skills)
      })
      .on('error', function(error) {
           console.log('Error happened', error);
      })
      .on('ready', onWatcherReady)
      .on('raw', function(event, path, details) {
           // This event should be triggered everytime something happens.
           console.log('Raw event info:', event, path, details);
      });
}
//var log = console.log.bind(console);


const template = [
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Load Table',
        click (item, focusedWindow) {
          dialog.showOpenDialog({properties: ['openFile']},
            function(path){
              if(path){
                  path = path[0];
                  StartWatcher(path,focusedWindow);
                  //StartWatcher(path[0]);
                  var workbook = XLSX.readFile(path);
                  var sheet_name_list = workbook.SheetNames;
                  var skills = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                  console.log(skills);
                  if (focusedWindow) focusedWindow.webContents.send('ping', 'ping ping ping!!!')
                  if (focusedWindow) focusedWindow.webContents.send('data', skills)

              }else {
                  console.log("No path selected");
              }
          });
        }
      },
      {
        label: 'Watch Folder',
        click (item, focusedWindow) {
          dialog.showOpenDialog({properties: [ 'openDirectory']},
            function(path){
              if(path){
                  // Start to watch the selected path
                  StartWatcher(path[0]);
              }else {
                  console.log("No path selected");
              }
          });
        }
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click (item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload()
        }
      },
      {
        label: 'Toggle Developer Tools',
        //accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click (item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools()
        }
      },
      {
        label: 'new file',
        click (item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools()
        }
      }
    ]
  },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('http://electron.atom.io') }
      }
    ]
  }
]


const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)