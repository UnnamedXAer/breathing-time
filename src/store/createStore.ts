import { createStore as createStoreBase, Store } from "vuex";
import { state } from "./defaultState";
import { exerciseStore } from "./modules/exercise";
import { ExerciseMutations, ExerciseActions } from "./modules/exercise/types";
import { RootState } from "./types";

export const createStoreFactory = (): Store<RootState> => {
  return createStoreBase({
    state,
    modules: {
      exercise: exerciseStore,
    },
    mutations: {},
    actions: {},
  });
};

export const namespaceName = (
  namespace: "exercise",
  name: ExerciseMutations | ExerciseActions
): string => namespace + "/" + name;
