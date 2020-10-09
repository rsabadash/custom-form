export const localStorageManager = {
	getItem <T>(key: string): null | T {
		const localStorageData = window.localStorage.getItem(key);

		if (!localStorageData) {
			return null;
		}

		return JSON.parse(localStorageData);
	},
	setItem <T>(key: string, data: T): void {
		window.localStorage.setItem(key, JSON.stringify(data));
	}
};
