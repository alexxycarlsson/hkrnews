<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Post } from '../interfaces/interfaces';
import { useSettingsStore } from '../store/settings';
import { getPost } from '../ts/api';

const route = useRoute();
const post = ref<Post>();
const settings = useSettingsStore();

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
				{{ post?.type }}
			</p>
			<p class="font-semibold text-lg capitalize">
				{{ post?.score }} Score
			</p>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
