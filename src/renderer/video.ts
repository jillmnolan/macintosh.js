import { releaseTwoStateLock } from "./atomics";

const VIDEO_MODE_BUFFER_SIZE = 10;
const videoModeBuffer = new SharedArrayBuffer(VIDEO_MODE_BUFFER_SIZE * 4);
const videoModeBufferView = new Int32Array(videoModeBuffer);

releaseTwoStateLock(videoModeBufferView, 9);

export default {
  VIDEO_MODE_BUFFER_SIZE,
  videoModeBuffer,
  videoModeBufferView,
};
