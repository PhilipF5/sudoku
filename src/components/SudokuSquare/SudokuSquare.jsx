import React, { useContext } from "react";
import { PuzzleContext } from "../../context/PuzzleContext";
import styles from "./SudokuSquare.module.css";

const SudokuSquare = ({ index }) => {
	const context = useContext(PuzzleContext);
	const row = context.rowOfSquare(index);
	const column = context.columnOfSquare(index);
	const isSelected = context.selectedSquare === index;
	const handleClick = () => {
		console.log(`Square #${index} clicked! Row ${row}, Column ${column}`);
		context.selectSquare(index);
	};
	const classNames = [styles.square, (row + 1) % 3 === 0 ? styles.thirdRow : "", isSelected ? styles.selected : ""];
	return <div className={classNames.join(" ")} onClick={handleClick}></div>;
};

export default SudokuSquare;
