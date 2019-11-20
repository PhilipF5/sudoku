import { gsap } from "gsap";

export const derotateSquare = (target) => {
	return gsap.to(target, { duration: 0.75, rotationX: 0, rotationY: 0, scale: 1, ease: "power0.none" });
};

export const rotateSquare = (target) => {
	return gsap
		.timeline()
		.to(target, { duration: 0.5, scale: 1.2, ease: "power0.none" })
		.add(
			gsap
				.to(target, 3, {
					rotationX: "+=360_cw",
					rotationY: "+=360_cw",
					scale: 1.2,
					ease: "power0.none",
				})
				.repeat(-1),
		);
};
