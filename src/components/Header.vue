<script setup lang="ts">
import { computed } from 'vue';
import { useSettingsStore } from '../store/settings';

const settings = useSettingsStore();
const showNavbar = computed(() => settings.showNavbar);
</script>

<template>
	<header
		class="flex shrink-0 w-full h-[6rem] bg-white bg-opacity-25 transition-all transform duration-300"
		:class="{ nav__hidden: !showNavbar }"
	></header>
</template>

<style lang="scss" scoped>
.nav__hidden {
	@apply transform -translate-y-full h-0 transition-all duration-300;
}
</style>
