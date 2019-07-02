import React from "react";
import SudokuSquare from "../SudokuSquare/SudokuSquare";
import styles from "./SudokuGrid.module.css";

const SudokuGrid = ({ grid, selectSquare, selectedSquare }) => (
	<div className={styles.grid}>
		{grid.map((value, index) => (
			<SudokuSquare
				key={index}
				index={index}
				value={value}
				selectSquare={selectSquare}
				selected={selectedSquare === index}
			/>
		))}
	</div>
);

export default SudokuGrid;
