<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Post } from '../interfaces/interfaces';
import { useSettingsStore } from '../store/settings';
import { getPost, getTopStories } from '../ts/api';
import { DateTime } from 'luxon';

const router = useRouter();

const settings = useSettingsStore();

const postarr = ref<Array<Post>>([]);
// {by: 'zolland', descendants: 0, id: 34299251, score: 1, time: 1673187349, …}
// use typing for above

onBeforeMount(async () => {
	let posts = await getTopStories();
	posts = posts.slice(0, 50);
	for (const post of posts) {
		const data = await getPost(post);
		postarr.value.push(data);
	}
});

const openPostUrl = (id: number) => {
	// /article/:id
	router.push({ name: 'Article', params: { id: id } });
};

const scrollPage = ref<HTMLElement | null>(null);

onMounted(() => {
	settings.setScrollElement(scrollPage.value!);
});
</script>

<template>
	<div ref="scrollPage" class="page overflow-x-auto">
		<div class="row-item">
			<h1 class="px-[1rem] text-4xl font-bold">Top</h1>
			<div
				class="w-full flex flex-col shrink-0 gap-y-[1rem] gap-x-[1rem] rounded-lg"
			>
				<div
					v-for="(post, i) in postarr"
					class="item-card"
					@click="openPostUrl(post.id)"
				>
					<div class="flex flex-col">
						<div class="flex justify-between">
							<h1
								class="whitespace-nowrap overflow-hidden text-ellipsis text-2xl font-bold"
							>
								{{ post.title }}
							</h1>
							<p class="font-semibold text-lg capitalize">
								{{ post.score }} Score
							</p>
						</div>
						<p class="font-bold text-lg">
							<span class="capitalize">{{ post.type }}</span> by
							{{ post.by }}
							<span v-if="post.descendants">
								|
								{{
									post.descendants > 1
										? `${post.descendants} Comments`
										: `${post.descendants} Comment`
								}}
							</span>
						</p>
					</div>

					<div class="flex w-full justify-between items-center">
						<p class="capitalize">
							{{ DateTime.fromSeconds(post.time).toRelative() }}
						</p>

						<p class="flex justify-end">{{ i + 1 }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.row-item {
	@apply flex flex-col gap-y-[4rem];
	.item-card {
		@apply flex flex-col justify-between shrink-0 h-[9rem] p-[1rem] bg-neutral-600 bg-opacity-25 rounded-lg cursor-pointer transition-all hover:ring hover:ring-white hover:ring-opacity-25;
	}
}
</style>
