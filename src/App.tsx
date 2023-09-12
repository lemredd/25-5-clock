import { useState, useReducer } from "react";

import "./App.css";

	const [state, dispatch] = useReducer(store, INITIAL_STATES);
	const [break_minutes, set_break_minutes] = useState(5);
	const [session_minutes, set_session_minutes] = useState(25);
	const [seconds, set_seconds] = useState(0);
	const two_digit_seconds = seconds >= 10 ? seconds : `0${seconds}`;
interface Action {
	type: string
}

	function reset(): void {
		set_break_minutes(5);
		set_session_minutes(25);
		set_seconds(0);
	}
const INITIAL_STATES: Record<string, number> = {
	"break_minutes": 5,
	"session_minutes": 25
};


	function mutate_minutes(
		state: "break" | "session",
		action: "decrement" | "increment"
	): void {
		const MIN_THRESHOLD = 1;
		const MAX_THRESHOLD = 60;
		switch (state) {
			case "break": {
				if (break_minutes === MIN_THRESHOLD && action === "decrement") return;
				if (break_minutes >= MAX_THRESHOLD && action === "increment") return;
				set_break_minutes(action === "decrement" ? (break_minutes - 1) : (break_minutes + 1));
				break;
			}
			case "session": {
				if (session_minutes === MIN_THRESHOLD && action === "decrement") return;
				if (session_minutes >= MAX_THRESHOLD && action === "increment") return;
				set_session_minutes(action === "decrement" ? (session_minutes - 1) : (session_minutes + 1));
				break;
			}
		}
	}

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
