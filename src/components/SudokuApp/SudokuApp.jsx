import { Linear, Power3, TimelineMax, TweenMax } from "gsap";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSudokuGrid } from "../../hooks/useSudokuGrid";
import { position, valuesInColumn, valuesInGrid, valuesInRow } from "../../utilities/gridHelpers";
import Header from "../Header/Header";
import NumberPicker from "../NumberPicker/NumberPicker";
import SettingsMenu from "../SettingsMenu/SettingsMenu";
import SudokuGrid from "../SudokuGrid/SudokuGrid";
import styles from "./SudokuApp.module.css";

const App = () => {
	const [difficulty, setDifficulty] = useState("easy");
	const { gridValues, setGridValues, solution, solved, createNewPuzzle, reset, puzzleId } = useSudokuGrid(difficulty);
	const [selectedSquare, setSelectedSquare] = useState(null);
	const [themeColor, setThemeColor] = useState("green");
	const [assistLevel, setAssistLevel] = useState(0);

	const setSquare = useCallback(
		(value) => {
			const newGrid = [...gridValues];
			newGrid[selectedSquare] = value;

			if (assistLevel >= 0 && newGrid.join("") !== solution.complete.join("")) {
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
		[gridValues, selectedSquare, setGridValues, setSelectedSquare, assistLevel, solution],
	);

	const themeStyles = useMemo(
		() => ({
			"--glow-color": `var(--${themeColor}-glow)`,
			"--theme-color": `var(--${themeColor}-theme)`,
		}),
		[themeColor],
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
					assistLevel={assistLevel}
					solutionValues={solution.complete}
				/>
				<NumberPicker setSquare={setSquare} />
			</div>
			<div className={styles.footer}>
				<SettingsMenu
					difficulty={difficulty}
					setDifficulty={setDifficulty}
					theme={themeColor}
					setTheme={setThemeColor}
					onReset={reset}
					onNewGame={() => createNewPuzzle(difficulty)}
					assistLevel={assistLevel}
					setAssistLevel={setAssistLevel}
				/>
			</div>
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
			borderColor: "white",
			color: "white",
			"--box-shadow-color": "rgba(255, 255, 255, 0.9)",
			repeat: 1,
			yoyo: true,
			ease: Power3.easeOut,
		},
		{ each: 0.1, from: "center", grid },
	);
};

export default App;
