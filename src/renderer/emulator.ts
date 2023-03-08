import { drawScreen } from "./screen";
import { openAudio } from "./audio";
import { tryToSendInput } from "./input";
import { registerWorker, setCanvasBlank } from "./worker";
import { setupDialogs } from "./dialogs";

function asyncLoop() {
  drawScreen();
  tryToSendInput();
  requestAnimationFrame(asyncLoop);
}

async function start() {
  await registerWorker();
  setupDialogs();
  openAudio();
  asyncLoop();
}

start();
