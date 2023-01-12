<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Post } from '../interfaces/interfaces';
import { useSettingsStore } from '../store/settings';
import { getPost } from '../ts/api';
import { DateTime } from 'luxon';

const route = useRoute();
const post = ref<Post>();
const settings = useSettingsStore();
const postFormattedTime = computed(() => {
	if (post.value) {
		// return as string: 1 hour ago, 2 days ago, 23 Decemeber 2020
		return DateTime.fromSeconds(post.value.time).toRelative();
	}
});

settings.$patch({ displayLoading: true });

onBeforeMount(async () => {
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
			<p class="font-semibold text-lg capitalize">
				{{ post?.type }} by {{ post?.by }}
			</p>
			<p class="font-semibold text-lg capitalize">
				{{ post?.score }} Score
			</p>
			<p class="font-semibold text-lg capitalize">
				{{ post?.descendants }} Comments
			</p>
		</div>
		<div>
			<p class="font-semibold text-lg capitalize">
				{{ postFormattedTime }}
			</p>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
