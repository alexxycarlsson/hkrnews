<script setup lang="ts"></script>

<template>
	<div
		class="absolute flex flex-col z-50 w-full h-full top-0 bg-black bg-opacity-25 backdrop-blur-xl items-center justify-center overflow-hidden"
	>
		<div class="flex">
			<h1 class="letter l">L</h1>
			<h1 class="letter o">o</h1>
			<h1 class="letter a">a</h1>
			<h1 class="letter d">d</h1>
			<h1 class="letter i">i</h1>
			<h1 class="letter n">n</h1>
			<h1 class="letter g">g</h1>
		</div>
		<div class="horizontal-spinner">
			<div class="spinner"></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.letter {
	@apply text-5xl font-bold select-none;
	line-height: 1;
}

.horizontal-spinner {
	@apply w-full h-2 absolute mt-[20rem];
	.spinner {
		@apply absolute top-0 left-0 w-full h-full bg-white rounded-xl;
		animation: spinner 3s linear infinite alternate both;
	}
}

@keyframes spinner {
	// make it shrink and grow and move using translate
	0% {
		transform: translateX(-150%) scaleX(0.8);
	}
	50% {
		transform: translateX(0) scaleX(0.3);
	}

	100% {
		transform: translateX(150%) scaleX(0.3);
	}
}

@keyframes text-bounce {
	0% {
		transform: translateY(0) scale(1) rotate(0deg);
		letter-spacing: 1rem;
	}
	30% {
		transform: translateY(-1rem) scale(1.1) rotate(4deg);
	}
	50% {
		transform: translateY(0) scale(3) rotate(-4deg);
		letter-spacing: 4rem;
	}
	70% {
		transform: translateY(1rem) scale(1.1);
	}
	100% {
		transform: translateY(0) scale(1) rotate(0deg);
		letter-spacing: 1rem;
	}
}
.l {
	animation: text-bounce 7s ease-in-out infinite both;
}
.o {
	animation: text-bounce 7s ease-in-out 0.2s infinite both;
}
.a {
	animation: text-bounce 7s ease-in-out 0.4s infinite both;
}
.d {
	animation: text-bounce 7s ease-in-out 0.6s infinite both;
}
.i {
	animation: text-bounce 7s ease-in-out 0.8s infinite both;
}
.n {
	animation: text-bounce 7s ease-in-out 1s infinite both;
}
.g {
	animation: text-bounce 7s ease-in-out 1.2s infinite both;
}
</style>
