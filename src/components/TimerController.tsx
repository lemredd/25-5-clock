import type { Action } from "../types.ts";

interface TimerControllerProps {
	type: "break" | "session"
	minutes: number
	on_change: (action: Action) => void
}
export default function TimerController({ type, minutes, on_change }: TimerControllerProps): React.ReactElement {
	const DECREMENT_DISPATCH_ACTION_TYPE = `DECREMENT_${type.toLocaleUpperCase()}_MINUTES` as Action["type"];
	const INCREMENT_DISPATCH_ACTION_TYPE = `INCREMENT_${type.toLocaleUpperCase()}_MINUTES` as Action["type"];

	const emit_decrement = (): void => on_change({ "type": DECREMENT_DISPATCH_ACTION_TYPE });
	const emit_increment = (): void => on_change({ "type": INCREMENT_DISPATCH_ACTION_TYPE });

	return (
		<div id={`${type}-timer`}>
			<div id={`${type}-label`}>{type[0].toLocaleUpperCase() + type.substring(1)} Timer</div>
			<div id={`${type}-length`}>{minutes}</div>
			<button id={`${type}-decrement`} onClick={emit_decrement}>v</button>
			<button id={`${type}-increment`} onClick={emit_increment}>^</button>
		</div>
	);
}
