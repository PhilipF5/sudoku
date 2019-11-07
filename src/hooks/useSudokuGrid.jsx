import { SudokuSolver } from "@jlguenego/sudoku-generator";
import { useEffect, useState } from "react";

export const useSudokuGrid = (initialDifficulty = "easy") => {
	const [{ solution, start }, setPuzzle] = useState(generatePuzzle(initialDifficulty));
	const [gridValues, setGridValues] = useState(start);
	const [solved, setSolved] = useState(false);
	const [puzzleId, setPuzzleId] = useState(0);
	const createNewPuzzle = (difficulty = "easy") => setPuzzle(generatePuzzle(difficulty));
	const reset = () => setGridValues(start);

	useEffect(() => {
		setGridValues(start);
		setPuzzleId((id) => id + 1);
	}, [start]);

	useEffect(() => {
		setSolved(gridValues.every((value, index) => value === solution[index]));
	}, [gridValues, solution]);

	return {
		gridValues,
		setGridValues,
		solved,
		createNewPuzzle,
		reset,
		puzzleId,
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
