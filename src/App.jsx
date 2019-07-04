import { SudokuSolver } from "@jlguenego/sudoku-generator";
import React, { useEffect, useState } from "react";
import "./App.css";
import NumberPicker from "./components/NumberPicker/NumberPicker";
import SudokuGrid from "./components/SudokuGrid/SudokuGrid";

const difficulty = {
	easy: 47,
	medium: 51,
	hard: 55,
};

const App = () => {
	const [grid, setGrid] = useState(Array.apply(null, Array(81)));
	const [solution, setSolution] = useState(Array.apply(null, Array(81)));
	const [selectedSquare, selectSquare] = useState(null);
	const setSquare = value => {
		const newGrid = [...grid];
		newGrid[selectedSquare] = value;
		setGrid(newGrid);
	};

	useEffect(() => {
		const { completed, start } = newPuzzle();
		setGrid(start);
		setSolution(completed);
	}, []);

	return (
		<div className="App">
			<SudokuGrid {...{ grid, selectSquare, selectedSquare }} />
			<NumberPicker {...{ setSquare }} />
		</div>
	);
};

const newPuzzle = (level = "easy") => {
	const completed = SudokuSolver.generate();
	return {
		completed,
		start: SudokuSolver.carve(completed, difficulty[level])
			.flat()
			.map(value => value || null),
	};
};

export default App;
