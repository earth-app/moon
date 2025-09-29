import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'The Earth App',
	description:
		'API Documentation and Technical Specifications for The Earth App and its components',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Examples', link: '/markdown-examples' }
		],

		sidebar: [
			{
				text: 'Examples',
				items: [
					{ text: 'Markdown Examples', link: '/markdown-examples' },
					{ text: 'Runtime API Examples', link: '/api-examples' }
				]
			}
		],

		socialLinks: [{ icon: 'github', link: 'https://github.com/earth-app' }]
	},
	head: [
		['link', { rel: 'shortcut icon', type: 'image/png', href: '/favicon.png' }],
		['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	]
});
