export const columnOfSquare = (index) => index % 9;
export const rowOfSquare = (index) => Math.trunc(index / 9);
export const gridOfSquare = (index) => Math.trunc(columnOfSquare(index) / 3) + Math.trunc(rowOfSquare(index) / 3) * 3;
export const positionOf = (index) => ({
	column: columnOfSquare(index),
	grid: gridOfSquare(index),
	row: rowOfSquare(index),
});
export const valuesInColumn = (gridValues, column) => gridValues.filter((_, i) => columnOfSquare(i) === column);
export const valuesInRow = (gridValues, row) => gridValues.filter((_, i) => rowOfSquare(i) === row);
export const valuesInGrid = (gridValues, grid) => gridValues.filter((_, i) => gridOfSquare(i) === grid);
export const valueIsDuplicate = (value, position, gridValues) =>
	value &&
	[
		...valuesInColumn(gridValues, position.column),
		...valuesInRow(gridValues, position.row),
		...valuesInGrid(gridValues, position.grid),
	].filter((v) => v === value).length > 3;
export const valueWouldBeDuplicate = (value, position, gridValues) =>
	value &&
	[
		...valuesInColumn(gridValues, position.column),
		...valuesInRow(gridValues, position.row),
		...valuesInGrid(gridValues, position.grid),
	].includes(value);
