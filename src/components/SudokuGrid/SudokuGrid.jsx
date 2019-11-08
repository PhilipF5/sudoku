import { Power1, TweenLite } from "gsap";
import React, { useCallback, useState } from "react";
import { position, valueIsDuplicate } from "../../utilities/gridHelpers";
import SudokuSquare from "../SudokuSquare/SudokuSquare";
import styles from "./SudokuGrid.module.css";

const SudokuGrid = ({ gridValues, onSelectSquare, selectedSquare, puzzleId, assistLevel, solutionValues }) => {
	const [gridPos, setGridPos] = useState({ bottom: 0, left: 0, right: 0, top: 0 });
	const gridRef = useCallback((node) => {
		const { bottom, left, right, top } = node.getBoundingClientRect();
		setGridPos({ bottom, left, right, top });
	}, []);
	const handleMouseMove = (e) => {
		if (!selectedSquare) {
			const rotationY = normalize(e.clientX, gridPos.right, gridPos.left, 50);
			const rotationX = normalize(e.clientY, gridPos.top, gridPos.bottom, 50);
			TweenLite.killTweensOf(`.${styles.grid}`);
			TweenLite.to(`.${styles.grid}`, 0.5, { rotationX, rotationY, ease: Power1.easeOut });
		}
	};
	return (
		<div className={styles.grid} ref={gridRef} onMouseMove={handleMouseMove}>
			{gridValues.map((value, index, array) => (
				<SudokuSquare
					index={index}
					value={value}
					onSelect={onSelectSquare}
					key={index}
					selected={selectedSquare === index}
					position={position(index)}
					puzzleId={puzzleId}
					isDupe={assistLevel >= 1 && valueIsDuplicate(value, position(index), array)}
					isWrong={assistLevel >= 2 && value && gridValues[index] !== solutionValues[index]}
				/>
			))}
		</div>
	);
};

const normalize = (value, lower, upper, scale) => {
	const range = upper - lower;
	const ratio = (value - lower) / range;
	return scale * 2 * ratio - scale;
};

export default SudokuGrid;
