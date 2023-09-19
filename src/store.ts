import type { State, Action } from "./types";

import { INITIAL_STATES } from "./constants";

export default function(state: State, action: Action): State {
	const MIN_THRESHOLD = 1;
	const MAX_THRESHOLD = 60;

	const do_nothing = (): State => state;

	function decrement_seconds(): State {
		const is_timer_done = state.running_minutes === 0 && state.seconds === 0;
		const is_playing_session = state.timer_playing === "session";
		const countdown_state = { ...state, "seconds": state.seconds === 0 ? 59 : state.seconds - 1 };
		const switch_timer_state = {
			...state,
			"seconds": 0,
			"timer_playing": is_playing_session ? "break" : "session",
			"running_minutes": is_playing_session ? state.break_minutes : state.session_minutes
		} satisfies State;

		if (is_timer_done) {
			const alarm_audio = document.getElementById("beep") as HTMLAudioElement;
			alarm_audio.currentTime = 0;
			alarm_audio.play().catch(console.error);
			return switch_timer_state;
		}
		return countdown_state;
	}

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
		case "PLAY": return {
			...state,
			"timer_status": "playing",
			"running_minutes": state.running_minutes ?? state[`${state.timer_playing}_minutes`]
		};
		case "PAUSE": return { ...state, "timer_status": "paused" };
		case "DECREMENT_RUNNING_MINUTES": return { ...state, "running_minutes": state.running_minutes! - 1 };
		case "DECREMENT_SECONDS": return decrement_seconds();
		case "RESET_ALL": {
			const alarm_audio = document.getElementById("beep") as HTMLAudioElement;
			alarm_audio.currentTime = 0;
			alarm_audio.pause();
			return INITIAL_STATES;
		}

		default: throw Error(`Unknown Action: ${String(action.type)}`);
	}
}
