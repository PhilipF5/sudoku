import classNames from "classnames";
import { Linear, TimelineMax, TweenMax } from "gsap";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import styles from "./SudokuSquare.module.css";

const SudokuSquare = ({ index, value, onSelect, selected, position: { column, row } }) => {
	const { current: initialValue } = useRef(value);
	const timeline = useRef(new TimelineMax());
	const element = useRef(undefined);
	const inThirdColumn = useMemo(() => isThirdOrSixthInGroup(column), [column]);
	const inThirdRow = useMemo(() => isThirdOrSixthInGroup(row), [row]);
	const elementRef = useCallback((node) => node && (element.current = node), []);
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

	return (
		<div
			className={classNames(styles.square, {
				[styles.thirdColumn]: inThirdColumn,
				[styles.thirdRow]: inThirdRow,
				[styles.selected]: selected,
				[styles.prefilled]: initialValue,
			})}
			onClick={handleClick}
			ref={elementRef}
		>
			{value}
		</div>
	);
};

const isThirdOrSixthInGroup = (index) => (index + 1) % 3 === 0 && index < 8;

export default SudokuSquare;
