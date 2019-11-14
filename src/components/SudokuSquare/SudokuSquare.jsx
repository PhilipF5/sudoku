import classNames from "classnames";
import { gsap } from "gsap";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./SudokuSquare.module.css";

const SudokuSquare = ({
	index,
	value,
	onSelect,
	selected,
	puzzleId,
	isDupe,
	isWrong,
	position: { column, row, grid },
	children,
}) => {
	const [initialValue, setInitialValue] = useState(value);
	const timeline = useRef(gsap.timeline());
	const element = useRef(undefined);
	const inThirdColumn = useMemo(() => isThirdOrSixthInGroup(column), [column]);
	const inThirdRow = useMemo(() => isThirdOrSixthInGroup(row), [row]);
	const elementRef = useCallback((node) => node && (element.current = node), []);
	const [lastPuzzleId, setLastPuzzleId] = useState(puzzleId);
	const handleClick = () => onSelect(selected ? null : index);

	useEffect(() => {
		if (selected) {
			timeline.current = gsap
				.timeline()
				.to(element.current, { duration: 0.5, scale: 1.2, ease: "power0.none" })
				.add(
					gsap
						.to(element.current, 3, {
							rotationX: "+=360_cw",
							rotationY: "+=360_cw",
							scale: 1.2,
							ease: "power0.none",
						})
						.repeat(-1),
				);
		} else if (timeline.current.isActive()) {
			timeline.current.pause();
			gsap.to(element.current, { duration: 0.75, rotationX: 0, rotationY: 0, scale: 1, ease: "power0.none" });
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
				[styles.bad]: isDupe || isWrong,
			})}
			onClick={handleClick}
			ref={elementRef}
			data-column={column}
			data-row={row}
			data-grid={grid}
		>
			{value}
			{children}
		</div>
	);
};

const isThirdOrSixthInGroup = (index) => (index + 1) % 3 === 0 && index < 8;

export default memo(SudokuSquare);
