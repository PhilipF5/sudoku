import React, { useState } from "react";
import "./App.css";
import NumberPicker from "./components/NumberPicker/NumberPicker";
import SudokuGrid from "./components/SudokuGrid/SudokuGrid";

const App = () => {
	const [grid, setGrid] = useState(Array.apply(null, Array(81)));
	const [selectedSquare, selectSquare] = useState(null);
	const setSquare = value => {
		const newGrid = [...grid];
		newGrid[selectedSquare] = value;
		setGrid(newGrid);
	};
	return (
		<div className="App">
			<SudokuGrid grid={grid} selectSquare={selectSquare} selectedSquare={selectedSquare} />
			<NumberPicker setSquare={setSquare} />
		</div>
	);
};

export default App;
