import { SudokuSolver } from "@jlguenego/sudoku-generator";
import { useEffect, useState } from "react";

export const useSudokuGrid = () => {
	const [{ solution, start }, setPuzzle] = useState(generatePuzzle());
	const [gridValues, setGridValues] = useState(start);
	const [solved, setSolved] = useState(false);
	const createNewPuzzle = () => setPuzzle(generatePuzzle());
	const reset = () => setGridValues(start);

	useEffect(() => {
		setGridValues(start);
	}, [start, setGridValues]);

	useEffect(() => {
		setSolved(gridValues.every((value, index) => value === solution[index]));
	}, [gridValues, solution, setSolved]);

	return {
		gridValues,
		setGridValues,
		solved,
		createNewPuzzle,
		reset,
	};
};

const difficulty = {
	easy: 47,
	medium: 51,
	hard: 55,
};

const generatePuzzle = (level = "easy") => {
	const solution = SudokuSolver.generate();
	return {
		solution: solution.flat(),
		start: SudokuSolver.carve(solution, difficulty[level])
			.flat()
			.map((value) => value || null),
	};
};
