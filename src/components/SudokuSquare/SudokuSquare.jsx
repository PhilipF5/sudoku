import classNames from "classnames";
import React, { useMemo, useRef } from "react";
import styles from "./SudokuSquare.module.css";

const SudokuSquare = ({ index, value, onSelect, selected, position }) => {
	const { current: initialValue } = useRef(value);
	const { column, grid, row } = position;
	const inThirdColumn = useMemo(() => (column + 1) % 3 === 0 && column !== 8, [column]);
	const inThirdRow = useMemo(() => (row + 1) % 3 === 0 && row !== 8, [row]);
	const handleClick = () => {
		console.log(`Square #${index} clicked! Column ${column}, Row ${row}, Grid ${grid}`);
		onSelect(selected ? null : index);
	};
	return (
		<div
			className={classNames(styles.square, {
				[styles.thirdColumn]: inThirdColumn,
				[styles.thirdRow]: inThirdRow,
				[styles.selected]: selected,
				[styles.prefilled]: initialValue,
			})}
			onClick={handleClick}
		>
			{value}
		</div>
	);
};

export default SudokuSquare;
