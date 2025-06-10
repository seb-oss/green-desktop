const { app, BrowserWindow } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");

// Configure auto-updater
autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, "../assets/gds.png"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Check for updates
  autoUpdater.checkForUpdatesAndNotify();

  // Show loading screen
  mainWindow.loadFile("src/loading.html");

  // Load your web app
  setTimeout(() => {
    mainWindow.loadURL("https://seb.io");
  }, 1000);

  mainWindow.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);
