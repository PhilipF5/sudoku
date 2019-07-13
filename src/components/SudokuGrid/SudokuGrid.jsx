import React from "react";
import SudokuSquare from "../SudokuSquare/SudokuSquare";
import styles from "./SudokuGrid.module.css";

const SudokuGrid = ({ grid, initialValues, selectSquare, selectedSquare }) => (
	<div className={styles.grid}>
		{grid.map((value, index) => (
			<SudokuSquare
				{...{ index, value, selectSquare }}
				key={index}
				selected={selectedSquare === index}
				position={position(index)}
				initialValue={initialValues[index]}
			/>
		))}
	</div>
);

const columnOfSquare = index => index % 9;
const rowOfSquare = index => Math.trunc(index / 9);
const gridOfSquare = index => Math.trunc(columnOfSquare(index) / 3) + Math.trunc(rowOfSquare(index) / 3) * 3;
const position = index => ({ column: columnOfSquare(index), grid: gridOfSquare(index), row: rowOfSquare(index) });

export default SudokuGrid;
