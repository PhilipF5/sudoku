import React, { useContext } from "react";
import { PuzzleContext } from "../../context/PuzzleContext";
import styles from "./SudokuSquare.module.css";

const SudokuSquare = ({ index }) => {
	const context = useContext(PuzzleContext);
	const row = context.rowOfSquare(index);
	const column = context.columnOfSquare(index);
	const isEveryThirdRow = (context.rowOfSquare(index) + 1) % 3 === 0;
	const handleClick = () => console.log(`Square #${index} clicked! Row ${row}, Column ${column}`);
	return <div className={`${styles.square} ${isEveryThirdRow ? styles.thirdRow : ""}`} onClick={handleClick}></div>;
};

export default SudokuSquare;
