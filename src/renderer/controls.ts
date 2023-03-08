import { quit, devtools } from "./ipc";
import { getIsWorkerRunning, getIsWorkerSaving } from "./worker";
import { showCloseWarning } from "./dialogs";
import { getIsDevMode } from "./ipc";

async function registerControls() {
  document.querySelector("#close").addEventListener("click", () => {
    if (!getIsWorkerRunning()) {
      quit();
    } else if (!getIsWorkerSaving()) {
      showCloseWarning();
    } else {
      // We're saving, and we're doing nothing. We're making the user wait.
    }
  });

  document.querySelector("#devtools").addEventListener("click", () => {
    devtools();
  });

  if (await getIsDevMode()) {
    document.querySelector("#devtools").classList.remove("hidden");
  }
}

registerControls();
