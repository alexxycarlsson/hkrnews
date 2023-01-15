<script setup lang="ts">
import { onActivated, onBeforeMount, onMounted, ref, watch } from 'vue';
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
const loadingPosts = ref(true);

const reload = () => {
	window.location.reload();
};

const callObserve = () => {
	const lastPost =
		scrollPage.value!.children[0].lastElementChild?.lastElementChild;
	// Somehow it's not selecting the last element idk why. I hope I can fix it someday.

	// use observer to check if last post is in view then load more posts
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.intersectionRatio > 0) {
					observer.unobserve(entry.target);
					loadMorePosts();
				}
			});
		},
		{ threshold: 1 }
	);
	if (lastPost) {
		observer.observe(lastPost);
	}
};

const loadMorePosts = async () => {
	if (loadingPosts.value || noMoreLoading.value) return;

	if (postarr.value.length < allPostIds.value.length) {
		let posts = allPostIds.value.slice(
			postarr.value.length,
			postarr.value.length + 10
		);
		for (const post of posts) {
			const data = await getPost(post);
			postarr.value.push(data);
		}
		callObserve();
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

	loadingPosts.value = false;

	callObserve();
});

onMounted(() => {
	settings.setScrollElement(scrollPage.value!);
});

onActivated(() => {
	settings.setScrollElement(scrollPage.value!);
	if (postarr.value.length > 0) {
		settings.$patch({ displayLoading: false });
		// scroll to saved position
		scrollPage.value!.scrollTop = settings.scrollPosition;
	}
});

const openPostUrl = (id: number) => {
	// save scroll position
	settings.$patch({ scrollPosition: scrollPage.value!.scrollTop });
	router.push({ name: 'Article', params: { id: id } });
};
</script>

<template>
	<div ref="scrollPage" class="page overflow-x-auto">
		<div class="row-item">
			<h1 class="px-3 text-4xl font-bold">Top</h1>
			<div
				class="w-full flex flex-col shrink-0 gap-y-[1rem] gap-x-[1rem] rounded-lg"
			>
				<div
					v-for="(post, i) in postarr"
					class="item-card"
					@click="openPostUrl(post.id)"
				>
					<div class="flex flex-col">
						<h1 class="sm:text-xl font-bold">
							{{ post.title }}
						</h1>
						<p class="text-sm">
							<span class="capitalize font-semibold">{{
								post.type
							}}</span>
							by
							{{ post.by }}
						</p>
						<p class="text-sm">
							⭐ {{ post.score }}
							<span v-if="post.descendants"
								>| {{ post.descendants }} 💬</span
							>
						</p>
					</div>

					<div class="flex w-full justify-between items-center">
						<p ref="timeref">
							{{ DateTime.fromSeconds(post.time).toRelative()! }}
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
	@apply flex flex-col gap-y-3 sm:gap-y-[3rem];
	.item-card {
		@apply flex flex-col justify-between shrink-0 h-[9rem] p-4 bg-neutral-600 bg-opacity-25 rounded-lg cursor-pointer transition-all hover:ring hover:ring-white hover:ring-opacity-25;
	}
}
</style>
