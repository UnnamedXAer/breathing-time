import { RoundState } from '@/types/breath';

export const getProductionExerciseDefaultState = () => ({
	started: false,
	finished: false,
	disableAnimation: true,
	numberOfRounds: 3,
	breathsPerRound: 30,
	recoveryTime: 15,
	breathTime: 2 * 1000,
	currentRoundState: RoundState.Stopped,
	holdOutTime: 0,
	holdOutSeconds: 0,
	holdTimes: [] as number[]
});