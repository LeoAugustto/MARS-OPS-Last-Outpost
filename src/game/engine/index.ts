// API pública do motor. A UI (React/Phaser) só importa daqui.
export * from "./types";
export {
  newMission,
  currentEvent,
  availableChoices,
  isChoiceAvailable,
  choose,
  endSol,
  emptyAllocation,
  rewindTo,
} from "./engine";
export { debrief, type Debrief } from "./debrief";
export * as BALANCE from "./balance";
export { t, eventKey } from "../../content/i18n";
