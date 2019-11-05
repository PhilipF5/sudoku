import React from "react";
import Info from "../Info/Info";
import styles from "./Header.module.css";

const Header = () => (
	<div className={styles.header}>
		<div className={styles.title}>SUDOKU</div>
		<Info />
	</div>
);

export default Header;
