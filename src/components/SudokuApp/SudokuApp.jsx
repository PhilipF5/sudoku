import React, { useCallback, useState } from "react";
import { useSudokuGrid } from "../../hooks/useSudokuGrid";
import Header from "../Header/Header";
import NumberPicker from "../NumberPicker/NumberPicker";
import SudokuGrid from "../SudokuGrid/SudokuGrid";

const App = () => {
	const { gridValues, setGridValues, solved } = useSudokuGrid();
	const [selectedSquare, setSelectedSquare] = useState(null);

	const setSquare = useCallback(
		(value) => {
			const newGrid = [...gridValues];
			newGrid[selectedSquare] = value;
			setSelectedSquare(null);
			setGridValues(newGrid);
		},
		[gridValues, selectedSquare, setGridValues, setSelectedSquare],
	);

	return (
		<>
			<Header />
			<SudokuGrid gridValues={gridValues} selectedSquare={selectedSquare} onSelectSquare={setSelectedSquare} />
			<NumberPicker setSquare={setSquare} />
			{solved && <div>Solved</div>}
		</>
	);
};

export default App;
