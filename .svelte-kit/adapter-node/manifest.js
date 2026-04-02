export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["cv.pdf","favicon.ico","favicon.png","IMG_0513.jpeg","robots.txt","sitemap.txt","sitemap.xml"]),
	mimeTypes: {".pdf":"application/pdf",".png":"image/png",".jpeg":"image/jpeg",".txt":"text/plain",".xml":"text/xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.YgyAw7w_.js","app":"_app/immutable/entry/app.CXRuzmr8.js","imports":["_app/immutable/entry/start.YgyAw7w_.js","_app/immutable/chunks/entry.DSNVGAkp.js","_app/immutable/chunks/scheduler._PVTacox.js","_app/immutable/entry/app.CXRuzmr8.js","_app/immutable/chunks/scheduler._PVTacox.js","_app/immutable/chunks/index.CWV-FYsQ.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);

export const base = "";