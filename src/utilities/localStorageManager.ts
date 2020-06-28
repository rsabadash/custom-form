export const localStorageManager = {
	getItem (key: string): null | string {
		const localStorageData = window.localStorage.getItem(key);

		if (!localStorageData) {
			return null;
		}

		return localStorageData;
	},
	setItem (key: string, data: string): void {
		window.localStorage.setItem(key, data);
	}
};
