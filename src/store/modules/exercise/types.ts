import { StoreState } from '@/store';

export enum ExerciseMutations {
	Start = 'START_EXERCISE',
	Cancel = 'CANCEL_EXERCISE',
	SetRoundState = 'SET_ROUND_STATUS',
	AddHoldTime = 'ADD_HOLD_TIME'
}

export enum ExerciseActions {
	Cancel = 'CANCEL_EXERCISE'
}

type ExerciseKeys = keyof StoreState['exercise'];

export type ExerciseModuleMap<CKeys extends Readonly<string[]>> = {
	[key in CKeys[number]]: key extends ExerciseKeys
		? () => StoreState['exercise'][key]
		: never;
};
