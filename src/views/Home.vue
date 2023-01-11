<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import { useSettingsStore } from '../store/settings';

interface Post {
	by: string;
	descendants: number;
	id: number;
	score: number;
	time: number;
	title: string;
	type: string;
	url: string;
}

const settings = useSettingsStore();

const postarr = ref<Array<Post>>([]);
// {by: 'zolland', descendants: 0, id: 34299251, score: 1, time: 1673187349, …}
// use typing for above
async function getPost(id: number): Promise<Post> {
	const res = await fetch(
		`https://hacker-news.firebaseio.com/v0/item/${id}.json`
	);
	const data: Post = await res.json();

	return data;
}

async function getPosts() {
	const res = await fetch(
		'https://hacker-news.firebaseio.com/v0/newstories.json'
	);
	const data: Array<number> = await res.json();

	return data.slice(0, 50);
}

onBeforeMount(async () => {
	const posts = await getPosts();
	for (const post of posts) {
		const data = await getPost(post);
		postarr.value.push(data);
	}
});

const openPostUrl = (url: string) => {
	window.open(url, '_blank');
};

const scrollPage = ref<HTMLElement | null>(null);
const lastScrollY = ref(window.scrollY);

const onScroll = () => {
	if (lastScrollY.value < scrollPage.value!.scrollTop) {
		settings.setShowNavbar(false);
	} else {
		settings.setShowNavbar(true);
	}

	lastScrollY.value = scrollPage.value!.scrollTop;
};

onMounted(() => {
	scrollPage.value!.addEventListener('scroll', onScroll);
});

onBeforeUnmount(() => {
	scrollPage.value!.removeEventListener('scroll', onScroll);
});
</script>

<template>
	<div ref="scrollPage" class="page overflow-x-auto">
		<div class="row-item">
			<h1 class="text-4xl font-bold">New</h1>
			<div
				class="w-full flex flex-col shrink-0 gap-y-[1rem] gap-x-[1rem] rounded-lg"
			>
				<div
					v-for="(post, i) in postarr"
					class="item-card"
					@click="openPostUrl(post.url)"
				>
					<h1
						class="whitespace-nowrap overflow-hidden text-ellipsis text-2xl font-bold"
					>
						{{ post.title }}
					</h1>
					<p class="font-semibold text-lg capitalize">
						{{ post.type }}
					</p>
					<p v-if="post.descendants">
						{{
							post.descendants > 1
								? `${post.descendants} Comments`
								: `${post.descendants} Comment`
						}}
					</p>
					<div class="flex w-full justify-between items-center">
						<p>
							Score <span>{{ post.score }}</span>
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
	@apply flex flex-col p-[3rem] gap-y-[4rem];
	.item-card {
		@apply flex flex-col justify-evenly shrink-0 h-[10rem] p-[1rem] bg-neutral-600 bg-opacity-25 rounded-lg cursor-pointer;
	}
}
</style>
