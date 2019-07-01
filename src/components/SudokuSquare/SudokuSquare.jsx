import React, { useContext } from "react";
import { PuzzleContext } from "../../context/PuzzleContext";
import styles from "./SudokuSquare.module.css";

const SudokuSquare = ({ index }) => {
	const { position, selectSquare, selectedSquare } = useContext(PuzzleContext);
	const { column, row } = position(index);
	const isSelected = selectedSquare === index;
	const classNames = [styles.square, (row + 1) % 3 === 0 ? styles.thirdRow : "", isSelected ? styles.selected : ""];
	const handleClick = () => {
		console.log(`Square #${index} clicked! Row ${row}, Column ${column}`);
		selectSquare(index);
	};
	return <div className={classNames.join(" ")} onClick={handleClick}></div>;
};

export default SudokuSquare;
