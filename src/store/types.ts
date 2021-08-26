import { StoreState } from '.';

type StateProps = Readonly<Array<keyof StoreState>>;

export type ModuleStateProps<Key extends keyof StoreState> = Readonly<
	Array<keyof StoreState[Key]>
>;

///

type GetUnion<U, T> = T extends U ? T : never;

type ComputedKeys = GetUnion<
	ModuleStateProps<'exercise'>[number],
	'finished' | 'currentRoundState' | 'currentRound' | 'XD'
>;
