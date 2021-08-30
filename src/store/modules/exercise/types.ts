import { StoreState } from '@/store';
import { ModuleStateProps } from '@/store/types';

export enum ExerciseStoreMutations {
	StartExercise = 'exercise/START EXERCISE'
}

export enum ExerciseStoreActions {}

type ExerciseKeys = keyof StoreState['exercise'];

export type ExerciseModuleMap<CKeys extends Readonly<string[]>> = {
	[key in CKeys[number]]: key extends ExerciseKeys
		? () => StoreState['exercise'][key]
		: never;
};
