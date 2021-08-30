import { StoreState } from '.';

type StateProps = Readonly<Array<keyof StoreState>>;

export type ModuleStateProps<Key extends keyof StoreState> = Readonly<
	Array<keyof StoreState[Key]>
>;
