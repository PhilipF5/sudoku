import React from "react";
import styles from "./SudokuSquare.module.css";

const SudokuSquare = ({ index, value, selectSquare, selected, position }) => {
	const { column, grid, row } = position(index);
	const classNames = [styles.square, (row + 1) % 3 === 0 ? styles.thirdRow : "", selected ? styles.selected : ""];
	const handleClick = () => {
		console.log(`Square #${index} clicked! Column ${column}, Row ${row}, Grid ${grid}`);
		selectSquare(index);
	};
	return (
		<div className={classNames.join(" ")} onClick={handleClick}>
			{value}
		</div>
	);
};

export default SudokuSquare;
