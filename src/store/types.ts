import { StoreState } from ".";

export type ModuleStateProps<Key extends keyof StoreState> = Readonly<
  Array<keyof StoreState[Key]>
>;
