import { shell, ipcRenderer } from "electron";
import { join } from "path";

import { getAppVersion } from "./ipc";

async function credits() {
  license.onclick = () => {
    const licensePath = join(__dirname, "../basilisk/LICENSE.txt");
    shell.openPath(licensePath);
  };

  const version = await getAppVersion();
  document.querySelector(
    "#versions"
  ).innerHTML = `macintosh.js v${version} with Electron v${process.versions.electron}`;
}

credits();
