<script setup lang="ts">
import { computed, onActivated, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Post } from '../interfaces/interfaces';
import { useSettingsStore } from '../store/settings';
import { getPost } from '../ts/api';
import { DateTime } from 'luxon';

const route = useRoute();
const post = ref<Post>();
const settings = useSettingsStore();
const timeref = ref<HTMLElement | null>(null);
const postFormattedTime = computed(() => {
	if (post.value) {
		return DateTime.fromSeconds(post.value.time).toRelative()!;
	}
});

onActivated(async () => {
	post.value = await getPost(Number(route.params.id), () =>
		settings.$patch({ displayLoading: false, showNavbar: true })
	);
});
</script>

<template>
	<div ref="scrollPage" class="page overflow-x-auto">
		<a :href="post?.url" target="_blank" rel="noopener noreferrer">
			<h1 class="text-4xl font-bold">{{ post?.title }}</h1>
		</a>

		<div class="flex justify-between items-center">
			<p class="font-semibold text-lg">
				<span class="capitalize">{{ post?.type }}</span> by
				{{ post?.by }}
			</p>
			<p class="font-semibold text-lg capitalize">
				{{ post?.score }} Score
			</p>
			<p class="font-semibold text-lg capitalize">
				{{ post?.descendants }} Comments
			</p>
		</div>
		<div>
			<p ref="timeref" class="font-semibold text-lg">
				{{ postFormattedTime }}
			</p>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
