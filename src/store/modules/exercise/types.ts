import { RoundState } from "@/types/breath";

export type ExerciseState = {
  started: boolean;
  disableAnimation: boolean;
  numberOfRounds: number;
  breathsPerRound: number;
  recoveryTime: number;
  breathTime: number;
  currentRoundState: RoundState;
  holdTimes: number[];
};

export enum ExerciseMutations {
  Start = "START_EXERCISE",
  Finish = "FINISH_EXERCISE",
  Cancel = "CANCEL_EXERCISE",
  SetRoundState = "SET_ROUND_STATUS",
  AddHoldTime = "ADD_HOLD_TIME",
  UpdatePreferences = "UPDATE_PREFERENCES",
  RestoreDefault = "RESTORE_DEFAULT",
  SetPartialState = "SET_PARTIAL_STATE",
}

export enum ExerciseActions {
  Cancel = "CANCEL_EXERCISE",
  ReadCachedPreferences = "READ_CACHED_PREFERENCES",
  UpdatePreferences = "UPDATE_PREFERENCES",
  RestoreDefault = "RESTORE_DEFAULT",
}

type ExerciseKeys = keyof ExerciseState;

export type ExerciseModuleMap<CKeys extends Readonly<string[]>> = {
  [key in CKeys[number]]: key extends ExerciseKeys
    ? () => ExerciseState[key]
    : never;
};

// export type ExerciseCustomizablePropsTuple = [
// 	'numberOfRounds',
// 	'breathsPerRound',
// 	'recoveryTime',
// 	'breathTime',
// 	'disableAnimation'
// ];

export type ExerciseCustomizableState = Pick<
  ExerciseState,
  | "numberOfRounds"
  | "breathsPerRound"
  | "recoveryTime"
  | "breathTime"
  | "disableAnimation"
>;

export type ExerciseCustomizableProps = keyof ExerciseCustomizableState;

export type UpdatePreferencesPayload = {
  propName: ExerciseCustomizableProps;
  value: ExerciseState[ExerciseCustomizableProps];
};
