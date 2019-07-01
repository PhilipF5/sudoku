import React, { useContext } from "react";
import { PuzzleContext } from "../../context/PuzzleContext";
import SudokuSquare from "../SudokuSquare/SudokuSquare";
import styles from "./SudokuGrid.module.css";

const SudokuGrid = () => {
	const context = useContext(PuzzleContext);
	return (
		<div className={styles.grid}>
			{context.grid.map((value, index) => (
				<SudokuSquare key={index} index={index} />
			))}
		</div>
	);
};

export default SudokuGrid;
