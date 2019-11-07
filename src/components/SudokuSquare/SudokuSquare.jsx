import classNames from "classnames";
import { Linear, TimelineMax, TweenMax } from "gsap";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./SudokuSquare.module.css";

const SudokuSquare = ({ index, value, onSelect, selected, puzzleId, isDupe, position: { column, row, grid } }) => {
	const [initialValue, setInitialValue] = useState(value);
	const timeline = useRef(new TimelineMax());
	const element = useRef(undefined);
	const inThirdColumn = useMemo(() => isThirdOrSixthInGroup(column), [column]);
	const inThirdRow = useMemo(() => isThirdOrSixthInGroup(row), [row]);
	const elementRef = useCallback((node) => node && (element.current = node), []);
	const [lastPuzzleId, setLastPuzzleId] = useState(puzzleId);
	const handleClick = () => onSelect(selected ? null : index);

	useEffect(() => {
		if (selected) {
			timeline.current = new TimelineMax().to(element.current, 0.5, { scale: 1.2, ease: Linear.easeInOut }).add(
				TweenMax.to(element.current, 3, {
					rotationX: "+=360_cw",
					rotationY: "+=360_cw",
					scale: 1.2,
					ease: Linear.easeInOut,
				}).repeat(-1),
			);
		} else {
			timeline.current.pause();
			TweenMax.to(element.current, 0.75, { rotationX: 0, rotationY: 0, scale: 1, ease: Linear.easeInOut });
		}
	}, [selected, element, timeline]);

	useEffect(() => {
		if (puzzleId > lastPuzzleId) {
			setInitialValue(value);
			setLastPuzzleId(puzzleId);
		}
	}, [lastPuzzleId, puzzleId, value]);

	return (
		<div
			className={classNames("square", styles.square, {
				[styles.thirdColumn]: inThirdColumn,
				[styles.thirdRow]: inThirdRow,
				[styles.selected]: selected,
				[styles.prefilled]: initialValue,
				[styles.duplicate]: isDupe,
			})}
			onClick={handleClick}
			ref={elementRef}
			data-column={column}
			data-row={row}
			data-grid={grid}
		>
			{value}
		</div>
	);
};

const isThirdOrSixthInGroup = (index) => (index + 1) % 3 === 0 && index < 8;

export default SudokuSquare;
