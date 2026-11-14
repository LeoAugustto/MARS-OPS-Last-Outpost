// API pública do motor. A UI só importa daqui.
export * from "./types";
export {
  newMission,
  openAlert,
  choose,
  choicesFor,
  choiceEffect,
  isChoiceAvailable,
  energiaFaltando,
  getAlert,
  setAllocation,
  plannedAllocation,
  allocationTotal,
  canSleep,
  endSol,
  rewindTo,
  findEvent,
  defaultAllocation,
  alertCount,
  ORDEM_CORTE,
} from "./engine";
export { debrief, type Debrief } from "./debrief";
export * as BALANCE from "./balance";
export { t, eventKey } from "../../content/i18n";
