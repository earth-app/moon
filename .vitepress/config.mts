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
			{ 
				text: 'Projects', 
				items: [
					{ text: 'Mantle (Deprecated)', link: '/docs/mantle/' },
					{ text: 'Mantle2 (Active)', link: '/docs/mantle2/' },
					{ text: 'Cloud (AI Worker)', link: '/docs/cloud/' },
					{ text: 'Crust (Frontend)', link: '/docs/crust/' }
				]
			},
			{ 
				text: 'Architecture', 
				items: [
					{ text: 'Hybrid API', link: '/docs/hybrid-api' },
					{ text: 'Mantle vs Mantle2', link: '/docs/mantle-vs-mantle2' }
				]
			},
			{ text: 'Contributing', link: '/docs/CONTRIBUTING' }
		],

		sidebar: [
			{
				text: 'Getting Started',
				items: [
					{ text: 'Overview', link: '/' },
					{ text: 'Contributing Guide', link: '/docs/CONTRIBUTING' },
					{ text: 'Organization Info', link: '/docs/_data/ORG_METADATA' }
				]
			},
			{
				text: 'Projects',
				items: [
					{ 
						text: 'Mantle (Deprecated)', 
						link: '/docs/mantle/',
						items: [
							{ text: 'Overview', link: '/docs/mantle/' },
							{ text: 'API Reference', link: '/docs/mantle/#api-reference-legacy' },
							{ text: 'Migration Guide', link: '/docs/mantle/#migration-guide' }
						]
					},
					{ 
						text: 'Mantle2 (Primary)', 
						link: '/docs/mantle2/',
						items: [
							{ text: 'Overview', link: '/docs/mantle2/' },
							{ text: 'API Reference', link: '/docs/mantle2/#api-reference' },
							{ text: 'Development', link: '/docs/mantle2/#development' }
						]
					},
					{ 
						text: 'Cloud (AI Worker)', 
						link: '/docs/cloud/',
						items: [
							{ text: 'Overview', link: '/docs/cloud/' },
							{ text: 'API Reference', link: '/docs/cloud/#api-reference' },
							{ text: 'AI Integration', link: '/docs/cloud/#ai-provider-integration' }
						]
					},
					{ 
						text: 'Crust (Frontend)', 
						link: '/docs/crust/',
						items: [
							{ text: 'Overview', link: '/docs/crust/' },
							{ text: 'Components', link: '/docs/crust/#user-interface-components' },
							{ text: 'Development', link: '/docs/crust/#development' }
						]
					}
				]
			},
			{
				text: 'Architecture & Analysis',
				items: [
					{ text: 'Hybrid API (mantle2 + cloud)', link: '/docs/hybrid-api' },
					{ text: 'Mantle vs Mantle2 Comparison', link: '/docs/mantle-vs-mantle2' },
					{ text: 'Commit Summary & History', link: '/docs/commit-summary' }
				]
			},
			{
				text: 'Reference',
				items: [
					{ text: 'TODOs & Missing Info', link: '/docs/TODOS' },
					{ text: 'Markdown Examples', link: '/markdown-examples' },
					{ text: 'API Examples', link: '/api-examples' }
				]
			}
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/earth-app' },
			{ icon: 'github', link: 'https://github.com/gmitch215' }
		],

		search: {
			provider: 'local'
		},

		editLink: {
			pattern: 'https://github.com/earth-app/moon/edit/main/:path',
			text: 'Edit this page on GitHub'
		},

		footer: {
			message: 'Documentation for The Earth App ecosystem',
			copyright: 'Copyright © 2025 The Earth App'
		}
	},
	head: [
		['link', { rel: 'shortcut icon', type: 'image/png', href: '/favicon.png' }],
		['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		['meta', { name: 'theme-color', content: '#4caf50' }],
		['meta', { property: 'og:type', content: 'website' }],
		['meta', { property: 'og:site_name', content: 'The Earth App Documentation' }],
		['meta', { property: 'og:description', content: 'API Documentation and Technical Specifications for The Earth App and its components' }]
	],
	markdown: {
		theme: {
			light: 'github-light',
			dark: 'github-dark'
		}
	}
});
