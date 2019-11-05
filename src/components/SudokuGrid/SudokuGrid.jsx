import { TweenLite } from "gsap";
import React, { useCallback, useState } from "react";
import SudokuSquare from "../SudokuSquare/SudokuSquare";
import styles from "./SudokuGrid.module.css";

const SudokuGrid = ({ gridValues, onSelectSquare, selectedSquare }) => {
	const [gridPos, setGridPos] = useState({ bottom: 0, left: 0, right: 0, top: 0 });
	const gridRef = useCallback((node) => {
		const { bottom, left, right, top } = node.getBoundingClientRect();
		setGridPos({ bottom, left, right, top });
	}, []);
	const handleMouseMove = (e) => {
		if (!selectedSquare) {
			const rotationY = normalize(e.clientX, gridPos.right, gridPos.left, 50);
			const rotationX = normalize(e.clientY, gridPos.top, gridPos.bottom, 50);
			TweenLite.set(`.${styles.grid}`, { rotationX, rotationY });
		}
	};
	return (
		<div className={styles.grid} ref={gridRef} onMouseMove={handleMouseMove}>
			{gridValues.map((value, index) => (
				<SudokuSquare
					index={index}
					value={value}
					onSelect={onSelectSquare}
					key={index}
					selected={selectedSquare === index}
					position={position(index)}
				/>
			))}
		</div>
	);
};

const columnOfSquare = (index) => index % 9;
const rowOfSquare = (index) => Math.trunc(index / 9);
const gridOfSquare = (index) => Math.trunc(columnOfSquare(index) / 3) + Math.trunc(rowOfSquare(index) / 3) * 3;
const position = (index) => ({ column: columnOfSquare(index), grid: gridOfSquare(index), row: rowOfSquare(index) });

const normalize = (value, lower, upper, scale) => {
	const range = upper - lower;
	const ratio = (value - lower) / range;
	return scale * 2 * ratio - scale;
};

export default SudokuGrid;
