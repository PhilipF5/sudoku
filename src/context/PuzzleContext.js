import { createContext } from "react";

export const initialState = {
	grid: Array.apply(null, Array(81)),
	selectedSquare: null,
	rowOfSquare: square => Math.trunc(square / 9),
	columnOfSquare: square => square % 9,
	setSquare: (grid, index, value) => (grid[index] = value),
	row: (grid, index) => grid.slice(index * 9, (index + 1) * 9),
	column: (grid, index) => grid.filter((_, square) => square % 9 === index % 9),
};

export const PuzzleContext = createContext(initialState);
