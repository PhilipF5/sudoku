import { SudokuSolver } from "@jlguenego/sudoku-generator";
import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
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
	const [solved, setSolved] = useState(false);
	const [selectedSquare, selectSquare] = useState(null);
	const setSquare = value => {
		const newGrid = [...grid];
		newGrid[selectedSquare] = value;
		setGrid(newGrid);
		setSolved(newGrid.every((value, index) => value === solution[index]));
	};

	useEffect(() => {
		const { solution, start } = newPuzzle();
		setGrid(start);
		setSolution(solution);
	}, []);

	return (
		<div className={styles.app}>
			<Header />
			<SudokuGrid {...{ grid, selectSquare, selectedSquare }} />
			<NumberPicker {...{ setSquare }} />
			{solved && <div>Solved</div>}
		</div>
	);
};

const newPuzzle = (level = "easy") => {
	const solution = SudokuSolver.generate();
	return {
		solution: solution.flat(),
		start: SudokuSolver.carve(solution, difficulty[level])
			.flat()
			.map(value => value || null),
	};
};

export default App;
