import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeVue from '../views/Home.vue';
import BreathingExerciseVue from '../views/BreathingExercise.vue';
import BreathingExerciseSummaryVue from '../views/BreathingExerciseSummary.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: HomeVue
	},
	{
		path: '/breathing-exercise',
		name: 'BreathingExercise',
		component: BreathingExerciseVue
	},
	{
		path: '/breathing-exercise-summary',
		name: 'BreathingExerciseSummary',
		component: BreathingExerciseSummaryVue
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
