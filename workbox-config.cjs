module.exports = {
	globDirectory: "dist/",
	globPatterns: [
		"**/*.{html,js,css,json,ico,png,jpg,jpeg,svg,woff2,woff,eot,ttf,otf}"
	],
	swDest: "dist/service-worker.js",
	runtimeCaching: [
		{
			urlPattern: ({ request }) => request.mode === "navigate",
			handler: "NetworkFirst",
			options: {
				cacheName: "pages-cache",
				expiration: {
					maxEntries: 50,
					maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
				}
			}
		},
		{
			urlPattern: /\.(?:js|css|html|json)$/,
			handler: "StaleWhileRevalidate",
			options: {
				cacheName: "static-resources-cache",
			}
		},
		{
			urlPattern: /\.(?:png|jpg|jpeg|svg|ico)$/,
			handler: "CacheFirst",
			options: {
				cacheName: "image-cache",
				expiration: {
					maxEntries: 50,
					maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
				}
			}
		}
	]
};