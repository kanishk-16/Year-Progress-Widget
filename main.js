// === main.js ===
const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

let tray = null;
let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 300,
    height: 180,
    show: false,
    frame: false,
    skipTaskbar: true,
    resizable: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile('index.html');
  win.on('blur', () => win.hide());
}

app.whenReady().then(() => {
  createWindow();

  const iconPath = path.join(__dirname, 'assets', 'icon.ico');
  const icon = nativeImage.createFromPath(iconPath);
  tray = new Tray(icon.resize({ width: 16, height: 16 }));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show Year Progress',
      click: () => {
        const trayBounds= tray.getBounds();
        const windowBounds = win.getBounds();

        const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));
        const y = Math.round(trayBounds.y - windowBounds.height - 10);
        win.setPosition(x,y,false);
        win.show();
      },
    },
    { label: 'Quit', click: () => app.quit() },
  ]);

  tray.setToolTip('Year Progress Widget');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    const trayBounds= tray.getBounds();
    const windowBounds = win.getBounds();

    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));
    const y = Math.round(trayBounds.y - windowBounds.height - 10);
    win.setPosition(x,y,false);
    win.show();
  });
});
