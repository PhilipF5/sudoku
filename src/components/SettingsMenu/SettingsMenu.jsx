import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import SettingsMenuItem from "../SettingsMenuItem/SettingsMenuItem";
import styles from "./SettingsMenu.module.css";

const SettingsMenu = ({ difficulty, theme, setDifficulty, setTheme }) => {
	const [open, setOpen] = useState(false);
	return (
		<div className={styles.settings}>
			<button className={styles.gearButton}>
				<FontAwesomeIcon icon={faCog} />
			</button>
			<div className={styles.menu}>
				<SettingsMenuItem
					name="Theme"
					options={["blue", "green", "pink", "red", "yellow"]}
					onChange={setTheme}
					value={theme}
				/>
				<SettingsMenuItem
					name="Difficulty"
					options={["easy", "medium", "hard"]}
					onChange={setDifficulty}
					value={difficulty}
				/>
			</div>
		</div>
	);
};

export default SettingsMenu;
