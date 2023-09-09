import { useState } from "react";

import "./App.css";

function App() {

	return (
		<>
			<div id="break-time">
				<div id="break-label">Break Time</div>
				<button id="break-decrement">v</button>
				<button id="break-increment">^</button>
			</div>
			<div id="session-time">
				<div id="session-label">Session Time</div>
				<button id="session-decrement">v</button>
				<button id="session-increment">^</button>
			</div>
		</>
	);
}

export default App;
