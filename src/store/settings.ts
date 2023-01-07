import { defineStore } from 'pinia';

export const useStore = defineStore('settings', {
	state: () => {
		return {
			url: 'https://hacker-news.firebaseio.com/v0/',
		};
	},
});
