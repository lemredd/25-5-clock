import { Action, State } from "../types";

interface Props {
	dispatch: React.Dispatch<Action>
	timer_status: State["timer_status"]
}

export default function Controls({ timer_status, dispatch }: Props): React.ReactElement {
	return (
		<div id="controls">
			<button
				id="start_stop"
				onClick={(): void => dispatch({ "type": timer_status === "paused" ? "PLAY" : "PAUSE" })}
			>
				{ timer_status === "playing" ? "stop" : "start" }
			</button>
			<button id="reset" onClick={(): void => dispatch({ "type": "RESET_ALL" })}>reset</button>
		</div>
	);
}
