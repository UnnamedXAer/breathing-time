import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeVue from "../views/Home.vue";
import BreathingExerciseVue from "../views/BreathingExercise.vue";
import BreathingExerciseSummaryVue from "../views/BreathingExerciseSummary.vue";
import ExerciseStartVue from "../components/BreathingExercise/Start.vue";
import BreathingVue from "../components/BreathingExercise/Breathing.vue";
import BreathHoldVue from "../components/BreathingExercise/BreathHold.vue";
import RecoveryVue from "../components/BreathingExercise/Recovery.vue";
import PreferencesVue from "../views/Preferences.vue";
import store, { StoreState } from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/breathing-exercise",
    name: "BreathingExercise",
    component: BreathingExerciseVue,
    children: [
      {
        path: "breathing",
        name: "BreathingExercise-Breathing",
        component: BreathingVue,
        beforeEnter: beforeExercisePartialRouteEnter,
      },
      {
        path: "breath-hold",
        name: "BreathingExercise-BreathHold",
        component: BreathHoldVue,
        beforeEnter: beforeExercisePartialRouteEnter,
      },
      {
        path: "recovery",
        name: "BreathingExercise-Recovery",
        component: RecoveryVue,
        beforeEnter: beforeExercisePartialRouteEnter,
      },
      {
        path: "summary",
        name: "BreathingExercise-Summary",
        component: BreathingExerciseSummaryVue,
        props: (route) => ({
          fromRecovery: route.params.fromRecovery === "1",
        }),
      },
      {
        path: "",
        redirect: {
          name: "BreathingExercise-Start",
        },
      },
      {
        path: "start",
        name: "BreathingExercise-Start",
        component: ExerciseStartVue,
      },
    ],
  },
  {
    path: "/preferences",
    name: "BreathingExercisePreferences",
    component: PreferencesVue, // convert to lazy-loaded
  },
  {
    path: "/instructions",
    name: "BreathingExerciseInstructions",
    component: () => import("../views/BreathingExerciseInstructions.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: HomeVue,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: {
      name: "Home",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

function beforeExercisePartialRouteEnter() {
  if (!(store.state as StoreState).exercise.started) {
    return {
      name: "BreathingExercise-Start",
    };
  }
}

export default router;
