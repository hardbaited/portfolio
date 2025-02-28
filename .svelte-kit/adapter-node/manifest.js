export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["cv.pdf","favicon.ico","favicon.png","robots.txt","sitemap.txt","sitemap.xml"]),
	mimeTypes: {".pdf":"application/pdf",".png":"image/png",".txt":"text/plain",".xml":"text/xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.RkaCxHuf.js","app":"_app/immutable/entry/app.BDeo3RRq.js","imports":["_app/immutable/entry/start.RkaCxHuf.js","_app/immutable/chunks/entry.C11H02hK.js","_app/immutable/chunks/scheduler.rHNyJg8M.js","_app/immutable/chunks/index.Ct5PZE8B.js","_app/immutable/entry/app.BDeo3RRq.js","_app/immutable/chunks/scheduler.rHNyJg8M.js","_app/immutable/chunks/index.BmuBWEB0.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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