import React, { useCallback, useState } from "react";
import styles from "./PortraitWarning.module.css";

const PortraitWarning = () => {
	const [clicks, setClicks] = useState(0);
	const incrementClicks = useCallback(() => setClicks((c) => c + 1), [setClicks]);
	const getMessage = useCallback(() => messages[Math.min(Math.floor(clicks / increment), messages.length - 1)], [
		clicks,
	]);
	return (
		<div className={styles.portraitWarning} onClick={incrementClicks}>
			{getMessage()}
		</div>
	);
};

const increment = 5;

const messages = [
	"Rotate your device to a landscape orientation to use this app.",
	"Sorry, this app just doesn't fit in portrait orientation.",
	"Uh, hello? You need to rotate your device to use this app.",
	"Rotate your device, you dolt!!!",
];

export default PortraitWarning;
