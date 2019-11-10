import { Linear, Power3, TimelineMax, TweenMax } from "gsap";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePuzzle } from "../../hooks";
import { position, valuesInColumn, valuesInGrid, valuesInRow } from "../../utilities/gridHelpers";
import Header from "../Header/Header";
import NumberPicker from "../NumberPicker/NumberPicker";
import SettingsMenu from "../SettingsMenu/SettingsMenu";
import SudokuGrid from "../SudokuGrid/SudokuGrid";
import styles from "./SudokuApp.module.css";

const App = () => {
	const [settings, setSettings] = useState({
		theme: "green",
		difficulty: "easy",
		showCompletions: true,
		showDuplicates: false,
		showHints: false,
		showIncorrect: false,
	});
	const { gridValues, setGridValues, solution, solved, createNewPuzzle, reset, puzzleId } = usePuzzle(
		settings.difficulty,
	);
	const [selectedSquare, setSelectedSquare] = useState(null);

	const setSquare = useCallback(
		(value) => {
			const newGrid = [...gridValues];
			newGrid[selectedSquare] = value;

			if (settings.showCompletions >= 0 && newGrid.join("") !== solution.complete.join("")) {
				const { column, grid, row } = position(selectedSquare);
				const timeline = new TimelineMax();
				if (valuesInRow(newGrid, row).join("") === solution.rows[row]) {
					timeline.add(animateRowSolved(row));
				}
				if (valuesInColumn(newGrid, column).join("") === solution.columns[column]) {
					timeline.add(animateColumnSolved(column));
				}
				if (valuesInGrid(newGrid, grid).join("") === solution.grids[grid]) {
					timeline.add(animateGridSolved(grid));
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
			TweenMax.staggerTo(
				".square",
				1,
				{ filter: "hue-rotate(360deg)", repeat: -1, ease: Linear.easeInOut },
				{ each: 0.5, from: "start", grid: [9, 9] },
			);
		} else {
			TweenMax.killTweensOf(".square");
			TweenMax.to(".square", 1, { filter: "hue-rotate(0deg)", ease: Linear.easeInOut });
		}
	}, [solved]);

	return (
		<div className={styles.app} style={themeStyles}>
			<Header />
			<div className={styles.layout}>
				<SudokuGrid
					gridValues={gridValues}
					selectedSquare={selectedSquare}
					onSelectSquare={setSelectedSquare}
					puzzleId={puzzleId}
					showDuplicates={settings.showDuplicates}
					showHints={settings.showHints}
					showIncorrect={settings.showIncorrect}
					solutionValues={solution.complete}
				/>
				<NumberPicker setSquare={setSquare} />
			</div>
			<footer className={styles.footer}>
				<SettingsMenu
					settings={settings}
					setSettings={setSettings}
					onReset={reset}
					onNewGame={() => createNewPuzzle(settings.difficulty)}
				/>
			</footer>
		</div>
	);
};

const animateColumnSolved = (column) => animateSectionSolved("column", column, [1, 9]);
const animateGridSolved = (grid) => animateSectionSolved("grid", grid, [3, 3]);
const animateRowSolved = (row) => animateSectionSolved("row", row, [9, 1]);

const animateSectionSolved = (type, index, grid) => {
	return TweenMax.staggerTo(
		`.square[data-${type}="${index}"`,
		1,
		{
			className: "+=solvedFlash",
			repeat: 1,
			yoyo: true,
			ease: Power3.easeOut,
		},
		{ each: 0.1, from: "center", grid },
	);
};

export default App;
