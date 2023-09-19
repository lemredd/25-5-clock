import { ACTION_TYPES } from "./constants";

export interface Action {
	type: typeof ACTION_TYPES[number]
}

export interface State extends Record<string, any> {
	break_minutes: number
	session_minutes: number
	timer_status: "paused" | "playing"
	timer_playing: "break" | "session"
	running_minutes: number | undefined
	seconds: number
}

