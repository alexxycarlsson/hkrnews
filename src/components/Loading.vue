<script setup lang="ts"></script>

<template>
	<div
		class="absolute flex z-50 w-full h-full top-0 bg-black bg-opacity-25 backdrop-blur-xl items-center justify-center"
	>
		<h1 class="letter l">L</h1>
		<h1 class="letter o">o</h1>
		<h1 class="letter a">a</h1>
		<h1 class="letter d">d</h1>
		<h1 class="letter i">i</h1>
		<h1 class="letter n">n</h1>
		<h1 class="letter g">g</h1>
	</div>
</template>

<style lang="scss" scoped>
.letter {
	@apply text-5xl font-bold select-none;
	line-height: 1;
}

@keyframes text-bounce {
	0% {
		transform: translateY(0) scale(1);
		letter-spacing: 1rem;
	}
	30% {
		transform: translateY(-1rem) scale(1.1);
	}
	50% {
		transform: translateY(0) scale(3);
		letter-spacing: 4rem;
	}
	70% {
		transform: translateY(1rem) scale(1.1);
	}
	100% {
		transform: translateY(0) scale(1);
		letter-spacing: 1rem;
	}
}
.l {
	animation: text-bounce 7s ease-in-out infinite alternate both;
}
.o {
	animation: text-bounce 7s ease-in-out 0.2s infinite alternate both;
}
.a {
	animation: text-bounce 7s ease-in-out 0.4s infinite alternate both;
}
.d {
	animation: text-bounce 7s ease-in-out 0.6s infinite alternate both;
}
.i {
	animation: text-bounce 7s ease-in-out 0.8s infinite alternate both;
}
.n {
	animation: text-bounce 7s ease-in-out 1s infinite alternate both;
}
.g {
	animation: text-bounce 7s ease-in-out 1.2s infinite alternate both;
}
</style>
