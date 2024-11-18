const { app, BrowserWindow, ipcMain } = require('electron');
let mainWindow;
let tabs = [];
let currentTabId = 0;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon:"./assets/1493169.png",
        darkTheme:true,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            webSecurity:true,
            webviewTag:true
        }
    });
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
ipcMain.on('new-tab', () => {
    createTab();
});
ipcMain.on('close-tab', (event, tabId) => {
    const tabIndex = tabs.findIndex(tab => tab.id === tabId);
    if (tabIndex !== -1) {
        tabs.splice(tabIndex, 1);
    }
});
function createTab() {
    const tabWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
        nodeIntegration: true
        }
    });
    tabWindow.loadFile('tab.html');
    tabWindow.on('closed', () => {
        const tabIndex = tabs.findIndex(tab => tab.window === tabWindow);
        if (tabIndex !== -1) {
        tabs.splice(tabIndex, 1);
        }
    });
    tabs.push({ id: currentTabId++, window: tabWindow });
}
