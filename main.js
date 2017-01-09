const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const flashLoader = require('flash-player-loader');
const menubar = require('menubar');

const path = require('path');
const url = require('url');

let mainWindow;

let chromeFlashes = flashLoader.getAllChromeFlashVersions();

chromeFlashes.forEach((cf) => flashLoader.addSource(cf[1]));
flashLoader.load();

let mb = menubar({
  preloadWindow: true,
  width: 800,
  height: 600,
  webPreferences: {
    plugins: true,
  },
});

mb.on('ready', () => {
  console.log('ready!');
});
