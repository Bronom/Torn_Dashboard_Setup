import { createUI } from "./ui.js";
import { initFirmware } from "./firmware.js";
import { createSerialController } from "./serial.js";

const ui = createUI();
const serial = createSerialController(ui);

ui.elements.togglePassBtn.addEventListener("click", () => {
  const isPassword = ui.elements.passInput.type === "password";
  ui.elements.passInput.type = isPassword ? "text" : "password";
  ui.elements.togglePassBtn.textContent = isPassword ? "Hide" : "Show";
});

ui.elements.clearLogBtn.addEventListener("click", () => {
  ui.clearLog();
});

ui.elements.connectBtn.addEventListener("click", serial.connect);
ui.elements.sendBtn.addEventListener("click", serial.send);

initFirmware(ui);
ui.setReady("idle");
ui.setConnected(false);