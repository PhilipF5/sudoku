import React, { useState } from "react";
import "./App.css";
import SudokuGrid from "./components/SudokuGrid/SudokuGrid";
import { initialState, PuzzleContext } from "./context/PuzzleContext";

function App() {
	const [state, setState] = useState(initialState);
	const selectSquare = selectedSquare => setState({ ...state, selectedSquare });
	if (!state.selectSquare) {
		setState({ ...state, selectSquare });
	}
	return (
		<div className="App">
			<PuzzleContext.Provider value={state}>
				<SudokuGrid />
			</PuzzleContext.Provider>
		</div>
	);
}

export default App;
