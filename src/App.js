import React from "react";
import "./App.css";
import SudokuGrid from "./components/SudokuGrid/SudokuGrid";
import { initialState, PuzzleContext } from "./context/PuzzleContext";

function App() {
	return (
		<div className="App">
			<PuzzleContext.Provider value={initialState}>
				<SudokuGrid />
			</PuzzleContext.Provider>
		</div>
	);
}

export default App;
