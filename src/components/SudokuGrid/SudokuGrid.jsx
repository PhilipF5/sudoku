import React from "react";
import SudokuSquare from "../SudokuSquare/SudokuSquare";
import styles from "./SudokuGrid.module.css";

const SudokuGrid = ({ grid, selectSquare, selectedSquare }) => {
	const position = index => ({ column: columnOfSquare(index), grid: gridOfSquare(index), row: rowOfSquare(index) });
	return (
		<div className={styles.grid}>
			{grid.map((value, index) => (
				<SudokuSquare
					key={index}
					index={index}
					value={value}
					selectSquare={selectSquare}
					selected={selectedSquare === index}
					position={position}
				/>
			))}
		</div>
	);
};

const columnOfSquare = index => index % 9;
const rowOfSquare = index => Math.trunc(index / 9);
const gridOfSquare = index => Math.trunc(columnOfSquare(index) / 3) + Math.trunc(rowOfSquare(index) / 3) * 3;

export default SudokuGrid;
