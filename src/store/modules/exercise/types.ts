import { StoreState } from '@/store';
import { ModuleStateProps } from '@/store/types';

export enum ExerciseStoreMutations {
	StartExercise = 'exercise/START EXERCISE'
}

export enum ExerciseStoreActions {}

export type TExerciseModuleMap = {
	[key in ModuleStateProps<'exercise'>[number]]: () => StoreState['exercise'][key];
};
