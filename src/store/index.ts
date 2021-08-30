import { createStore } from 'vuex';
import { ExerciseState, exerciseStore } from './modules/exercise';
import { ExerciseMutations, ExerciseActions } from './modules/exercise/types';

const state = { error: null };

const store = createStore({
	state,
	modules: {
		exercise: exerciseStore
	},
	mutations: {},
	actions: {}
});

export default store;

export type RootState = typeof state;

export type StoreState = RootState & {
	exercise: ExerciseState;
};

export const namespaceName = (
	namespace: 'exercise',
	name: ExerciseMutations | ExerciseActions
) => namespace + '/' + name;
