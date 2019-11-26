import classNames from "classnames";
import { gsap } from "gsap";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as animations from "./SudokuSquare.animations";
import styles from "./SudokuSquare.module.css";

const SudokuSquare = ({
	index,
	value,
	onSelect,
	selected,
	puzzleId,
	isDupe,
	isWrong,
	position: { column, row, region },
	children,
}) => {
	const [initialValue, setInitialValue] = useState(value);
	const timeline = useRef(gsap.timeline());
	const element = useRef(undefined);
	const inThirdColumn = useMemo(() => isThirdOrSixthInGroup(column), [column]);
	const inThirdRow = useMemo(() => isThirdOrSixthInGroup(row), [row]);
	const elementRef = useCallback((node) => node && (element.current = node), []);
	const [lastPuzzleId, setLastPuzzleId] = useState(puzzleId);
	const handleClick = (e) => onSelect(selected ? null : index, e.clientX, e.clientY);

	useEffect(() => {
		if (selected) {
			timeline.current = animations.rotateSquare(element.current);
		} else if (timeline.current.isActive()) {
			timeline.current.pause();
			animations.derotateSquare(element.current);
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
			data-region={region}
		>
			{value}
			{children}
		</div>
	);
};

const isThirdOrSixthInGroup = (index) => (index + 1) % 3 === 0 && index < 8;

export default memo(SudokuSquare);
