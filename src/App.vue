<script setup lang="ts">
import { computed } from 'vue';
import { useSettingsStore } from './store/settings';
import Loading from './components/Loading.vue';
import Header from './components/Header.vue';

const settings = useSettingsStore();
const loading = computed(() => settings.displayLoading);
</script>

<template>
	<div class="w-full h-full flex flex-col text-white shadow-2xl">
		<div
			class="w-full h-full -z-10 absolute flex justify-evenly overflow-hidden backdrop-blur-2xl"
		>
			<div class="box box1"></div>
		</div>
		<Loading v-if="loading" />
		<Header />
		<router-view v-slot="{ Component }">
			<keep-alive>
				<component :is="Component" />
			</keep-alive>
		</router-view>
	</div>
</template>

<style lang="scss" scoped>
.glowfont {
	text-shadow: 0 0 50px #fff;
}
@keyframes glow {
	0% {
		transform: translateY(40%) translateX(30%) rotate(0deg) scale(1.05);
		// hue rotate
	}
	50% {
		transform: translateY(50%) translateX(0) rotate(1turn) scale(1.2);
	}
	100% {
		transform: translateY(60%) translateX(-25%) rotate(0deg) scale(0.95);
	}
}
.box {
	@apply absolute inset-0 mx-auto w-3/5 rounded-full ease-in-out -z-10 blur-[100px];
	animation: glow 15s ease-in-out infinite alternate-reverse both;
	&.box1 {
		@apply bg-gradient-to-b from-green-800 via-white to-purple-800;
	}
}

.page {
	@apply w-full h-full flex flex-col transition-all sm:p-[3rem] p-3;
}
</style>
