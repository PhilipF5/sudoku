import React, { memo } from "react";
import NumberButton from "../NumberButton/NumberButton";
import styles from "./NumberPicker.module.css";

const NumberPicker = ({ setSquare }) => {
	return (
		<div className={styles.picker}>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
				<NumberButton number={number} key={number} onSetSquare={setSquare} />
			))}
			<NumberButton number="✕" key="X" onSetSquare={() => setSquare(null)} />
		</div>
	);
};

export default memo(NumberPicker);
