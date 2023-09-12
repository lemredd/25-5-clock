import { useState, useReducer } from "react";

import "./App.css";

interface Action {
	type: string
}

const INITIAL_STATES: Record<string, number> = {
	"break_minutes": 5,
	"session_minutes": 25
};

function store(state: Record<string, number>, action: Action): Record<string, number> {
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
		case "RESET_ALL": {
			return INITIAL_STATES;
		}

		default: {
			throw Error(`Unknown Action: ${action.type}`);
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
				<div id="break-length">{break_minutes}</div>
				<button id="break-decrement" onClick={(): void => mutate_minutes("break", "decrement")}>v</button>
				<button id="break-increment"onClick={(): void => mutate_minutes("break", "increment")}>^</button>
			</div>
			<div id="session-timer">
				<div id="session-label">Session Timer</div>
				<div id="session-length">{session_minutes}</div>
				<button id="session-decrement" onClick={(): void => mutate_minutes("session", "decrement")}>v</button>
				<button id="session-increment" onClick={(): void => mutate_minutes("session", "increment")}>^</button>
			</div>
			<div id="timer">
				<div id="timer-label">Session</div>
				<div id="time-left">{session_minutes}:{two_digit_seconds}</div>
			</div>
			<div id="controls">
				<button id="start_stop">start</button>
				<button id="reset" onClick={reset}>reset</button>
			</div>
		</>
	);
}

export default App;
