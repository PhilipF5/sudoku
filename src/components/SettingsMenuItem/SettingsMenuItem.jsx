import classNames from "classnames";
import React, { useCallback, useMemo } from "react";
import styles from "./SettingsMenuItem.module.css";

const SettingsMenuItem = ({ name, options, onChange, value }) => {
	const handleChange = useCallback((newValue) => onChange(newValue), [onChange]);
	const optionButtons = useMemo(
		() =>
			options.map((o) => (
				<button
					className={classNames(styles.option, { [styles.active]: o === value })}
					onClick={() => handleChange(o)}
					key={o}
				>
					{o}
				</button>
			)),
		[handleChange, options, value],
	);

	return (
		<div className={styles.menuItem}>
			<div className={styles.name}>{name}</div>
			{optionButtons}
		</div>
	);
};

export default SettingsMenuItem;
