<script setup lang="ts">
import { computed, onActivated, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Post } from '../interfaces/interfaces';
import { useSettingsStore } from '../store/settings';
import { getPost } from '../ts/api';
import { DateTime } from 'luxon';
import TreeItem from '../components/TreeItem.vue';

const route = useRoute();
const post = ref<Post>();
const settings = useSettingsStore();
const postFormattedTime = computed(() => {
	if (post.value) {
		return DateTime.fromSeconds(post.value.time).toRelative()!;
	}
});

const allKids = ref<any>({});
async function getAllKids(kids: Array<number>) {
	// run this function recursively to get all the kids
	// return object of all kids nested in the post using parent and kids id
	for (const kid of kids) {
		const data = await getPost(kid);
		if (data.deleted || data.dead) return;
		allKids.value[kid] = data;
		if (data.kids) {
			await getAllKids(data.kids);
		}
	}
}

// make tree structure of all kids. If a kid has no parent, it is a root node
const treeData = ref<Array<Post>>([]);
function makeTree() {
	for (const kid in allKids.value) {
		if (allKids.value[kid].parent === post.value?.id) {
			treeData.value.push(allKids.value[kid]);
		} else {
			// make child the comment
			const findParent = (parent: any) => {
				if (allKids.value[kid].parent === parent.id) {
					if (!parent.children) {
						parent.children = [];
					}
					parent.children.push(allKids.value[kid]);
				} else {
					if (parent.children) {
						for (const child of parent.children) {
							findParent(child);
						}
					}
				}
			};

			for (const root of treeData.value) {
				findParent(root);
			}
		}
	}
}

onActivated(async () => {
	post.value = await getPost(Number(route.params.id));

	if (post.value.kids) {
		allKids.value = {};
		treeData.value = [];
		await getAllKids(post.value.kids);

		// log length of allKids.value to see how many posts are loaded

		makeTree();
		settings.$patch({ displayLoading: false });
	}
});
</script>

<template>
	<div ref="scrollPage" class="page overflow-y-auto">
		<div class="flex flex-col">
			<a
				:href="post?.url"
				target="_blank"
				rel="noopener noreferrer"
				class="text-2xl font-semibold self-start"
			>
				{{ post?.title }}
			</a>
			<p class="text-sm">
				<span class="capitalize font-semibold">{{ post?.type }}</span>
				by
				{{ post?.by }}
			</p>
			<p class="text-sm">
				⭐ {{ post?.score }}
				<span v-if="post?.descendants"
					>| {{ post.descendants }} 💬</span
				>
			</p>
		</div>

		<div class="flex w-full justify-between items-center">
			<p ref="timeref">
				{{ postFormattedTime }}
			</p>
		</div>

		<ul v-if="post?.kids" class="flex flex-col gap-y-4 mt-4">
			<!-- use treeData -->
			<TreeItem
				v-for="child in treeData"
				class="bg-black bg-opacity-25 p-4 rounded-md"
				:key="child.id"
				:model="child"
			></TreeItem>
		</ul>
	</div>
</template>

<style lang="scss" scoped></style>
