# Sudoku

Sudoku is a popular logic-based number puzzle that became a worldwide phenomenon in the mid-2000s. The objective of the puzzle is to fill a 9×9 grid with the digits 1 through 9, such that each row, each column, and each 3×3 sub-grid contains each digit exactly once.

## How To Play

Click any not-prefilled square to select it. Then use the numbered buttons on the right to fill the square with one of the numbers 1 through 9.

## Settings

Several different settings are available to customize the game experience and difficulty. These can be accessed via the gear menu in the lower-right corner. Settings are stored by session, so they won't persist once you close the page. The available settings are detailed below:

| Setting | Description |
| ------- | ----------- |
| Theme | Change the primary color of the UI. Options are blue, green, pink, and yellow. Default is green. |
| Difficulty | Change the difficulty of the generated puzzle. This refers to the on-paper difficulty of the puzzle, and does not take any helper features into account. Options are easy, medium, and hard. Default is easy. |
| Tilt Factor | Adjust how sharply the grid tilts when you move the mouse around it. Options are none, light, and heavy. Default is heavy. |
| Show Completions | Briefly highlight a row, column, or sub-grid when that section has been completed correctly. Default is true. |
| Show Duplicates | Highlight anywhere there are two of the same digit in a single row, column, or sub-grid. Default is false. |
| Show Hints | Show all the possible digits for each square without duplicating what's already on the board. Default is false. |
| Show Incorrect | Highlight any filled digit that does not match the puzzle's actual solution. Default is false. |

## Tech Stack

This is a [React](https://reactjs.org) app bootstrapped with [Create React App](https://create-react-app.dev). Styles are written using [CSS Modules](https://github.com/css-modules/css-modules). Animations are written using [GreenSock](https://greensock.com). Puzzle generation is handled by the [sudoku-generator](https://github.com/jlguenego/sudoku-generator) JS library wrriten by [Jean-Louis GUENEGO](https://github.com/jlguenego).
