import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	// alexxycarlsson.github.io/hkrnews
	base: '/hkrnews/',
});
