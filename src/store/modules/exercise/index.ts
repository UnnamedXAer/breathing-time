import { RootState } from '@/store';
import { RoundState } from '@/types/breath';
import { Module } from 'vuex';
import {
	ExerciseActions,
	ExerciseCustomizableProps,
	ExerciseCustomizableState,
	ExerciseMutations,
	UpdateSettingsPayload
} from './types';

const getDefaultExerciseStore = () => ({
	started: false,
	finished: false,
	disableAnimation: true,
	numberOfRounds: 3,
	breathsPerRound: 3,
	recoveryTime: 5,
	breathTime: 1.4 * 1000,
	currentRoundState: RoundState.Stopped,
	holdOutTime: 0,
	holdOutSeconds: 0,
	holdTimes: [] as number[]
});

export const customizableExerciseStateProps = [
	'numberOfRounds',
	'breathsPerRound',
	'recoveryTime',
	'breathTime',
	'disableAnimation'
] as ReadonlyArray<ExerciseCustomizableProps>;

customizableExerciseStateProps[0];

function clearExerciseState(state: ExerciseState) {
	state.started = false;
	state.finished = false;
	state.currentRoundState = RoundState.Stopped;
	state.holdOutTime = 0;
	state.holdOutSeconds = 0;
	state.holdTimes = [];
}

export const exerciseStore: Module<ExerciseState, RootState> = {
	namespaced: true,
	state: getDefaultExerciseStore,

	mutations: {
		[ExerciseMutations.Start]: (state) => {
			clearExerciseState(state);
			state.started = true;
			state.currentRoundState = RoundState.Breathing;
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

		[ExerciseMutations.UpdateSettings]: (
			state,
			{ propName, value }: UpdateSettingsPayload
		) => {
			(<K extends ExerciseCustomizableProps>(prop: K) => {
				state[prop] = value as ExerciseState[K];
			})(propName);
		},

		[ExerciseMutations.RestoreDefault]: (state) => {
			const defaultState = getDefaultExerciseStore();
			customizableExerciseStateProps.forEach(
				<K extends ExerciseCustomizableProps>(prop: K) => {
					state[prop] = defaultState[prop];
				}
			);
			return customizableExerciseStateProps;
		}
	},

	actions: {
		[ExerciseActions.Cancel]({ commit }) {
			commit(ExerciseMutations.Cancel);
		},

		[ExerciseActions.RestoreDefault]({ commit }) {
			localStorage.removeItem('exerciseSetup');
			commit(ExerciseMutations.RestoreDefault);
		}
	}
};

export type ExerciseState = ReturnType<typeof getDefaultExerciseStore>;
