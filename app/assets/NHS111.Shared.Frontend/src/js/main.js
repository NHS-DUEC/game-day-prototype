import ErrorSummary from "nhsuk-frontend/packages/components/error-summary/error-summary";
import Details from "nhsuk-frontend/packages/components/details/details";
import CharacterCount from "../nhsuk-frontend/character-count/character-count";
import Button from "../nhsuk-frontend/button/button";

import autosize from "autosize";

import { initClickEvents } from "./modules/click-events";
import { initFeedback } from "./modules/feedback";
import initLoadingSpinners from "./modules/loading-spinner";
import { initInlineSpinners } from "./modules/inline-spinner";
import { initServiceAuditing } from "./service-auditing";
import initGoogleServiceMap from "./modules/google-service-map";
import { initInterstitialForm } from "./modules/interstitial-form";

document.addEventListener("DOMContentLoaded", () => {
  // Initialise nhsuk-frontend modules
  Button();
  CharacterCount();
  Details();
  ErrorSummary();

  // Initialise third party modules
  autosize(document.querySelectorAll("[data-autosize]"));

  // Initialise custom modules
  initClickEvents();
  initFeedback(ErrorSummary);
  initLoadingSpinners();
  initInlineSpinners();
  initServiceAuditing();
  initInterstitialForm();
  initGoogleServiceMap();
});
