const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const flashLoader = require('flash-player-loader');

const path = require('path');
const url = require('url');

let mainWindow;

let chromeFlashes = flashLoader.getAllChromeFlashVersions();

chromeFlashes.forEach((cf) => flashLoader.addSource(cf[1]));
flashLoader.load();

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      plugins: true,
    },
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
