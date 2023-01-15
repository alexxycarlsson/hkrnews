<script setup lang="ts">
import { computed } from 'vue';
import { Post } from '../interfaces/interfaces';
import { DateTime } from 'luxon';

const props = defineProps({
	model: {
		type: Object,
		required: true,
	},
});

// Use typing :post
const children = computed<Post[]>(() => props.model.children || []);
</script>

<template>
	<li class="pl-4 flex flex-col gap-y-4">
		<div class="flex w-full justify-between items-center">
			<h4 class="font-semibold text-lg">{{ props.model.by }}:</h4>
			<p class="text-sm ml-2">
				{{ DateTime.fromSeconds(props.model.time).toRelative() }}
			</p>
		</div>
		<div
			v-html="props.model.text"
			class="flex flex-col gap-y-2 pl-4 bg-white bg-opacity-10 rounded-md p-4"
		/>

		<ul>
			<TreeItem
				v-for="child in children"
				:key="child.id"
				:model="child"
			></TreeItem>
		</ul>
	</li>
</template>

<style lang="scss" scoped></style>
