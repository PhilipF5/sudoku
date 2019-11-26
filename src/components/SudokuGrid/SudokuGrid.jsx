import { gsap } from "gsap";
import React, { useCallback, useState } from "react";
import { positionOf, valueIsDuplicate } from "../../utilities";
import SquareHints from "../SquareHints/SquareHints";
import SudokuSquare from "../SudokuSquare/SudokuSquare";
import styles from "./SudokuGrid.module.css";

const SudokuGrid = ({
	gridValues,
	onSelectSquare,
	selectedSquare,
	puzzleId,
	showDuplicates,
	showHints,
	showIncorrect,
	solutionValues,
}) => {
	const [gridPos, setGridPos] = useState({ bottom: 0, left: 0, right: 0, top: 0 });
	const gridRef = useCallback((node) => {
		const { bottom, left, right, top } = node.getBoundingClientRect();
		setGridPos({ bottom, left, right, top });
	}, []);

	const updateGridTilt = useCallback(
		(x, y) => {
			const rotationY = normalize(x, gridPos.right, gridPos.left, 50);
			const rotationX = normalize(y, gridPos.top, gridPos.bottom, 50);
			gsap.killTweensOf(`.${styles.grid}`);
			gsap.to(`.${styles.grid}`, { duration: 0.5, rotationX, rotationY, ease: "power1.easeOut" });
		},
		[gridPos],
	);

	const handleMouseMove = (e) => {
		if (selectedSquare === null) {
			updateGridTilt(e.clientX, e.clientY);
		}
	};

	const handleSelectSquare = useCallback(
		(square, x, y) => {
			updateGridTilt(x, y);
			onSelectSquare(square);
		},
		[onSelectSquare, updateGridTilt],
	);

	return (
		<div className={styles.grid} ref={gridRef} onMouseMove={handleMouseMove}>
			{gridValues.map((value, index, array) => {
				const pos = positionOf(index);
				return (
					<SudokuSquare
						index={index}
						value={value}
						onSelect={handleSelectSquare}
						key={index}
						selected={selectedSquare === index}
						position={pos}
						puzzleId={puzzleId}
						isDupe={showDuplicates && valueIsDuplicate(value, pos, array)}
						isWrong={showIncorrect && value && gridValues[index] !== solutionValues[index]}
					>
						{showHints && !value && <SquareHints gridValues={array} position={pos} />}
					</SudokuSquare>
				);
			})}
		</div>
	);
};

const normalize = (value, lower, upper, scale) => {
	const range = upper - lower;
	const ratio = (value - lower) / range;
	return scale * 2 * ratio - scale;
};

export default SudokuGrid;
