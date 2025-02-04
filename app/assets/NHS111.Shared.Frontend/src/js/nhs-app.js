import { initInactivityTimeout } from "./modules/nhs-app/inactivity-timeout";
import { initBeforeUnloadPrompt } from "./modules/nhs-app/before-unload-prompt";
import { initBackAction } from "./modules/nhs-app/back-action";

document.addEventListener("DOMContentLoaded", () => {
  initInactivityTimeout();
  initBeforeUnloadPrompt();
  initBackAction();
});
