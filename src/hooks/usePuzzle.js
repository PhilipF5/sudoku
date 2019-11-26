import { SudokuSolver } from "@jlguenego/sudoku-generator";
import { useEffect, useMemo, useState } from "react";
import { valuesInColumn, valuesInRegion, valuesInRow } from "../utilities";

export const usePuzzle = (initialDifficulty = "easy") => {
	const [{ solution, start }, setPuzzle] = useState(generatePuzzle(initialDifficulty));
	const [gridValues, setGridValues] = useState(start);
	const [solved, setSolved] = useState(false);
	const [puzzleId, setPuzzleId] = useState(0);
	const createNewPuzzle = (difficulty = "easy") => setPuzzle(generatePuzzle(difficulty));
	const reset = () => setGridValues(start);

	const solutionPieces = useMemo(() => {
		const slices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		return {
			columns: slices.map((s) => valuesInColumn(solution, s).join("")),
			regions: slices.map((s) => valuesInRegion(solution, s).join("")),
			rows: slices.map((s) => valuesInRow(solution, s).join("")),
		};
	}, [solution]);

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
		solution: { complete: solution, ...solutionPieces },
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
