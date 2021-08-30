import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeVue from '../views/Home.vue';
import BreathingExerciseVue from '../views/BreathingExercise.vue';
import BreathingExerciseSummaryVue from '../views/BreathingExerciseSummary.vue';
import ExerciseStartVue from '../components/BreathingExercise/Start.vue';
import BreathingVue from '../components/BreathingExercise/Breathing.vue';
import HoldingOutVue from '../components/BreathingExercise/HoldingOut.vue';
import HoldingInVue from '../components/BreathingExercise/HoldingIn.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/breathing-exercise',
		name: 'BreathingExercise',
		component: BreathingExerciseVue,
		children: [
			{
				path: 'breathing',
				name: 'BreathingExercise-Breathing',
				component: BreathingVue
			},
			{
				path: 'holding-out',
				name: 'BreathingExercise-HoldingOut',
				component: HoldingOutVue
			},
			{
				path: 'holding-in',
				name: 'BreathingExercise-HoldingIn',
				component: HoldingInVue
			},
			{
				path: 'summary',
				name: 'BreathingExercise-Summary',
				component: BreathingExerciseSummaryVue
			},
			{
				path: '',
				name: 'BreathingExercise-Start',
				component: ExerciseStartVue
			}
		]
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/',
		name: 'Home',
		component: HomeVue
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
