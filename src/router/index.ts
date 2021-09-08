import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeVue from '../views/Home.vue';
import BreathingExerciseVue from '../views/BreathingExercise.vue';
import BreathingExerciseSummaryVue from '../views/BreathingExerciseSummary.vue';
import ExerciseStartVue from '../components/BreathingExercise/Start.vue';
import BreathingVue from '../components/BreathingExercise/Breathing.vue';
import HoldingOutVue from '../components/BreathingExercise/HoldingOut.vue';
import HoldingInVue from '../components/BreathingExercise/HoldingIn.vue';
import SettingsVue from '../views/Settings.vue';
import store, { StoreState } from '@/store';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/breathing-exercise',
		name: 'BreathingExercise',
		component: BreathingExerciseVue,
		children: [
			{
				path: 'breathing',
				name: 'BreathingExercise-Breathing',
				component: BreathingVue,
				beforeEnter: beforeExercisePartialRouteEnter
			},
			{
				path: 'holding-out',
				name: 'BreathingExercise-HoldingOut',
				component: HoldingOutVue,
				beforeEnter: beforeExercisePartialRouteEnter
			},
			{
				path: 'holding-in',
				name: 'BreathingExercise-HoldingIn',
				component: HoldingInVue,
				beforeEnter: beforeExercisePartialRouteEnter
			},
			{
				path: 'summary',
				name: 'BreathingExercise-Summary',
				component: BreathingExerciseSummaryVue,
				props: (route) => ({
					fromHoldingIn: route.params.fromHoldingIn === '1'
				})
			},
			{
				path: '',
				name: 'BreathingExercise-Start',
				component: ExerciseStartVue
			}
		]
	},
	{
		path: '/settings',
		name: 'Settings',
		component: SettingsVue // convert to lazy-loaded
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

function beforeExercisePartialRouteEnter() {
	if (!(store.state as StoreState).exercise.started) {
		return {
			name: 'BreathingExercise-Start'
		};
	}
}

export default router;
