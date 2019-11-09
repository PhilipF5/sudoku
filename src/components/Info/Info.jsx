import React, { memo } from "react";
import Version from "../Version/Version";
import styles from "./Info.module.css";

const Info = () => (
	<div className={styles.container}>
		<div className={styles.source}>
			Source code on&nbsp;
			<a href="https://github.com/PhilipF5/sudoku" target="_blank" rel="noopener noreferrer">
				GitHub
			</a>
		</div>
		<div className={styles.author}>
			<span role="img" aria-label="Development">
				👨‍💻
			</span>
			&nbsp;by&nbsp;
			<a href="https://www.philipfulgham.com" target="_blank" rel="noopener noreferrer">
				Philip Fulgham
			</a>
		</div>
		<Version />
	</div>
);

export default memo(Info);
