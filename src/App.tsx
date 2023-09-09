import { useState } from "react";

import "./App.css";

function App(): React.ReactElement {
	const [break_minutes, set_break_minutes] = useState(5);
	const [session_minutes, set_session_minutes] = useState(25);
	const [seconds, set_seconds] = useState(0);

	return (
		<>
			<div id="break-time">
				<div id="break-label">Break Time</div>
				<div id="break-length">{break_minutes}</div>
				<button id="break-decrement">v</button>
				<button id="break-increment">^</button>
			</div>
			<div id="session-time">
				<div id="session-label">Session Time</div>
				<div id="session-length">{session_minutes}</div>
				<button id="session-decrement">v</button>
				<button id="session-increment">^</button>
			</div>
		</>
	);
}

export default App;
