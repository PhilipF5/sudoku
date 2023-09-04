import { createRoot } from "react-dom/client";
import "typeface-erica-one";
import SudokuApp from "./components/SudokuApp/SudokuApp";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(<SudokuApp />);
