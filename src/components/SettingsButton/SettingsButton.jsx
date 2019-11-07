import React from "react";
import styles from "./SettingsButton.module.css";

const SettingsButton = ({ onClick, children }) => {
	return (
		<button className={styles.button} onClick={onClick}>
			{children}
		</button>
	);
};

export default SettingsButton;
