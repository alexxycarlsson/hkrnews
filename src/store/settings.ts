import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
	state: () => {
		return {
			url: 'https://hacker-news.firebaseio.com/v0/',
			displayLoading: true,
			showNavbar: true,
			scrollElement: <HTMLElement | null>null,
			scrollPosition: 0,
		};
	},
	actions: {
		setShowNavbar(value: boolean) {
			this.showNavbar = value;
		},
		setScrollElement(element: HTMLElement | null) {
			this.scrollElement = element;
		},
	},
});
