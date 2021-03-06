import { localStore } from './localStore.js';

export const defaultSettings = {
	color: '#000000',
	colorInUrl: false,
	historyList: [],
	favoritesList: []
};

// deep copy to preserve original defaultSettings
export const settings = localStore('settings', JSON.parse(JSON.stringify(defaultSettings)));
