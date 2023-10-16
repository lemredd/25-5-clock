import { State } from "../types";

type Props = Pick<State, "timer_playing"|"running_minutes"|"session_minutes"|"seconds">

export default function Timer({
	timer_playing,
	running_minutes,
	session_minutes,
	seconds
}: Props): React.ReactElement {
	const format_to_two_digits =
		(number_to_format: number): number | string => number_to_format >= 10
			? number_to_format
			: `0${number_to_format}`;

	return (
		<div id="timer">
			<div id="timer-label">{timer_playing[0].toLocaleUpperCase() + timer_playing.substring(1)}</div>
			<div id="time-left">{format_to_two_digits(running_minutes ?? session_minutes)}:{format_to_two_digits(seconds)}</div>
		</div>
	);
}
