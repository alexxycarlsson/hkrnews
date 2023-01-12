<script setup lang="ts">
import { computed } from 'vue';
import { useSettingsStore } from '../store/settings';
import { RouterLink } from 'vue-router';

const settings = useSettingsStore();
const showNavbar = computed(() => settings.showNavbar);
</script>

<template>
	<header
		class="flex shrink-0 w-full h-[6rem] bg-white bg-opacity-25 transition-all transform duration-300 px-[3rem] items-center"
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
