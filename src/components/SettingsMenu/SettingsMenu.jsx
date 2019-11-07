import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import SettingsMenuItem from "../SettingsMenuItem/SettingsMenuItem";
import styles from "./SettingsMenu.module.css";

const SettingsMenu = ({ difficulty, theme, setDifficulty, setTheme }) => {
	const [open, setOpen] = useState(false);
	const toggleOpen = useCallback(() => setOpen((isOpen) => !isOpen), [setOpen]);
	const handleGearClick = useCallback(
		(e) => {
			e.stopPropagation();
			toggleOpen();
		},
		[toggleOpen],
	);

	useEffect(() => {
		if (open) {
			window.addEventListener("click", toggleOpen, { once: true });
		} else {
			window.removeEventListener("click", toggleOpen);
		}
	}, [toggleOpen, open]);

	return (
		<div className={styles.settings}>
			<button className={styles.gearButton} onClick={handleGearClick}>
				<FontAwesomeIcon icon={faCog} />
			</button>
			{open && (
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
			)}
		</div>
	);
};

export default SettingsMenu;
