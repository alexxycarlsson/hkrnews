import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { useSettingsStore } from '../store/settings';

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
		path: '/user/:id',
		name: 'User',
		component: () => import('../views/User.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import('../views/NotFound.vue'),
	},
];

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	const settings = useSettingsStore();
	settings.$patch({ displayLoading: true });
	next();
});

router.afterEach(() => {
	const settings = useSettingsStore();
	settings.$patch({ displayLoading: false });
});

export default router;
