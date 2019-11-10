import React, { memo } from "react";
import Info from "../Info/Info";
import styles from "./Header.module.css";

const Header = () => (
	<header className={styles.header}>
		<div className={styles.title}>SUDOKU</div>
		<Info />
	</header>
);

export default memo(Header);
