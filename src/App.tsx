import { useState, useReducer } from "react";

import "./App.css";

const ACTION_TYPES = [
	"INCREMENT_BREAK_MINUTES",
	"DECREMENT_BREAK_MINUTES",
	"INCREMENT_SESSION_MINUTES",
	"DECREMENT_SESSION_MINUTES",
	"PLAY",
	"PAUSE",
	"SWITCH_TIMER",
	"RESET_ALL"
] as const;

interface Action {
	type: typeof ACTION_TYPES[number]
}

interface State {
	break_minutes: number
	session_minutes: number
	timer_status: "paused" | "playing"
	timer_playing: "break" | "session"
}

const INITIAL_STATES: State = {
	"break_minutes": 5,
	"session_minutes": 25,
	"timer_status": "paused",
	"timer_playing": "session"
};

function store(state: State, action: Action): State {
	const MIN_THRESHOLD = 1;
	const MAX_THRESHOLD = 60;

	const do_nothing = (): typeof state => state;

	switch(action.type) {
		case "INCREMENT_BREAK_MINUTES": {
			if (state.break_minutes >= MAX_THRESHOLD) return do_nothing();
			return { ...state, "break_minutes": state.break_minutes + 1 };
		}
		case "DECREMENT_BREAK_MINUTES": {
			if (state.break_minutes === MIN_THRESHOLD) return do_nothing();
			return { ...state, "break_minutes": state.break_minutes - 1 };
		}
		case "INCREMENT_SESSION_MINUTES": {
			if (state.session_minutes >= MAX_THRESHOLD) return do_nothing();
			return { ...state, "session_minutes": state.session_minutes + 1 };
		}
		case "DECREMENT_SESSION_MINUTES": {
			if (state.session_minutes === MIN_THRESHOLD) return do_nothing();
			return { ...state, "session_minutes": state.session_minutes - 1 };
		}
		case "PLAY": return { ...state, "timer_status": "playing" };
		case "PAUSE": return { ...state, "timer_status": "paused" };
		case "SWITCH_TIMER": return { ...state, "timer_playing": state.timer_playing === "session" ? "break" : "session" };
		case "RESET_ALL": {
			return INITIAL_STATES;
		}

		default: {
			throw Error(`Unknown Action: ${String(action.type)}`);
		}
	}
}

function App(): React.ReactElement {
	const [state, dispatch] = useReducer(store, INITIAL_STATES);
	const [seconds, set_seconds] = useState(0);
	const two_digit_seconds = seconds >= 10 ? seconds : `0${seconds}`;

	return (
		<>
			<div id="break-timer">
				<div id="break-label">Break Timer</div>
				<div id="break-length">{state.break_minutes}</div>
				<button id="break-decrement" onClick={(): void => dispatch({ "type": "DECREMENT_BREAK_MINUTES" })}>v</button>
				<button id="break-increment"onClick={(): void => dispatch({ "type": "INCREMENT_BREAK_MINUTES" })}>^</button>
			</div>
			<div id="session-timer">
				<div id="session-label">Session Timer</div>
				<div id="session-length">{state.session_minutes}</div>
				<button id="session-decrement" onClick={(): void => dispatch({ "type": "DECREMENT_SESSION_MINUTES" })}>v</button>
				<button id="session-increment" onClick={(): void => dispatch({ "type": "INCREMENT_SESSION_MINUTES" })}>^</button>
			</div>
			<div id="timer">
				<div id="timer-label">Session</div>
				<div id="time-left">{state.session_minutes}:{two_digit_seconds}</div>
			</div>
			<div id="controls">
				<button
					id="start_stop"
					onClick={(): void => dispatch({ "type": state.timer_status === "paused" ? "PLAY" : "PAUSE" })}
				>
					{ state.timer_status === "playing" ? "stop" : "start" }
				</button>
				<button id="reset" onClick={(): void => dispatch({ "type": "RESET_ALL" })}>reset</button>
			</div>
		</>
	);
}

export default App;
