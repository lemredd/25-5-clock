import { useReducer, useEffect } from "react";

import type { Action } from "./types.ts";

import { INITIAL_STATES } from "./constants";

import store from "./store.ts";

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

interface TimerControllerProps {
	type: "break" | "session"
	minutes: number
	on_decrement: (type: Action["type"]) => void
	on_increment: (type: Action["type"]) => void
}
function TimerController({ type, minutes, on_decrement, on_increment }: TimerControllerProps): React.ReactElement {
	const DECREMENT_DISPATCH_ACTION_TYPE = `DECREMENT_${type.toLocaleUpperCase()}_MINUTES` as Action["type"];
	const INCREMENT_DISPATCH_ACTION_TYPE = `INCREMENT_${type.toLocaleUpperCase()}_MINUTES` as Action["type"];
	return (
		<div id={`${type}-timer`}>
			<div id={`${type}-label`}>Break Timer</div>
			<div id={`${type}-length`}>{minutes}</div>
			<button id={`${type}-decrement`} onClick={(): void => on_decrement(DECREMENT_DISPATCH_ACTION_TYPE)}>v</button>
			<button id={`${type}-increment`} onClick={(): void => on_increment(INCREMENT_DISPATCH_ACTION_TYPE)}>^</button>
		</div>
	);
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

	const format_to_two_digits =
		(number_to_format: number): number | string => number_to_format >= 10
			? number_to_format
			: `0${number_to_format}`;

	return (
		<>
			<TimerController
				type="break"
				minutes={break_minutes}
				on_decrement={(type): void => dispatch({ type })}
				on_increment={(type): void => dispatch({ type })}
			/>
			<div id="session-timer">
				<div id="session-label">Session Timer</div>
				<div id="session-length">{session_minutes}</div>
				<button id="session-decrement" onClick={(): void => dispatch({ "type": "DECREMENT_SESSION_MINUTES" })}>v</button>
				<button id="session-increment" onClick={(): void => dispatch({ "type": "INCREMENT_SESSION_MINUTES" })}>^</button>
			</div>
			<div id="timer">
				<div id="timer-label">{timer_playing[0].toLocaleUpperCase() + timer_playing.substring(1)}</div>
				<div id="time-left">{format_to_two_digits(running_minutes ?? session_minutes)}:{format_to_two_digits(seconds)}</div>
			</div>
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
