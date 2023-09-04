import classNames from "classnames";
import { gsap } from "gsap";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePuzzle } from "../../hooks";
import { storage } from "../../utilities";
import Header from "../Header/Header";
import NumberPicker from "../NumberPicker/NumberPicker";
import PortraitWarning from "../PortraitWarning/PortraitWarning";
import SettingsMenu from "../SettingsMenu/SettingsMenu";
import SudokuGrid from "../SudokuGrid/SudokuGrid";
import * as animations from "./SudokuApp.animations";
import styles from "./SudokuApp.module.css";

const savedSettings = storage.get("settings");

const SudokuApp = () => {
	const [settings, setSettings] = useState(savedSettings || defaultSettings);
	const { gridValues, setGridValues, solution, solved, createNewPuzzle, reset, puzzleId } = usePuzzle(
		settings.difficulty,
	);
	const [selectedSquare, setSelectedSquare] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [isTouch, setIsTouch] = useState(false);

	const updateSettings = useCallback((newSettings) => {
		setSettings((oldSettings) => {
			const mergedSettings = { ...oldSettings, ...newSettings };
			storage.set("settings", mergedSettings);
			return mergedSettings;
		});
	}, []);

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

	const handleReset = useCallback(() => {
		if (solved) {
			gsap.getById("solvedAnimation").pause(0).kill();
		}
		reset();
	}, [reset, solved]);

	const handleNewGame = useCallback(
		(difficulty) => {
			if (solved) {
				gsap.getById("solvedAnimation").pause(0).kill();
			}
			createNewPuzzle(difficulty);
		},
		[createNewPuzzle, solved],
	);

	const handleTouch = useCallback(() => setIsTouch(true), []);

	useEffect(() => {
		createNewPuzzle(settings.difficulty);
		// eslint-disable-next-line
	}, []);

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
	}, [settings]);

	return (
		<div className={classNames(styles.app, { isTouch })} style={themeStyles} onTouchStart={handleTouch}>
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
					solved={solved}
				/>
				<NumberPicker disabled={selectedSquare === null} setSquare={setSquare} />
			</div>
			<SettingsMenu
				settings={settings}
				setSettings={updateSettings}
				onReset={handleReset}
				onNewGame={() => handleNewGame(settings.difficulty)}
			/>
			<PortraitWarning />
		</div>
	);
};

const defaultSettings = {
	theme: "green",
	difficulty: "easy",
	tiltFactor: "light",
	showCompletions: true,
	showDuplicates: false,
	showHints: false,
	showIncorrect: false,
};

export default SudokuApp;
