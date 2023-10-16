import type { State } from "./types";

export const ACTION_TYPES = [
	"INCREMENT_BREAK_MINUTES",
	"DECREMENT_BREAK_MINUTES",
	"INCREMENT_SESSION_MINUTES",
	"DECREMENT_SESSION_MINUTES",
	"PLAY",
	"PAUSE",
	"SWITCH_TIMER",
	"DECREMENT_RUNNING_MINUTES",
	"DECREMENT_SECONDS",
	"RESET_ALL"
] as const;

export const INITIAL_STATES = {
	"break_minutes": 5,
	"session_minutes": 25,
	"timer_status": "paused",
	"timer_playing": "session",
	"running_minutes": undefined,
	"seconds": 0
} satisfies State;
