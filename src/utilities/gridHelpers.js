export const columnOfSquare = (index) => index % 9;
export const rowOfSquare = (index) => Math.trunc(index / 9);
export const regionOfSquare = (index) => Math.trunc(columnOfSquare(index) / 3) + Math.trunc(rowOfSquare(index) / 3) * 3;
export const positionOf = (index) => ({
	column: columnOfSquare(index),
	region: regionOfSquare(index),
	row: rowOfSquare(index),
});
export const valuesInColumn = (gridValues, column) => gridValues.filter((_, i) => columnOfSquare(i) === column);
export const valuesInRow = (gridValues, row) => gridValues.filter((_, i) => rowOfSquare(i) === row);
export const valuesInRegion = (gridValues, region) => gridValues.filter((_, i) => regionOfSquare(i) === region);
export const valueIsDuplicate = (value, position, gridValues) =>
	value &&
	[
		...valuesInColumn(gridValues, position.column),
		...valuesInRow(gridValues, position.row),
		...valuesInRegion(gridValues, position.region),
	].filter((v) => v === value).length > 3;
export const valueWouldBeDuplicate = (value, position, gridValues) =>
	value &&
	[
		...valuesInColumn(gridValues, position.column),
		...valuesInRow(gridValues, position.row),
		...valuesInRegion(gridValues, position.region),
	].includes(value);
