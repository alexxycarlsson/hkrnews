import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue'),
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('../views/About.vue'),
	},
	{
		path: '/article/:id',
		name: 'Article',
		component: () => import('../views/Article.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import('../views/NotFound.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
