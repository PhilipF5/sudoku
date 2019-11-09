import classNames from "classnames";
import React, { memo, useCallback, useMemo } from "react";
import styles from "./SettingsMenuItem.module.css";

const SettingsMenuItem = ({ name, options, onChange, value }) => {
	const handleChange = useCallback(
		(e, newValue) => {
			e.stopPropagation();
			onChange(newValue);
		},
		[onChange],
	);
	const optionButtons = useMemo(
		() =>
			options.map((o) => (
				<button
					className={classNames(styles.option, { [styles.active]: o === value })}
					onClick={(e) => handleChange(e, o)}
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

export default memo(SettingsMenuItem);
