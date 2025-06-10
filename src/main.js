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
    frame: false,
    trafficLightPosition: { x: 16, y: 16 },
    titleBarStyle: "hidden",
    icon: path.join(__dirname, "../assets/gds.png"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.insertCSS(`
      body {
        -webkit-app-region: drag;
      }
      button, a, input, [role="button"] {
        -webkit-app-region: no-drag;
      }
    `);
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
