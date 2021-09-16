import { RoundState } from "@/types/breath";
import { ExerciseState } from "./types";

export const getProductionExerciseDefaultState = (): ExerciseState => ({
  started: false,
  disableAnimation: false,
  disableStartTips: false,
  numberOfRounds: 3,
  breathsPerRound: 30,
  recoveryTime: 15,
  breathTime: 2 * 1000,
  currentRoundState: RoundState.Stopped,
  holdTimes: [] as number[],
});
