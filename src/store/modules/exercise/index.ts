import { RootState } from '@/store';
import { RoundState } from '@/types/breath';
import { Module } from 'vuex';
import { ExerciseStoreMutations } from './types';

const getDefaultExerciseStore = () => ({
	started: false,
	finished: false,
	rounds: 3,
	breathsPerRound: 3,
	holdInTime: 7,
	currentRound: 0,
	currentRoundState: RoundState.Stopped,
	breathsCount: 0,
	breathTime: 1.4 * 1000,
	holdOutTime: 0,
	holdOutSeconds: 0,
	holdInSecondsLeft: 7,
	holdTimes: [] as number[]
});

const unnamespacedName = (name: string) => name.split('/')[1];

export const exerciseStore: Module<ExerciseState, RootState> = {
	namespaced: true,
	state: getDefaultExerciseStore,
	mutations: {
		[unnamespacedName(ExerciseStoreMutations.StartExercise)]: (state) => {
			state.started = true;
			state.finished = false;
			state.currentRound = 0;
			state.currentRoundState = RoundState.Breathing;
			state.breathsCount = 0;
			state.holdOutTime = 0;
			state.holdOutSeconds = 0;
			state.holdInSecondsLeft = 0;
			state.holdTimes = [];
		}
	}
};

export type ExerciseState = ReturnType<typeof getDefaultExerciseStore>;
