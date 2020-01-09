export const storage = {
	get: (value) => JSON.parse(window.sessionStorage.getItem(value)),
	set: (key, value) => {
		try {
			window.sessionStorage.setItem(key, JSON.stringify(value));
		} catch {
			console.error("Session storage not available, settings will not be persisted");
		}
	},
};
