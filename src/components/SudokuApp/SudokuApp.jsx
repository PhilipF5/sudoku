import { Linear, TweenMax } from "gsap";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSudokuGrid } from "../../hooks/useSudokuGrid";
import Header from "../Header/Header";
import NumberPicker from "../NumberPicker/NumberPicker";
import SettingsMenu from "../SettingsMenu/SettingsMenu";
import SudokuGrid from "../SudokuGrid/SudokuGrid";
import styles from "./SudokuApp.module.css";

const App = () => {
	const [difficulty, setDifficulty] = useState("easy");
	const { gridValues, setGridValues, solved, createNewPuzzle, reset, puzzleId } = useSudokuGrid(difficulty);
	const [selectedSquare, setSelectedSquare] = useState(null);
	const [themeColor, setThemeColor] = useState("green");
	const [assistLevel, setAssistLevel] = useState(0);

	const setSquare = useCallback(
		(value) => {
			const newGrid = [...gridValues];
			newGrid[selectedSquare] = value;
			setSelectedSquare(null);
			setGridValues(newGrid);
		},
		[gridValues, selectedSquare, setGridValues, setSelectedSquare],
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

export default App;
