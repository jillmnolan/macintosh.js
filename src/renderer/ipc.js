import { ipcRenderer } from "electron";

export function quit() {
  ipcRenderer.invoke("quit");
}
export function devtools() {
  ipcRenderer.invoke("devtools");
}
export function getIsDevMode() {
  return ipcRenderer.invoke("getIsDevMode");
}
export function setIsDevMode() {
  return ipcRenderer.invoke("setIsDevMode");
}
export function getAppVersion() {
  return ipcRenderer.invoke("getAppVersion");
}
export function getUserDataPath() {
  return ipcRenderer.invoke("getUserDataPath");
}
