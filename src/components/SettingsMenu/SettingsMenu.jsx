import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import SettingsButton from "../SettingsButton/SettingsButton";
import SettingsMenuItem from "../SettingsMenuItem/SettingsMenuItem";
import styles from "./SettingsMenu.module.css";

const SettingsMenu = ({ settings, setSettings, onReset, onNewGame }) => {
	const [open, setOpen] = useState(false);
	const toggleOpen = useCallback(() => setOpen((isOpen) => !isOpen), [setOpen]);
	const handleGearClick = useCallback(
		(e) => {
			e.stopPropagation();
			toggleOpen();
		},
		[toggleOpen],
	);

	const createMenuItem = useCallback(
		({ property, displayName, options }) => {
			return (
				<SettingsMenuItem
					key={property}
					name={displayName}
					options={options || [false, true]}
					onChange={(value) => setSettings({ [property]: value })}
					value={settings[property]}
				/>
			);
		},
		[settings, setSettings],
	);

	const menuItems = useMemo(() => settingConfigs.map((c) => createMenuItem(c)), [createMenuItem]);

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
					{menuItems}
					<div className={styles.buttons}>
						<SettingsButton onClick={onNewGame}>New Game</SettingsButton>
						<SettingsButton onClick={onReset}>Reset</SettingsButton>
					</div>
				</div>
			)}
		</div>
	);
};

const settingConfigs = [
	{ property: "theme", displayName: "Theme", options: ["blue", "green", "pink", "yellow"] },
	{ property: "difficulty", displayName: "Difficulty", options: ["easy", "medium", "hard"] },
	{ property: "showCompletions", displayName: "Show Completions" },
	{ property: "showDuplicates", displayName: "Show Duplicates" },
	{ property: "showHints", displayName: "Show Hints" },
	{ property: "showIncorrect", displayName: "Show Incorrect" },
];

export default SettingsMenu;
