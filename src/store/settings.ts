import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
	state: () => {
		return {
			url: 'https://hacker-news.firebaseio.com/v0/',
		};
	},
});
