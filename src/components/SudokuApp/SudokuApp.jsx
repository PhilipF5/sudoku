import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePuzzle, useStorage } from "../../hooks";
import Header from "../Header/Header";
import NumberPicker from "../NumberPicker/NumberPicker";
import SettingsMenu from "../SettingsMenu/SettingsMenu";
import SudokuGrid from "../SudokuGrid/SudokuGrid";
import * as animations from "./SudokuApp.animations";
import styles from "./SudokuApp.module.css";

const SudokuApp = () => {
	const storage = useStorage();
	const [settings, setSettings] = useState(storage.get("settings") || defaultSettings);
	const { gridValues, setGridValues, solution, solved, createNewPuzzle, reset, puzzleId } = usePuzzle(
		settings.difficulty,
	);
	const [selectedSquare, setSelectedSquare] = useState(null);
	const [loaded, setLoaded] = useState(false);

	const updateSettings = useCallback(
		(newSettings) => {
			setSettings((oldSettings) => {
				const mergedSettings = { ...oldSettings, ...newSettings };
				storage.set("settings", mergedSettings);
				return mergedSettings;
			});
		},
		[storage],
	);

	const setSquare = useCallback(
		(value) => {
			const newGrid = [...gridValues];
			newGrid[selectedSquare] = value;

			if (settings.showCompletions && newGrid.join("") !== solution.complete.join("")) {
				animations.animateSectionSolved(newGrid, solution, selectedSquare);
			}

			setSelectedSquare(null);
			setGridValues(newGrid);
		},
		[gridValues, selectedSquare, setGridValues, setSelectedSquare, settings.showCompletions, solution],
	);

	const themeStyles = useMemo(
		() => ({
			"--glow-color": `var(--${settings.theme}-glow)`,
			"--theme-color": `var(--${settings.theme}-theme)`,
		}),
		[settings.theme],
	);

	useEffect(() => {
		solved && animations.animatePuzzleSolved();
	}, [solved]);

	useEffect(() => {
		setLoaded(false);
		animations.animateNewPuzzle().eventCallback("onComplete", () => setLoaded(true));
	}, [puzzleId]);

	useEffect(() => {
		if (settings && settings !== defaultSettings) {
			storage.set("settings", settings);
		}
	});

	return (
		<div className={styles.app} style={themeStyles}>
			<Header />
			<div className={styles.layout}>
				<SudokuGrid
					gridValues={loaded ? gridValues : Array.apply(null, Array(81))}
					selectedSquare={selectedSquare}
					onSelectSquare={setSelectedSquare}
					puzzleId={loaded && puzzleId}
					showDuplicates={settings.showDuplicates}
					showHints={loaded && settings.showHints}
					showIncorrect={settings.showIncorrect}
					solutionValues={solution.complete}
					tiltFactor={settings.tiltFactor}
				/>
				<NumberPicker setSquare={setSquare} />
			</div>
			<footer className={styles.footer}>
				<SettingsMenu
					settings={settings}
					setSettings={updateSettings}
					onReset={reset}
					onNewGame={() => createNewPuzzle(settings.difficulty)}
				/>
			</footer>
		</div>
	);
};

const defaultSettings = {
	theme: "green",
	difficulty: "easy",
	tiltFactor: "heavy",
	showCompletions: true,
	showDuplicates: false,
	showHints: false,
	showIncorrect: false,
};

export default SudokuApp;
