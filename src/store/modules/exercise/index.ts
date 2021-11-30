import { RootState } from "../../types";
import { RoundState } from "../../../types/breath";
import { Module } from "vuex";
import { getProductionExerciseDefaultState } from "./defaultState";
import {
  ExerciseActions,
  ExerciseCustomizableProps,
  ExerciseCustomizableState,
  ExerciseMutations,
  ExerciseState,
  UpdatePreferencesPayload,
} from "./types";

const getDefaultState =
  process.env.NODE_ENV === "production"
    ? getProductionExerciseDefaultState
    : (): ExerciseState => ({
        started: false,
        disableAnimation: true,
        disableStartTips: false,
        numberOfRounds: 3,
        breathsPerRound: 3,
        recoveryTime: 5,
        breathTime: 1.4 * 1000,
        currentRoundState: RoundState.Stopped,
        holdTimes: [] as number[],
      });

export const customizableExerciseStateProps = [
  "numberOfRounds",
  "breathsPerRound",
  "recoveryTime",
  "breathTime",
  "disableAnimation",
  "disableStartTips",
] as ReadonlyArray<ExerciseCustomizableProps>;

customizableExerciseStateProps[0];

function clearExerciseState(state: ExerciseState) {
  state.started = false;
  state.currentRoundState = RoundState.Stopped;
  state.holdTimes = [];
}

export const exerciseStore: Module<ExerciseState, RootState> = {
  namespaced: true,
  state: getDefaultState,

  mutations: {
    [ExerciseMutations.Start]: (state) => {
      clearExerciseState(state);
      state.started = true;
      state.currentRoundState = RoundState.Breathing;
    },
    [ExerciseMutations.Finish]: (state) => {
      state.started = false;
      state.currentRoundState = RoundState.Stopped;
    },
    [ExerciseMutations.Cancel]: (state) => {
      clearExerciseState(state);
    },
    [ExerciseMutations.SetRoundState]: (state, roundState: RoundState) => {
      state.currentRoundState = roundState;
    },
    [ExerciseMutations.AddHoldTime]: (state, time) => {
      state.holdTimes.push(time);
    },

    [ExerciseMutations.UpdatePreferences]: (
      state,
      { propName, value }: UpdatePreferencesPayload
    ) => {
      (<K extends ExerciseCustomizableProps>(prop: K) => {
        state[prop] = value as ExerciseState[K];
      })(propName);
    },

    [ExerciseMutations.RestoreDefault]: (state) => {
      const defaultState = getDefaultState();
      customizableExerciseStateProps.forEach(
        <K extends ExerciseCustomizableProps>(prop: K) => {
          state[prop] = defaultState[prop];
        }
      );
      return customizableExerciseStateProps;
    },

    [ExerciseMutations.SetPartialState]: (
      state,
      partialState: Partial<ExerciseState>
    ) => {
      for (const prop in partialState) {
        if (Object.prototype.hasOwnProperty.call(state, prop)) {
          (<K extends keyof ExerciseState>(prop: K) => {
            state[prop] = partialState[prop] as ExerciseState[K];
          })(prop as keyof ExerciseState);
        }
      }
    },
  },

  actions: {
    [ExerciseActions.Cancel]: ({ commit }) => {
      commit(ExerciseMutations.Cancel);
    },

    [ExerciseActions.ReadCachedPreferences]: ({ commit }) => {
      const cached = localStorage.getItem("exerciseSetup");
      if (cached === null) {
        return;
      }

      const customizableState = JSON.parse(cached) as ExerciseCustomizableState;
      commit(ExerciseMutations.SetPartialState, customizableState);
    },

    [ExerciseActions.UpdatePreferences]: (
      { commit, state },
      payload: UpdatePreferencesPayload
    ) => {
      commit(ExerciseMutations.UpdatePreferences, payload);

      const customizableState = {} as ExerciseCustomizableState;
      customizableExerciseStateProps.forEach(
        <K extends ExerciseCustomizableProps>(prop: K) => {
          customizableState[prop] = state[prop];
        }
      );

      localStorage.setItem("exerciseSetup", JSON.stringify(customizableState));
    },

    [ExerciseActions.RestoreDefault]: ({ commit }) => {
      localStorage.removeItem("exerciseSetup");
      commit(ExerciseMutations.RestoreDefault);
    },
  },
};
