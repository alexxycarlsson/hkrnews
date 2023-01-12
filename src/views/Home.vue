<script setup lang="ts">
import {
	onActivated,
	onBeforeMount,
	onMounted,
	onUnmounted,
	ref,
	watch,
} from 'vue';
import { useRouter } from 'vue-router';
import { Post } from '../interfaces/interfaces';
import { useSettingsStore } from '../store/settings';
import { getPost, getTopStories } from '../ts/api';
import { DateTime } from 'luxon';

const router = useRouter();

const settings = useSettingsStore();

const postarr = ref<Array<Post>>([]);
const allPostIds = ref<Array<number>>([]);
const scrollPage = ref<HTMLElement | null>(null);
const noMoreLoading = ref(false);

const reload = () => {
	window.location.reload();
};

const loadMorePosts = async () => {
	if (postarr.value.length < allPostIds.value.length) {
		let posts = allPostIds.value.slice(
			postarr.value.length,
			postarr.value.length + 10
		);
		for (const post of posts) {
			const data = await getPost(post);
			postarr.value.push(data);
		}
	} else {
		noMoreLoading.value = true;
	}
};

// watch postarr and if it contains one then disableloading
let watchstop = watch(
	postarr.value,
	(val) => {
		if (val.length > 0) {
			settings.$patch({ displayLoading: false });
			watchstop();
		}
	},
	{ immediate: true }
);

onBeforeMount(async () => {
	let posts = await getTopStories();
	allPostIds.value = posts;
	posts = posts.slice(0, 10);
	for (const post of posts) {
		const data = await getPost(post);
		postarr.value.push(data);
	}
});

onMounted(() => {
	settings.setScrollElement(scrollPage.value!);
	scrollPage.value!.addEventListener('scroll', () => {
		if (
			scrollPage.value!.scrollTop + scrollPage.value!.clientHeight >=
			scrollPage.value!.scrollHeight
		) {
			loadMorePosts();
		}
	});
});

onActivated(() => {
	if (postarr.value.length > 0) {
		settings.$patch({ displayLoading: false });
	}
});

const openPostUrl = (id: number) => {
	// /article/:id
	router.push({ name: 'Article', params: { id: id } });
};
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
				<div
					v-if="noMoreLoading"
					class="flex flex-col justify-center items-center gap-y-[1rem]"
				>
					<h1 class="text-2xl font-bold text-black">
						You have reached the end.
					</h1>
					<button
						@click="reload"
						class="p-[1rem] w-[8rem] bg-black bg-opacity-25 rounded-md font-bold"
					>
						Reload
					</button>
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
