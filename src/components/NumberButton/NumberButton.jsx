import React from "react";
import styles from "./NumberButton.module.css";

const NumberButton = ({ number, onSetSquare }) => {
	return (
		<div className={styles.number} onClick={() => onSetSquare(number)}>
			{number}
		</div>
	);
};

export default NumberButton;
