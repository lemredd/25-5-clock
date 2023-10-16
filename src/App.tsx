import { useReducer, useEffect } from "react";

import type { Action } from "./types.ts";

import { INITIAL_STATES } from "./constants";

import store from "./store.ts";

import Timer from "./components/Timer.tsx";
import TimerController from "./components/TimerController.tsx";

import "./App.css";

import alarm from "/alarm.wav";

function useTimerWatcher(timer_status: string, seconds: number, dispatch: React.Dispatch<Action>): void {
	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		let count_down: NodeJS.Timer;
		
		if (timer_status === "playing")
			count_down = setInterval(() => dispatch({ "type": "DECREMENT_SECONDS" }), 1000);

		return () => clearInterval(count_down);
	}, [timer_status]);

	useEffect(() => {
		if (seconds === 59) dispatch({ "type": "DECREMENT_RUNNING_MINUTES" });
	}, [seconds]);
	/* eslint-enable react-hooks/exhaustive-deps */
}

function App(): React.ReactElement {
	const [
		{
			break_minutes, session_minutes,
			running_minutes, seconds,
			timer_status, timer_playing
		},
		dispatch
	] = useReducer(store, INITIAL_STATES);
	useTimerWatcher(timer_status, seconds, dispatch);

	return (
		<>
			<TimerController
				type="break"
				minutes={break_minutes}
				on_change={dispatch}
			/>
			<TimerController
				type="session"
				minutes={session_minutes}
				on_change={dispatch}
			/>
			<Timer { ...{
				timer_playing,
				running_minutes,
				session_minutes,
				seconds
			} } />
			<div id="controls">
				<button
					id="start_stop"
					onClick={(): void => dispatch({ "type": timer_status === "paused" ? "PLAY" : "PAUSE" })}
				>
					{ timer_status === "playing" ? "stop" : "start" }
				</button>
				<button id="reset" onClick={(): void => dispatch({ "type": "RESET_ALL" })}>reset</button>
			</div>
			<audio id="beep" preload="auto" src={alarm} />
		</>
	);
}

export default App;
