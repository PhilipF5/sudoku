import React from "react";
import Version from "../Version/Version";
import styles from "./Info.module.css";

const Info = () => (
	<div className={styles.container}>
		<div className={styles.author}>
			👨‍💻 by&nbsp;
			<a href="https://www.philipfulgham.com" target="_blank">
				Philip Fulgham
			</a>
		</div>
		<Version />
	</div>
);

export default Info;
