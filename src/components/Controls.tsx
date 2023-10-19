import { Action, State } from "../types";

interface Props {
	on_click: (action: Action) => void
	timer_status: State["timer_status"]
}

export default function Controls({ timer_status, on_click }: Props): React.ReactElement {
	const emit_status_change = (): void => on_click({
		"type": timer_status === "paused" ? "PLAY" : "PAUSE"
	});
	const emit_reset = (): void => on_click({
		"type": "RESET_ALL"
	});

	return (
		<>
			<button id="start_stop" onClick={emit_status_change}>
				{ timer_status === "playing" ? "stop" : "start" }
			</button>
			<button id="reset" onClick={emit_reset}>reset</button>
		</>
	);
}
