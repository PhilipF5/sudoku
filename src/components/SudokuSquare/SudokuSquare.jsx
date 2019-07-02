import React from "react";
import styles from "./SudokuSquare.module.css";

const SudokuSquare = ({ index, value, selectSquare, selected }) => {
	const { column, row } = { column: index % 9, row: Math.trunc(index / 9) };
	const classNames = [styles.square, (row + 1) % 3 === 0 ? styles.thirdRow : "", selected ? styles.selected : ""];
	const handleClick = () => {
		console.log(`Square #${index} clicked! Row ${row}, Column ${column}`);
		selectSquare(index);
	};
	return (
		<div className={classNames.join(" ")} onClick={handleClick}>
			{value}
		</div>
	);
};

export default SudokuSquare;
