import React from "react";
import { valueWouldBeDuplicate } from "../../utilities/gridHelpers";
import styles from "./SquareHints.module.css";

const SquareHints = ({ gridValues, position }) => {
	return (
		<div className={styles.hints}>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9]
				.filter((n) => !valueWouldBeDuplicate(n, position, gridValues))
				.map((n) => (
					<div className={styles.number} key={n}>
						{n}
					</div>
				))}
		</div>
	);
};

export default SquareHints;
