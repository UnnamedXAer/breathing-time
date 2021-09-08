import { ExerciseState } from '.';

export enum ExerciseMutations {
	Start = 'START_EXERCISE',
	Cancel = 'CANCEL_EXERCISE',
	SetRoundState = 'SET_ROUND_STATUS',
	AddHoldTime = 'ADD_HOLD_TIME',
	UpdateSettings = 'UPDATE_SETTINGS',
	RestoreDefault = 'RESTORE_DEFAULT'
}

export enum ExerciseActions {
	Cancel = 'CANCEL_EXERCISE',
	RestoreDefault = 'RESTORE_DEFAULT'
}

type ExerciseKeys = keyof ExerciseState;

export type ExerciseModuleMap<CKeys extends Readonly<string[]>> = {
	[key in CKeys[number]]: key extends ExerciseKeys ? () => ExerciseState[key] : never;
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
	| 'numberOfRounds'
	| 'breathsPerRound'
	| 'recoveryTime'
	| 'breathTime'
	| 'disableAnimation'
>;

export type ExerciseCustomizableProps = keyof ExerciseCustomizableState;

export type UpdateSettingsPayload = {
	propName: ExerciseCustomizableProps;
	value: ExerciseState[ExerciseCustomizableProps];
};
