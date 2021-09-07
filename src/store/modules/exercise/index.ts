import { RootState } from '@/store';
import { RoundState } from '@/types/breath';
import { Module } from 'vuex';
import { ExerciseActions, ExerciseMutations } from './types';

const getDefaultExerciseStore = () => ({
	started: false,
	finished: false,
	maxRounds: 3,
	breathsPerRound: 3,
	holdInTime: 5,
	breathTime: 1.4 * 1000,
	currentRoundState: RoundState.Stopped,
	holdOutTime: 0,
	holdOutSeconds: 0,
	holdTimes: [] as number[]
});

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
		}
	},

	actions: {
		[ExerciseActions.Cancel]({ commit }) {
			commit(ExerciseMutations.Cancel);
		}
	}
};

export type ExerciseState = ReturnType<typeof getDefaultExerciseStore>;
