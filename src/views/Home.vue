<script setup lang="ts"></script>

<template>
	<div class="page overflow-x-auto">
		<div class="row-item">
			<h1 class="text-4xl font-bold">New</h1>
			<div
				class="w-full flex flex-col shrink-0 gap-y-[1rem] gap-x-[1rem] rounded-lg"
			>
				<div v-for="i in 10" class="item-card">
					<h1
						class="whitespace-nowrap overflow-hidden text-ellipsis text-2xl font-bold"
					>
						My YC app: Dropbox - Throw away your USB drive
					</h1>
					<p class="font-semibold text-lg">Story</p>
					<p>Score <span>420</span></p>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.row-item {
	@apply flex flex-col p-[3rem] gap-y-[4rem];
	.item-card {
		@apply flex flex-col shrink-0 h-32 p-[1rem] bg-neutral-600 bg-opacity-25 rounded-lg cursor-pointer;
	}
}
</style>
