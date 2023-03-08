import { ipcMain, app, BrowserWindow, dialog } from "electron";
import { setIsDevMode, getIsDevMode } from "./devmode";
import { getMainWindow } from "./windows";

function registerIpcHandlers() {
  ipcMain.handle("quit", () => app.quit());

  ipcMain.handle("devtools", () => {
    BrowserWindow.getAllWindows().forEach((w) =>
      w.webContents.toggleDevTools()
    );
  });

  ipcMain.handle("getIsDevMode", () => getIsDevMode());

  ipcMain.handle("setIsDevMode", (_event, set) => {
    setIsDevMode(set);
  });

  ipcMain.handle("showMessageBox", (_event, options) => {
    const mainWindow = getMainWindow();
    return dialog.showMessageBox(mainWindow, options);
  });

  ipcMain.handle("showMessageBoxSync", (_event, options) => {
    const mainWindow = getMainWindow();
    return dialog.showMessageBoxSync(mainWindow, options);
  });

  ipcMain.handle("getAppVersion", () => {
    return app.getVersion();
  });

  ipcMain.handle("getUserDataPath", () => {
    return app.getPath("userData");
  });
}

export default {
  registerIpcHandlers,
};
