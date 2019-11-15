import { gsap } from "gsap";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePuzzle, useStorage } from "../../hooks";
import { position, valuesInColumn, valuesInGrid, valuesInRow } from "../../utilities";
import Header from "../Header/Header";
import NumberPicker from "../NumberPicker/NumberPicker";
import SettingsMenu from "../SettingsMenu/SettingsMenu";
import SudokuGrid from "../SudokuGrid/SudokuGrid";
import styles from "./SudokuApp.module.css";

const App = () => {
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

			if (settings.showCompletions >= 0 && newGrid.join("") !== solution.complete.join("")) {
				const { column, grid, row } = position(selectedSquare);
				const targets = [];
				if (valuesInRow(newGrid, row).join("") === solution.rows[row]) {
					targets.push(`.square[data-row="${row}"]`);
				}
				if (valuesInColumn(newGrid, column).join("") === solution.columns[column]) {
					targets.push(`.square[data-column="${column}"]`);
				}
				if (valuesInGrid(newGrid, grid).join("") === solution.grids[grid]) {
					targets.push(`.square[data-grid="${grid}"]`);
				}
				if (targets.length) {
					animateSectionSolved(targets.join(", "));
				}
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
		if (solved) {
			gsap.to(".square", {
				duration: 1,
				filter: "hue-rotate(360deg)",
				ease: "power0.none",
				stagger: { each: 0.5, from: "start", grid: [9, 9], repeat: -1 },
			});
		}
	}, [solved]);

	useEffect(() => {
		setLoaded(false);
		gsap.killTweensOf(".square");
		gsap.set(".square", { clearProps: "all" });
		gsap.set(".square", { opacity: 0 });
		gsap.set(".square", {
			delay: 1,
			opacity: 1,
			stagger: { each: 0.025, from: "start" },
			onComplete: () => setLoaded(true),
		});
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

const animateSectionSolved = (targets) => {
	return gsap.to(targets, {
		duration: 0.5,
		"--box-shadow-color": "rgba(255, 255, 255, 0.902)",
		borderColor: "white",
		color: "white",
		ease: "power3.easeOut",
		overwrite: "auto",
		stagger: { amount: 0.5, from: "center", repeat: 1, yoyo: true },
	});
};

const defaultSettings = {
	theme: "green",
	difficulty: "easy",
	showCompletions: true,
	showDuplicates: false,
	showHints: false,
	showIncorrect: false,
};

export default App;
