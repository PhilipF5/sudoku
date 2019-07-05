import React from "react";
import styles from "./SudokuSquare.module.css";

const SudokuSquare = ({ index, value, selectSquare, selected, position }) => {
	const { column, grid, row } = position;
	const classNames = [
		styles.square,
		(column + 1) % 3 === 0 && column !== 8 && styles.thirdColumn,
		(row + 1) % 3 === 0 && row !== 8 && styles.thirdRow,
		selected && styles.selected,
	].filter(c => !!c);
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
