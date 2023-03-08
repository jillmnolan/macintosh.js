import { shell, ipcRenderer } from "electron";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";
const homedir = require("os").homedir();
const macDir = join(homedir, "macintosh.js");

let isDevTools;

// Setup dev mode
function fetchIsDevTools() {
  ipcRenderer.invoke("getIsDevMode").then((result) => {
    isDevTools = result;

    if (result) {
      isDevTools.innerHTML = "Disable developer tools";
    } else {
      isDevTools.innerHTML = "Enable developer tools";
    }
  });
}

async function help() {
  user_dir.onclick = user_dir2.onclick = () => {
    try {
      if (!existsSync(macDir)) {
        mkdirSync(macDir);
      }

      shell.showItemInFolder(macDir);
    } catch (error) {
      ipcRenderer.invoke("showMessageBox", {
        type: "error",
        title: "Could not open folder",
        message: `We tried to open the macintosh.js directory, but failed. The error was: ${error}`,
      });
    }
  };

  isDevTools.onclick = async () => {
    await ipcRenderer.invoke("setIsDevMode", !isDevTools);
    fetchIsDevTools();
  };

  fetchIsDevTools();
}

help();
