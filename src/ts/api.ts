import { Post } from '../interfaces/interfaces';

export async function getPost(id: number, func?: Function): Promise<Post> {
	const res = await fetch(
		`https://hacker-news.firebaseio.com/v0/item/${id}.json`
	);
	const data: Post = await res.json();

	if (func) {
		func();
	}

	return data;
}

export async function getNewStories() {
	const res = await fetch(
		'https://hacker-news.firebaseio.com/v0/newstories.json'
	);
	const data: Array<number> = await res.json();

	return data;
}

export async function getTopStories() {
	const res = await fetch(
		'https://hacker-news.firebaseio.com/v0/topstories.json'
	);
	const data: Array<number> = await res.json();

	return data;
}
