import { existsSync, writeFileSync, unlinkSync } from "fs";
import { join } from "path";
import { app } from "electron";

const appDataPath = app.getPath("userData");
const devFilePath = join(appDataPath, "developer");

let isDevMode;

function getIsDevMode() {
  if (isDevMode !== undefined) {
    return isDevMode;
  }

  return (isDevMode = !app.isPackaged || existsSync(devFilePath));
}

function setIsDevMode(set) {
  if (set && !getIsDevMode()) {
    writeFileSync(
      devFilePath,
      `So you're a developer, huh? Neat! Welcome aboard!`
    );
  } else if (!set && getIsDevMode()) {
    unlinkSync(devFilePath);
  }

  isDevMode = set;
}

export default {
  getIsDevMode,
  setIsDevMode,
};
