import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
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
						options={["blue", "green", "pink", "yellow"]}
						onChange={(theme) => setSettings((settings) => ({ ...settings, theme }))}
						value={settings.theme}
					/>
					<SettingsMenuItem
						name="Difficulty"
						options={["easy", "medium", "hard"]}
						onChange={(difficulty) => setSettings((settings) => ({ ...settings, difficulty }))}
						value={settings.difficulty}
					/>
					<SettingsMenuItem
						name="Show Completions"
						options={[false, true]}
						onChange={(showCompletions) => setSettings((settings) => ({ ...settings, showCompletions }))}
						value={settings.showCompletions}
					/>
					<SettingsMenuItem
						name="Show Duplicates"
						options={[false, true]}
						onChange={(showDuplicates) => setSettings((settings) => ({ ...settings, showDuplicates }))}
						value={settings.showDuplicates}
					/>
					<SettingsMenuItem
						name="Show Hints"
						options={[false, true]}
						onChange={(showHints) => setSettings((settings) => ({ ...settings, showHints }))}
						value={settings.showHints}
					/>
					<SettingsMenuItem
						name="Show Incorrect"
						options={[false, true]}
						onChange={(showIncorrect) => setSettings((settings) => ({ ...settings, showIncorrect }))}
						value={settings.showIncorrect}
					/>
					<div className={styles.buttons}>
						<SettingsButton onClick={onNewGame}>New Game</SettingsButton>
						<SettingsButton onClick={onReset}>Reset</SettingsButton>
					</div>
				</div>
			)}
		</div>
	);
};

export default SettingsMenu;
