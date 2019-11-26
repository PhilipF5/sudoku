import classNames from "classnames";
import React, { memo } from "react";
import NumberButton from "../NumberButton/NumberButton";
import styles from "./NumberPicker.module.css";

const NumberPicker = ({ disabled, setSquare }) => {
	return (
		<div className={classNames(styles.picker, { [styles.disabled]: disabled })}>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
				<NumberButton number={number} key={number} onSetSquare={setSquare} />
			))}
			<NumberButton number="✕" key="X" onSetSquare={() => setSquare(null)} />
		</div>
	);
};

export default memo(NumberPicker);
