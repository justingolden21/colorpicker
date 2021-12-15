import { localStore } from './localStore.js';

export const defaultSettings = {};

// deep copy to preserve original defaultSettings
export const settings = localStore('settings', JSON.parse(JSON.stringify(defaultSettings)));
