import { quit } from "./ipc";

function setupDialogs() {
  // Still empty
}

function showCloseWarning() {
  const warningDialog = document.querySelector("#warning");

  document.querySelector("#warning-quit").onclick = () => {
    quit();
  };

  document.querySelector("#warning-cancel").onclick = () => {
    warningDialog.classList.add("hidden");
  };

  warningDialog.classList.remove("hidden");
}

export default {
  setupDialogs,
  showCloseWarning,
};
