export interface Post {
	by: string;
	descendants: number;
	id: number;
	score: number;
	children: number[];
	time: number;
	title: string;
	type: string;
	dead: boolean;
	url: string;
	kids: number[];
	parent: number;
	text: string;
	deleted: boolean;
}
