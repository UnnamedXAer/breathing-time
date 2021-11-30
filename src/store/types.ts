import { state } from "./defaultState";
import { ExerciseState } from "./modules/exercise/types";

export type RootState = typeof state;

export type StoreState = RootState & {
  exercise: ExerciseState;
};

export type ModuleStateProps<Key extends keyof StoreState> = Readonly<
  Array<keyof StoreState[Key]>
>;
