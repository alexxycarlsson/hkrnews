<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useSettingsStore } from '../store/settings';
import { RouterLink } from 'vue-router';

const settings = useSettingsStore();
const showNavbar = computed(() => settings.showNavbar);
const scrollPage = computed(() => settings.scrollElement);

const lastScrollY = ref(0);
const onScroll = () => {
	if (lastScrollY.value < scrollPage.value!.scrollTop) {
		settings.setShowNavbar(false);
	} else {
		settings.setShowNavbar(true);
	}
	lastScrollY.value = scrollPage.value!.scrollTop;
};
watch(
	scrollPage,
	(newVal, oldVal) => {
		if (oldVal) {
			oldVal.removeEventListener('scroll', onScroll);
		}
		if (newVal) {
			newVal.addEventListener('scroll', onScroll);
		}
	},
	{ immediate: true }
);
</script>

<template>
	<header
		class="flex shrink-0 w-full h-[6rem] bg-white bg-opacity-25 transition-all transform duration-300 px-6 sm:px-[4rem] items-center"
		:class="{ nav__hidden: !showNavbar }"
	>
		<RouterLink to="/" class="text-2xl font-bold">Hacker News</RouterLink>
		<RouterLink to="/new" class="ml-4">New</RouterLink>
		<RouterLink to="/top" class="ml-4">Top</RouterLink>
	</header>
</template>

<style lang="scss" scoped>
.nav__hidden {
	@apply transform -translate-y-full h-0 p-0 transition-all duration-300 overflow-hidden opacity-0;
}
</style>
