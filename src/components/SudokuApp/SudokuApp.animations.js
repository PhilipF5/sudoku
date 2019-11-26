import { gsap } from "gsap";
import { positionOf, valuesInColumn, valuesInRegion, valuesInRow } from "../../utilities";

export const animateNewPuzzle = () => {
	gsap.killTweensOf(".square");
	return gsap
		.timeline()
		.set(".square", { clearProps: "all" })
		.set(".square", { opacity: 0 })
		.set(".square", {
			delay: 1,
			opacity: 1,
			stagger: { each: 0.025, from: "start" },
		});
};

export const animatePuzzleSolved = () => {
	return gsap.to(".square", {
		duration: 1,
		filter: "hue-rotate(360deg)",
		id: "solvedAnimation",
		ease: "power0.none",
		stagger: { each: 0.5, from: "start", grid: [9, 9], repeat: -1 },
	});
};

export const animateSectionSolved = (gridValues, solution, triggerSquare) => {
	const { column, region, row } = positionOf(triggerSquare);
	const targets = [];
	if (valuesInRow(gridValues, row).join("") === solution.rows[row]) {
		targets.push(`.square[data-row="${row}"]`);
	}
	if (valuesInColumn(gridValues, column).join("") === solution.columns[column]) {
		targets.push(`.square[data-column="${column}"]`);
	}
	if (valuesInRegion(gridValues, region).join("") === solution.regions[region]) {
		targets.push(`.square[data-region="${region}"]`);
	}
	if (targets.length) {
		const targetSelector = targets.join(", ");
		return gsap
			.timeline()
			.to(targetSelector, {
				duration: 0.5,
				"--box-shadow-color": "rgba(255, 255, 255, 0.902)",
				borderColor: "white",
				color: "white",
				ease: "power3.easeOut",
				overwrite: "auto",
				stagger: { amount: 0.5, from: "center", repeat: 1, yoyo: true },
			})
			.set(targetSelector, { clearProps: "all" });
	}
};
