import { RootState } from '@/store';
import { RoundState } from '@/types/breath';
import { Module } from 'vuex';
import { ExerciseActions, ExerciseMutations } from './types';

const getDefaultExerciseStore = () => ({
	started: false,
	finished: false,
	rounds: 3,
	breathsPerRound: 7,
	holdInTime: 7,
	breathTime: 1.4 * 1000,
	holdInSecondsLeft: 7,
	currentRoundState: RoundState.Stopped,
	currentRound: 0,
	holdOutTime: 0,
	holdOutSeconds: 0,
	holdTimes: [] as number[]
});

function clearExerciseState(state: ExerciseState) {
	state.started = false;
	state.finished = false;
	state.currentRoundState = RoundState.Stopped;
	state.currentRound = 0;
	state.holdOutTime = 0;
	state.holdOutSeconds = 0;
	state.holdInSecondsLeft = 0;
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
