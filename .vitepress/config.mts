import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'The Earth App',
	description:
		'API Documentation and Technical Specifications for The Earth App and its components',
	themeConfig: {
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'mantle2', link: '/mantle2/overview' },
			{ text: 'cloud', link: '/cloud/overview' },
			{ text: 'crust', link: '/crust/index' },
			{ text: 'ocean', link: '/ocean/algorithms' }
		],

		sidebar: [
			{
				text: 'mantle2',
				items: [
					{ text: 'Overview', link: '/mantle2/overview' },
					{ text: 'General', link: '/mantle2/general' },
					{ text: 'Users', link: '/mantle2/users' },
					{ text: 'Activities', link: '/mantle2/activities' },
					{ text: 'Events', link: '/mantle2/events' },
					{ text: 'Prompts', link: '/mantle2/prompts' },
					{ text: 'Articles', link: '/mantle2/articles' },
					{ text: 'Friends', link: '/mantle2/friends' },
					{ text: 'Notifications', link: '/mantle2/notifications' }
				]
			},
			{
				text: 'cloud',
				items: [
					{ text: 'Overview', link: '/cloud/overview' },
					{ text: 'AI Generation', link: '/cloud/ai-generation' },
					{ text: 'Article Pipeline', link: '/cloud/article-pipeline' },
					{ text: 'Recommendation', link: '/cloud/recommendation' },
					{ text: 'Caching', link: '/cloud/caching' },
					{ text: 'KV', link: '/cloud/kv' },
					{ text: 'Journeys', link: '/cloud/journeys' },
					{ text: 'Profile Photos', link: '/cloud/profile-photos' }
				]
			},
			{
				text: 'crust',
				items: [
					{ text: 'Tech Overview', link: '/crust/index' },
					{ text: 'Rendering', link: '/crust/rendering' },
					{ text: 'Composables', link: '/crust/composables' },
					{ text: 'UI Components', link: '/crust/ui-components' }
				]
			},
			{
				text: 'ocean',
				items: [
					{ text: 'Algorithms', link: '/ocean/algorithms' },
					{ text: 'Scrapers', link: '/ocean/scrapers' }
				]
			}
		],
		socialLinks: [
			{ icon: 'github', link: 'https://github.com/earth-app' },
			{ icon: 'instagram', link: 'https://instagram.com/theearthapp' },
			{ icon: 'twitter', link: 'https://twitter.com/the_earth_app' },
			{ icon: 'patreon', link: 'https://patreon.com/gmitch215' }
		]
	},
	head: [
		['link', { rel: 'shortcut icon', type: 'image/png', href: '/favicon.png' }],
		['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	]
});
