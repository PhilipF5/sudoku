import React, { memo } from "react";
import styles from "./NumberButton.module.css";

const NumberButton = ({ number, onSetSquare }) => {
	return (
		<button className={styles.number} onClick={() => onSetSquare(number)}>
			{number}
		</button>
	);
};

export default memo(NumberButton);
